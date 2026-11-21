'use client';

import { useState } from 'react';
import Figure, { Pills, useWidth } from './Figure';
import { MEASURES, OUTLOOKS, PATHS, YEARS } from '@/content/outlooks';

const fl = (v) =>
  Math.abs(v) >= 100 ? Math.round(v).toLocaleString('en-US') : Math.abs(v) >= 10 ? v.toFixed(1) : v.toFixed(2);

export default function OutlookPaths({ caption }) {
  const [sel, setSel] = useState('fe');
  const [mode, setMode] = useState('growth');
  const [hover, setHover] = useState(null);
  const [ref, w] = useWidth(760);

  const M = MEASURES.find((x) => x.m === sel);
  const lvl = mode === 'level';
  const series = OUTLOOKS.filter((o) => PATHS[sel][o.key]);
  const raw = (k, i) => PATHS[sel][k][0][i];
  const interp = (k, i) => PATHS[sel][k][1][i] === '1';
  const idx = (k, i) => (lvl ? raw(k, i) : M.pts ? raw(k, i) - raw(k, 0) : (100 * raw(k, i)) / raw(k, 0));
  const refv = lvl ? null : M.pts ? 0 : 100;
  const noBand = lvl && sel === 'int';

  const bases = series.filter((o) => o.key !== 'aps');
  const band = YEARS.map((_, i) => {
    const vs = bases.map((o) => idx(o.key, i));
    return { lo: Math.min(...vs), hi: Math.max(...vs) };
  });

  const all = series.flatMap((o) => YEARS.map((_, i) => idx(o.key, i))).concat(refv === null ? [] : [refv]);
  const vmin = Math.min(...all);
  const vmax = Math.max(...all);
  const span = vmax - vmin || 1;
  const p10 = Math.pow(10, Math.floor(Math.log10(span / 5)));
  const step = [1, 2, 2.5, 5, 10].map((x) => x * p10).find((s) => span / s <= 6);
  const t0 = Math.floor(vmin / step + 1e-9) * step;
  const t1 = Math.ceil(vmax / step - 1e-9) * step;
  const ticks = Array.from({ length: Math.round((t1 - t0) / step) + 1 }, (_, i) => t0 + i * step);
  const dec = step >= 1 ? 0 : step >= 0.1 ? 1 : 2;
  const ft = (v) =>
    lvl
      ? v.toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec })
      : M.pts
        ? `${v > 0 ? '+' : ''}${Number(v.toFixed(dec))}`
        : `${Number(v.toFixed(dec))}`;
  const fv = (v) =>
    lvl
      ? `${fl(v)}${M.unit === '%' ? '%' : ''}`
      : M.pts
        ? `${v >= 0 ? '+' : '−'}${Math.abs(v).toFixed(1)} pts`
        : `${Math.round(v)}`;

  const narrow = w < 560;
  const H = narrow ? 300 : 350;
  const px0 = 46;
  const px1 = w - (narrow ? 88 : 132);
  const py0 = 22;
  const py1 = H - 30;
  const X = (i) => px0 + (i / 5) * (px1 - px0);
  const Y = (v) => py1 - ((v - t0) / (t1 - t0)) * (py1 - py0);

  const ends = series
    .map((o) => ({ o, v: idx(o.key, 5), yy: Y(idx(o.key, 5)) }))
    .sort((a, b) => a.yy - b.yy);
  ends.forEach((e, i) => {
    if (i > 0 && e.yy - ends[i - 1].yy < 15) e.yy = ends[i - 1].yy + 15;
  });

  const lo50 = band[5].lo;
  const hi50 = band[5].hi;
  const head = lvl
    ? `${M.name} in 2050: ${fv(lo50)} to ${fv(hi50)}${M.unit === '%' ? ' of final energy' : ` ${M.unit}`}`
    : M.pts
      ? `${M.name} by 2050: ${fv(lo50)} to ${fv(hi50)} from 2025`
      : `${M.name} in 2050: ${Math.round(lo50)} to ${Math.round(hi50)} (2025 = 100)`;

  const tipFor = (i) =>
    [`${YEARS[i]}`]
      .concat(
        series
          .slice()
          .sort((a, b) => idx(b.key, i) - idx(a.key, i))
          .map(
            (o) =>
              `${o.name}: ${fv(idx(o.key, i))}${lvl ? (M.unit === '%' ? '' : ` ${M.unit}`) : ` (${fl(raw(o.key, i))}${M.unit === '%' ? '%' : ` ${M.unit}`})`}${interp(o.key, i) ? ', interpolated' : ''}`,
          ),
      )
      .join('\n');

  const colW = (px1 - px0) / 5;

  return (
    <Figure
      title="Each comparable outlook, measure by measure, 2025–2050"
      sub="Pick a measure and a scale. Solid lines are the comparable base cases; the grey band runs from lowest to highest."
      caption={caption}
    >
      <Pills
        label="Measure"
        value={sel}
        onChange={setSel}
        options={MEASURES.map((x) => ({ value: x.m, label: x.name }))}
      />
      <div className="fig-headrow">
        <div className="fig-head">{head}</div>
        <Pills
          label="Scale"
          value={mode}
          onChange={setMode}
          options={[
            { value: 'growth', label: 'Growth (2025 = 100)' },
            { value: 'level', label: 'Levels' },
          ]}
        />
      </div>
      <div ref={ref}>
        <svg
          width={w}
          height={H}
          viewBox={`0 0 ${w} ${H}`}
          role="img"
          aria-label={`${head}. Each comparable outlook, 2025 to 2050.`}
          className="chart"
          onPointerLeave={() => setHover(null)}
        >
          {ticks.map((t) => (
            <g key={t}>
              <line
                x1={px0}
                x2={px1}
                y1={Y(t)}
                y2={Y(t)}
                stroke={t === refv ? 'var(--ink)' : 'var(--hairline)'}
                strokeWidth={t === refv ? 1.25 : 1}
                strokeDasharray={t === refv ? '4 3' : 'none'}
              />
              <text x={px0 - 8} y={Y(t) + 4} textAnchor="end" className="tick">
                {ft(t)}
              </text>
            </g>
          ))}
          {lvl ? (
            <text x={px0 - 8} y={10} textAnchor="end" className="tick">
              {M.unit === 'MJ per dollar' ? 'MJ/$' : M.unit}
            </text>
          ) : null}
          {YEARS.map((y, i) => (
            <text key={y} x={X(i)} y={py1 + 20} textAnchor="middle" className="tick">
              {y}
            </text>
          ))}
          {hover !== null ? (
            <line x1={X(hover)} x2={X(hover)} y1={py0} y2={py1} stroke="var(--mist)" strokeWidth="1" />
          ) : null}
          <g className="reveal">
            {noBand ? null : (
              <path
                d={`M${band.map((b, i) => `${X(i)},${Y(b.hi)}`).join('L')}L${band
                  .map((b, i) => `${X(i)},${Y(b.lo)}`)
                  .reverse()
                  .join('L')}Z`}
                fill="var(--gray)"
                fillOpacity="0.2"
              />
            )}
            {series.map((o) => (
              <g key={o.key}>
                <path
                  d={`M${YEARS.map((_, i) => `${X(i)},${Y(idx(o.key, i))}`).join('L')}`}
                  fill="none"
                  stroke={o.color}
                  strokeWidth="2"
                  strokeDasharray={o.dashed ? '6 4' : 'none'}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />
                {YEARS.map((y, i) => (
                  <circle
                    key={y}
                    cx={X(i)}
                    cy={Y(idx(o.key, i))}
                    r={hover === i ? 5 : 3.5}
                    fill={interp(o.key, i) ? 'var(--paper)' : o.color}
                    stroke={o.color}
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            ))}
          </g>
          {ends.map((e) => (
            <text key={e.o.key} x={px1 + 10} y={e.yy + 4} className="endlabel">
              <tspan fill={e.o.color} fontWeight="600">
                {narrow ? e.o.short : e.o.name}
              </tspan>
              {narrow && e.o.key === 'aps' ? '' : ` ${fv(e.v)}`}
            </text>
          ))}
          {YEARS.map((y, i) => (
            <rect
              key={y}
              x={X(i) - colW / 2}
              y={py0 - 10}
              width={colW}
              height={py1 - py0 + 20}
              fill="transparent"
              data-tip={tipFor(i)}
              onPointerEnter={() => setHover(i)}
              onPointerDown={() => setHover(i)}
            />
          ))}
        </svg>
      </div>
      <div className="fig-note">
        Dashed: IEA Announced Pledges, outside the band. Hollow points are interpolated between published years.
        {lvl ? ' Levels differ partly because coverage and definitions differ.' : ''}
        {noBand ? ' GDP is measured on different bases, so no band is drawn.' : ''}
      </div>
    </Figure>
  );
}
