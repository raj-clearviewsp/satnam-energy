'use client';

import Figure, { useWidth } from './Figure';
import { OUTLOOKS, SPREAD } from '@/content/outlooks';

const nameOf = (k) => OUTLOOKS.find((o) => o.key === k).short;
const fx = (v) => (v >= 10 ? `${Math.round(v)}×` : `${v.toFixed(1)}×`);

export default function ImpactSpread({ caption }) {
  const [ref, w] = useWidth(760);
  const narrow = w < 600;

  const rows = SPREAD.map((mm) => {
    const rs = Object.entries(mm.v)
      .map(([key, v]) => ({ key, v }))
      .sort((a, b) => a.v - b.v);
    return { ...mm, rs, lo: rs[0], hi: rs[rs.length - 1], spread: rs[rs.length - 1].v / rs[0].v };
  }).sort((a, b) => a.spread - b.spread);

  const x0 = narrow ? 66 : 232;
  const x1 = w - (narrow ? 104 : 132);
  const dlo = 0.4;
  const dhi = 32;
  const X = (v) => x0 + (Math.log(v / dlo) / Math.log(dhi / dlo)) * (x1 - x0);
  const rowH = narrow ? 58 : 50;
  const top = narrow ? 44 : 34;
  const rowY = (i) => top + i * rowH;
  const yEnd = rowY(rows.length - 1) + 24;
  const ticks = narrow ? [0.5, 2, 8, 32] : [0.5, 1, 2, 4, 8, 16, 32];

  return (
    <Figure
      title="The outlooks broadly agree on how much energy is used, not on what supplies it"
      sub="2050 level as a multiple of 2025 in each comparable base case; each bar runs from the lowest outlook to the highest"
      caption={caption}
    >
      <div ref={ref}>
        <svg
          width={w}
          height={yEnd + 26}
          viewBox={`0 0 ${w} ${yEnd + 26}`}
          role="img"
          aria-label="The outlooks broadly agree on how much energy is used, not on what supplies it"
          className="chart"
        >
          <text x={w} y="12" textAnchor="end" className="tick" fontWeight="600">
            Highest ÷ lowest
          </text>
          <line x1={X(1)} x2={X(1)} y1={top - 16} y2={yEnd} stroke="var(--ink)" strokeWidth="1.25" strokeDasharray="4 3" />
          {ticks.map((t) => (
            <g key={t}>
              <line x1={X(t)} x2={X(t)} y1={yEnd} y2={yEnd + 5} stroke="var(--mist)" />
              <text x={X(t)} y={yEnd + 20} textAnchor="middle" className="tick">{`${t}×`}</text>
            </g>
          ))}
          {rows.map((mm, i) => {
            const y = rowY(i);
            return (
              <g key={mm.m}>
                <text x="0" y={narrow ? y - 18 : mm.sub ? y - 3 : y + 4} className="rowlabel halo">
                  {mm.name}
                  {mm.sub ? (
                    narrow ? (
                      <tspan className="rowsub" dx="8">
                        {mm.sub}
                      </tspan>
                    ) : (
                      <tspan className="rowsub" x="0" dy="15">
                        {mm.sub}
                      </tspan>
                    )
                  ) : null}
                </text>
                <line
                  x1={X(mm.lo.v)}
                  x2={X(mm.hi.v)}
                  y1={y}
                  y2={y}
                  stroke="var(--gray)"
                  strokeWidth="8"
                  strokeOpacity="0.4"
                  strokeLinecap="round"
                />
                {mm.rs.map((r) => (
                  <g key={r.key} data-tip={`${mm.name}\n${nameOf(r.key)}: ${r.v.toFixed(2)} times its 2025 level in 2050`}>
                    <circle cx={X(r.v)} cy={y} r="12" fill="transparent" />
                    <circle
                      cx={X(r.v)}
                      cy={y}
                      r="5.5"
                      fill={r === mm.lo || r === mm.hi ? 'var(--ink)' : 'var(--gray)'}
                      stroke="var(--paper)"
                      strokeWidth="1.5"
                    />
                  </g>
                ))}
                <text x={X(mm.lo.v) - 11} y={y + 4} textAnchor="end" className="endlabel small halo">
                  {`${nameOf(mm.lo.key)} ${fx(mm.lo.v)}`}
                </text>
                <text x={X(mm.hi.v) + 11} y={y + 4} textAnchor="start" className="endlabel small halo">
                  {`${nameOf(mm.hi.key)} ${fx(mm.hi.v)}`}
                </text>
                <text
                  x={w}
                  y={y + 5}
                  textAnchor="end"
                  className="spread"
                  fill={mm.spread >= 3 ? 'var(--azure-dark)' : 'var(--ink)'}
                >
                  {`${mm.spread.toFixed(1)}×`}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </Figure>
  );
}
