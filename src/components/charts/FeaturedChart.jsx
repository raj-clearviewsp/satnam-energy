'use client';

import { useState } from 'react';
import { useWidth } from './Figure';
import { OUTLOOKS, PATHS, YEARS } from '@/content/outlooks';

// Homepage teaser: electricity generation in the five base cases, indexed to 2025.
const BASES = OUTLOOKS.filter((o) => o.key !== 'aps');
const mult = (k, i) => PATHS.el[k][0][i] / PATHS.el[k][0][0];

export default function FeaturedChart() {
  const [focus, setFocus] = useState('all');
  const [hover, setHover] = useState(null);
  const [ref, w] = useWidth(620);

  const i = hover === null ? 5 : hover;
  const vs = BASES.map((o) => mult(o.key, i));
  const lo = Math.min(...vs);
  const hi = Math.max(...vs);
  const one = BASES.find((o) => o.key === focus);
  const readout = one ? `${mult(one.key, i).toFixed(1)}×` : i === 0 ? '1.0×' : `${lo.toFixed(1)}× to ${hi.toFixed(1)}×`;
  const label = one
    ? `Electricity generation in ${YEARS[i]} in the ${one.name} outlook, as a multiple of 2025`
    : `Electricity generation in ${YEARS[i]} across five outlooks, as a multiple of 2025`;

  const H = Math.round(Math.min(350, Math.max(250, w * 0.56)));
  const px0 = 34;
  const px1 = w - 64;
  const py0 = 14;
  const py1 = H - 28;
  const X = (j) => px0 + (j / 5) * (px1 - px0);
  const Y = (v) => py1 - ((v - 1) / 3) * (py1 - py0);
  const colW = (px1 - px0) / 5;

  const ends = BASES.map((o) => ({ o, yy: Y(mult(o.key, 5)) })).sort((a, b) => a.yy - b.yy);
  ends.forEach((e, j) => {
    if (j > 0 && e.yy - ends[j - 1].yy < 15) e.yy = ends[j - 1].yy + 15;
  });

  return (
    <div className="fig featured-fig">
      <div className="readout" aria-live="polite">
        <div className="readout-number">{readout}</div>
        <div className="readout-label">{label}</div>
      </div>
      <div ref={ref}>
        <svg
          width={w}
          height={H}
          viewBox={`0 0 ${w} ${H}`}
          role="img"
          aria-label="Electricity generation in Southeast Asia to 2050 in five outlooks, as a multiple of 2025"
          className="chart"
          onPointerLeave={() => setHover(null)}
        >
          {[1, 2, 3, 4].map((t) => (
            <g key={t}>
              <line x1={px0} x2={px1} y1={Y(t)} y2={Y(t)} stroke={t === 1 ? 'var(--ink)' : 'var(--hairline)'} />
              <text x={px0 - 8} y={Y(t) + 4} textAnchor="end" className="tick">{`${t}×`}</text>
            </g>
          ))}
          {YEARS.map((y, j) =>
            j % 5 === 0 || w > 460 ? (
              <text key={y} x={X(j)} y={py1 + 20} textAnchor="middle" className="tick">
                {y}
              </text>
            ) : null,
          )}
          {hover !== null ? (
            <line x1={X(hover)} x2={X(hover)} y1={py0} y2={py1} stroke="var(--mist)" strokeWidth="1" />
          ) : null}
          <g className="reveal">
            {BASES.filter((o) => o.key !== focus)
              .concat(BASES.filter((o) => o.key === focus))
              .map((o) => {
                const on = focus === 'all' || focus === o.key;
                return (
                  <g key={o.key}>
                    <path
                      d={`M${YEARS.map((_, j) => `${X(j)},${Y(mult(o.key, j))}`).join('L')}`}
                      fill="none"
                      stroke={on ? (one ? 'var(--azure)' : o.color) : 'var(--gray)'}
                      strokeOpacity={on ? 1 : 0.55}
                      strokeWidth={one && on ? 3 : 2}
                      strokeLinejoin="round"
                      strokeLinecap="round"
                    />
                    {hover !== null && on ? (
                      <circle
                        cx={X(hover)}
                        cy={Y(mult(o.key, hover))}
                        r="4.5"
                        fill={one ? 'var(--azure)' : o.color}
                        stroke="var(--paper)"
                        strokeWidth="2"
                      />
                    ) : null}
                  </g>
                );
              })}
          </g>
          {ends.map((e) => {
            const on = focus === 'all' || focus === e.o.key;
            return (
              <text
                key={e.o.key}
                x={px1 + 9}
                y={e.yy + 4}
                className="endlabel"
                style={{ fontWeight: on ? 600 : 400, fill: on ? 'var(--ink)' : 'var(--mist)' }}
              >
                {e.o.short}
              </text>
            );
          })}
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
      <div className="tabs" role="group" aria-label="Outlook">
        {[{ key: 'all', short: 'All five' }].concat(BASES).map((o) => (
          <button
            key={o.key}
            type="button"
            className={focus === o.key ? 'tab on' : 'tab'}
            aria-pressed={focus === o.key}
            onClick={() => setFocus(o.key)}
          >
            {o.short}
          </button>
        ))}
      </div>
      <div className="fig-note">
        Each outlook’s base case, harmonised and set to 1 in 2025. Sources: IEA, ACE, ERIA, APERC and DNV.
      </div>
    </div>
  );
}
