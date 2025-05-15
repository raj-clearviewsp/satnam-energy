'use client';

import { useEffect, useState } from 'react';
import { COMPANY_KPIS } from '@/lib/constants';
import { useInView, useReducedMotion } from '@/lib/hooks';

export default function KpiBar() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const reduceMotion = useReducedMotion();
  const [counters, setCounters] = useState(COMPANY_KPIS.map(() => 0));

  // Animate the counters when the section is in view
  useEffect(() => {
    if (!isInView || reduceMotion) {
      // If we should reduce motion, just set to final values
      if (reduceMotion) {
        setCounters(COMPANY_KPIS.map(kpi => parseInt(kpi.value)));
      }
      return;
    }

    const targetValues = COMPANY_KPIS.map(kpi => parseInt(kpi.value));
    const duration = 1500; // ms
    const frameDuration = 1000 / 60; // 60fps
    const totalFrames = Math.round(duration / frameDuration);
    
    let frame = 0;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / totalFrames;
      
      if (frame === totalFrames) {
        clearInterval(timer);
        setCounters(targetValues);
      } else {
        setCounters(targetValues.map(value => Math.floor(progress * value)));
      }
    }, frameDuration);
    
    return () => clearInterval(timer);
  }, [isInView, reduceMotion]);

  return (
    <section 
      ref={ref}
      className="bg-sky-cyan py-10"
      aria-label="Key company statistics"
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {COMPANY_KPIS.map((kpi, index) => (
            <div key={kpi.label} className="flex flex-col items-center">
              <span className="text-night-navy text-4xl font-bold">
                {counters[index]}+
              </span>
              <span className="text-white mt-2 font-medium">
                {kpi.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}