'use client';

import { useState } from 'react';
import Figure, { Pills } from './Figure';
import { FUELS, FUEL_ORDER, MIX_CASES } from '@/content/outlooks';

const fmt = (v) => Math.round(v).toLocaleString('en-US');
const total = (c) => Object.values(c.v).reduce((s, v) => s + v, 0);
const share = (c) => (100 * c.v.gas) / total(c);

export default function GenerationMix({ caption }) {
  const [mode, setMode] = useState('share');
  const lvl = mode === 'twh';

  const actual = MIX_CASES.find((c) => c.k === 'act');
  const later = MIX_CASES.filter((c) => c.k !== 'act').sort((a, b) => share(a) - share(b));
  const bases = later.filter((c) => c.base);
  const lo = Math.min(...bases.map(share));
  const hi = Math.max(...bases.map(share));
  const maxT = Math.max(...MIX_CASES.map(total));
  const ticks = lvl ? [0, 2000, 4000, 6000] : [0, 25, 50, 75, 100];
  const tickAt = (t) => (lvl ? (100 * t) / maxT : t);

  const row = (c) => (
    <div className="bar-row" key={c.k}>
      <div className="bar-name">
        <strong>{c.name}</strong>
        <span>{c.sub}</span>
      </div>
      <div className="bar-track">
        <div className="bar-stack" style={{ width: lvl ? `${(100 * total(c)) / maxT}%` : '100%' }}>
          {FUEL_ORDER.filter((f) => c.v[f] !== undefined).map((f) => (
            <div
              key={f}
              className={FUELS[f].open ? 'seg open' : 'seg'}
              style={{ flexGrow: c.v[f], background: FUELS[f].color }}
              data-tip={`${c.name}, ${c.sub}\n${FUELS[f].name}: ${fmt(c.v[f])} TWh (${Math.round((100 * c.v[f]) / total(c))}%)`}
            >
              {FUELS[f].open ? <span>not split by source</span> : null}
            </div>
          ))}
        </div>
      </div>
      <div className="bar-value">{lvl ? `${fmt(total(c))} TWh` : `Gas ${Math.round(share(c))}%`}</div>
    </div>
  );

  return (
    <Figure
      title="Where each outlook’s power comes from in 2050"
      sub="Generation by source in each outlook’s own data, with 2024 for reference. Switch to TWh to compare size."
      caption={caption}
    >
      <div className="fig-headrow">
        <div className="fig-head">
          Gas in 2050: {Math.round(lo)}% to {Math.round(hi)}% of generation in the five base cases
        </div>
        <Pills
          label="Scale"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'share', label: 'Share of generation' },
            { value: 'twh', label: 'TWh' },
          ]}
        />
      </div>
      <div className="legend">
        {FUEL_ORDER.map((f) => (
          <span key={f}>
            <i className={FUELS[f].open ? 'open' : ''} style={{ background: FUELS[f].color }} />
            {FUELS[f].name}
          </span>
        ))}
      </div>
      <div className="bars">
        {row(actual)}
        <div className="bar-group">2050</div>
        {later.map(row)}
        <div className="bar-row axis" aria-hidden="true">
          <div className="bar-name" />
          <div className="bar-track">
            {ticks.map((t) => (
              <span key={t} style={{ left: `${tickAt(t)}%` }}>
                {lvl ? t.toLocaleString('en-US') : `${t}%`}
              </span>
            ))}
          </div>
          <div className="bar-value">{lvl ? 'TWh' : ''}</div>
        </div>
      </div>
      <div className="fig-note">
        Gas share in 2024: {Math.round(share(actual))}%. Other low-carbon: nuclear, bioenergy, geothermal and hydrogen.
        IEA gas excludes plants with carbon capture. ACE’s gas-fired generation does not yet reconcile with its gas
        supply.
      </div>
    </Figure>
  );
}
