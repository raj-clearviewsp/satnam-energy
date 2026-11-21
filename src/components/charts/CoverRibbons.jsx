'use client';

import { useState } from 'react';
import { useWidth } from './Figure';
import { DEMAND, DEMAND_YEARS } from '@/content/demand';

// Cover figure: energy use in South and Southeast Asia since 1990, one band per country.
// Warm colours so the cyan headline stays the only blue on the cover: gold for South Asia, rust for Southeast Asia.
const RAMPS = {
  'South Asia': ['#F2C14E', '#BF8B2C'],
  'Southeast Asia': ['#E8794A', '#96421F'],
};

const mix = (a, b, t) => {
  const p = (h, i) => parseInt(h.slice(1 + 2 * i, 3 + 2 * i), 16);
  return `rgb(${[0, 1, 2].map((i) => Math.round(p(a, i) + (p(b, i) - p(a, i)) * t)).join(',')})`;
};

const YEARS = Array.from({ length: DEMAND_YEARS.to - DEMAND_YEARS.from + 1 }, (_, i) => DEMAND_YEARS.from + i);
const N = YEARS.length;
const BANDS = (() => {
  const base = YEARS.map(() => 0);
  return DEMAND.map((c) => {
    const group = DEMAND.filter((x) => x.region === c.region);
    const t = group.length > 1 ? group.indexOf(c) / (group.length - 1) : 0;
    const lo = base.slice();
    c.ej.forEach((v, i) => {
      base[i] += v;
    });
    return { ...c, lo, hi: base.slice(), color: mix(RAMPS[c.region][0], RAMPS[c.region][1], t) };
  });
})();
const TOTAL = BANDS[BANDS.length - 1].hi;
const regionAt = (region, i) => DEMAND.filter((c) => c.region === region).reduce((s, c) => s + c.ej[i], 0);

export default function CoverRibbons() {
  const [hover, setHover] = useState(null);
  const [ref, w] = useWidth(580);

  const i = hover === null ? N - 1 : hover;
  const H = Math.round(Math.min(380, Math.max(260, w * 0.62)));
  const x0 = 0;
  const x1 = w - 86;
  const y0 = 10;
  const y1 = H - 28;
  const ymax = Math.max(...TOTAL) * 1.02;
  const X = (j) => x0 + (j / (N - 1)) * (x1 - x0);
  const Y = (v) => y1 - (v / ymax) * (y1 - y0);
  const colW = (x1 - x0) / (N - 1);

  return (
    <figure className="cover-fig fig">
      <div className="cover-readout" aria-live="polite">
        <div className="cover-number">{(TOTAL[i] / TOTAL[0]).toFixed(1)}×</div>
        <div className="cover-label">
          Energy use in South and Southeast Asia in {YEARS[i]}, against {YEARS[0]}
          {hover !== null ? (
            <span>
              {' '}
              · South Asia {regionAt('South Asia', i).toFixed(1)} EJ · Southeast Asia{' '}
              {regionAt('Southeast Asia', i).toFixed(1)} EJ
            </span>
          ) : null}
        </div>
      </div>
      <div ref={ref} className="cover-plot">
        <svg
          width={w}
          height={H}
          viewBox={`0 0 ${w} ${H}`}
          role="img"
          aria-label={`Energy use in South and Southeast Asia from ${YEARS[0]} to ${YEARS[N - 1]}, one band per country. It grew ${(TOTAL[N - 1] / TOTAL[0]).toFixed(1)} times, to ${TOTAL[N - 1].toFixed(0)} exajoules.`}
          className="chart"
          onPointerLeave={() => setHover(null)}
        >
          <g className="reveal">
            {BANDS.map((b) => (
              <polygon
                key={b.name}
                points={YEARS.map((_, j) => `${X(j).toFixed(1)},${Y(b.hi[j]).toFixed(1)}`)
                  .concat(
                    YEARS.map((_, j) => `${X(j).toFixed(1)},${Y(b.lo[j]).toFixed(1)}`).reverse(),
                  )
                  .join(' ')}
                fill={b.color}
                stroke="var(--navy)"
                strokeWidth="1"
                strokeLinejoin="round"
              />
            ))}
          </g>
          {BANDS.map((b) => {
            const thick = Y(b.lo[N - 1]) - Y(b.hi[N - 1]);
            return thick >= 13 ? (
              <text key={b.name} x={x1 + 9} y={Y((b.lo[N - 1] + b.hi[N - 1]) / 2) + 4} className="cover-band">
                {b.name}
              </text>
            ) : null;
          })}
          {hover !== null ? (
            <line x1={X(hover)} x2={X(hover)} y1={Y(TOTAL[hover])} y2={y1} stroke="#fff" strokeWidth="1.5" />
          ) : null}
          {[1990, 2000, 2010, 2023].map((y) => (
            <text
              key={y}
              x={X(y - YEARS[0])}
              y={y1 + 20}
              textAnchor={y === 1990 ? 'start' : y === 2023 ? 'end' : 'middle'}
              className="cover-tick"
            >
              {y}
            </text>
          ))}
          {YEARS.map((y, j) => (
            <rect
              key={y}
              x={X(j) - colW / 2}
              y={0}
              width={colW}
              height={H}
              fill="transparent"
              onPointerEnter={() => setHover(j)}
              onPointerDown={() => setHover(j)}
            />
          ))}
        </svg>
      </div>
      <figcaption>
        One band per country. <i className="key" style={{ background: RAMPS['South Asia'][0] }} /> South Asia{' '}
        <i className="key" style={{ background: RAMPS['Southeast Asia'][0] }} /> Southeast Asia. Primary energy use,
        exajoules. Source: Our World in Data, from Energy Institute and EIA data.
      </figcaption>
    </figure>
  );
}
