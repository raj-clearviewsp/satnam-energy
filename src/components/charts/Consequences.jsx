'use client';

import Figure from './Figure';
import { OUTCOMES, OUTCOME_KEYS } from '@/content/outlooks';

const fmt = (v) => Math.round(v).toLocaleString('en-US');
const sum = (o) => Object.values(o).reduce((s, v) => s + v, 0);
const ROOM = 54; // px kept free at the end of each bar for its value

function Bar({ parts, order, max, base, baseTip, value, tipHead, unit }) {
  const t = sum(parts);
  const at = (v) => `calc((100% - ${ROOM}px) * ${v / max})`;
  return (
    <div className="obar">
      <div className="bar-stack" style={{ width: at(t) }}>
        {order
          .filter((f) => parts[f] !== undefined)
          .map((f) => (
            <div
              key={f}
              className={OUTCOME_KEYS[f].open ? 'seg open' : 'seg'}
              style={{ flexGrow: parts[f], background: OUTCOME_KEYS[f].color }}
              data-tip={`${tipHead}\n${OUTCOME_KEYS[f].name}: ${unit(parts[f])}`}
            />
          ))}
      </div>
      {base !== undefined ? <i className="base" style={{ left: at(base) }} data-tip={baseTip} /> : null}
      <span className="oval" style={{ left: `calc((100% - ${ROOM}px) * ${Math.max(t, base || 0) / max} + 7px)` }}>
        {value}
      </span>
    </div>
  );
}

export default function Consequences({ caption }) {
  const co2Max = Math.max(...OUTCOMES.map((c) => Math.max(sum(c.co2), c.co2Base)));
  const gasMax = Math.max(...OUTCOMES.map((c) => c.gas50));
  const invMax = Math.max(...OUTCOMES.filter((c) => c.inv).map((c) => sum(c.inv)));

  const names = (
    <div className="ocol names">
      <div className="ohead" />
      {OUTCOMES.map((c) => (
        <div className="oname" key={c.c}>
          <strong>{c.name}</strong>
          <span>Gas {c.gasShare}% of power</span>
        </div>
      ))}
    </div>
  );

  return (
    <Figure
      title="Gas-led futures emit more; the renewables-led one needs the most capital"
      sub="2050 outcomes in each comparable base case, from least to most gas in power. Black ticks mark each outlook’s 2025 level."
      caption={caption}
    >
      <div className="legend">
        {Object.entries(OUTCOME_KEYS).map(([f, k]) => (
          <span key={f}>
            <i className={k.open ? 'open' : ''} style={{ background: k.color }} />
            {k.name}
          </span>
        ))}
      </div>
      <div className="outcomes">
        <div className="opanel co2">
          {names}
          <div className="ocol">
            <div className="ohead">
              <strong>CO2 in 2050</strong>
              <span>Mt, by fuel</span>
            </div>
            {OUTCOMES.map((c) => (
              <Bar
                key={c.c}
                parts={c.co2}
                order={['gas', 'coal', 'oil', 'other', 'rest']}
                max={co2Max}
                base={c.co2Base}
                baseTip={`${c.name}\nCO2 in 2025: ${fmt(c.co2Base)} Mt`}
                value={fmt(sum(c.co2))}
                tipHead={`${c.name}, CO2 in 2050`}
                unit={(v) => `${fmt(v)} Mt`}
              />
            ))}
          </div>
        </div>
        <div className="opanel gas">
          {names}
          <div className="ocol">
            <div className="ohead">
              <strong>Gas use in 2050</strong>
              <span>bcm</span>
            </div>
            {OUTCOMES.map((c) => (
              <Bar
                key={c.c}
                parts={{ gas: c.gas50 }}
                order={['gas']}
                max={gasMax}
                base={c.gas25}
                baseTip={`${c.name}\nGas use in 2025: ${fmt(c.gas25)} bcm`}
                value={fmt(c.gas50)}
                tipHead={`${c.name}, gas use in 2050 (2025: ${fmt(c.gas25)} bcm)`}
                unit={(v) => `${fmt(v)} bcm`}
              />
            ))}
          </div>
        </div>
        <div className="opanel inv">
          {names}
          <div className="ocol">
            <div className="ohead">
              <strong>Power investment</strong>
              <span>2036–50, USD bn a year</span>
            </div>
            {OUTCOMES.map((c) =>
              c.inv ? (
                <Bar
                  key={c.c}
                  parts={c.inv}
                  order={['clean', 'gas', 'coal', 'oil']}
                  max={invMax}
                  value={fmt(sum(c.inv))}
                  tipHead={`${c.name}, power investment a year, 2036–2050`}
                  unit={(v) => `USD ${v.toFixed(1)} bn`}
                />
              ) : (
                <div className="obar none" key={c.c}>
                  not estimated
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <div className="fig-note">
        APERC’s CO2 is our estimate from fuel use; ACE reports CO2-equivalent by sector, not fuel. Investment is our
        estimate from each outlook’s capacity, at DNV’s unit costs, excluding grids; ERIA publishes no capacity.
      </div>
    </Figure>
  );
}
