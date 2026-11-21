'use client';

import { useEffect, useRef, useState } from 'react';

// Width of the element the chart is drawn in, so charts are laid out at their real size.
export function useWidth(initial = 760) {
  const ref = useRef(null);
  const [w, setW] = useState(initial);
  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    const set = () => setW(Math.max(280, Math.round(el.getBoundingClientRect().width)));
    set();
    const ro = new ResizeObserver(set);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, w];
}

// A figure with a title, a source line, and a tooltip for any child that carries data-tip.
export default function Figure({ title, sub, caption, children, className = '' }) {
  const ref = useRef(null);
  const [tip, setTip] = useState(null);

  const move = (e) => {
    const el = e.target instanceof Element ? e.target.closest('[data-tip]') : null;
    if (!el || !ref.current) {
      setTip(null);
      return;
    }
    const b = ref.current.getBoundingClientRect();
    const x = e.clientX - b.left;
    setTip({ text: el.getAttribute('data-tip'), x, y: e.clientY - b.top, flip: x > b.width / 2 });
  };

  return (
    <figure
      className={`figure fig ${className}`}
      ref={ref}
      onPointerMove={move}
      onPointerDown={move}
      onPointerLeave={() => setTip(null)}
    >
      {title ? <div className="fig-title">{title}</div> : null}
      {sub ? <div className="fig-sub">{sub}</div> : null}
      {children}
      {caption ? <figcaption>{caption}</figcaption> : null}
      {tip ? (
        <div
          className="tip"
          role="status"
          style={{
            left: tip.x,
            top: tip.y,
            transform: `translate(${tip.flip ? 'calc(-100% - 14px)' : '14px'}, -50%)`,
          }}
        >
          {tip.text}
        </div>
      ) : null}
    </figure>
  );
}

export function Pills({ options, value, onChange, label }) {
  return (
    <div className="pills" role="group" aria-label={label}>
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          className={o.value === value ? 'pill on' : 'pill'}
          aria-pressed={o.value === value}
          onClick={() => onChange(o.value)}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
