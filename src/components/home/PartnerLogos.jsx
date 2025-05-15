'use client';

import Image from 'next/image';
import { PARTNERS } from '@/lib/constants';
import { useInView, useReducedMotion } from '@/lib/hooks';

export default function PartnerLogos() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const reduceMotion = useReducedMotion();

  return (
    <section 
      ref={ref}
      className="py-16 bg-night-navy/5"
      aria-label="Our partners"
    >
      <div className="container mx-auto">
        <h2 className="text-2xl font-semibold text-center mb-8 text-night-navy/80">
          Trusted By Leading Organizations
        </h2>

        <div className="flex flex-wrap justify-center items-center gap-12">
          {PARTNERS.map((partner, index) => (
            <div 
              key={partner.name}
              className={`relative h-12 w-32 transition-all duration-500 ${
                isInView && !reduceMotion
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
              style={{ 
                transitionDelay: reduceMotion ? '0ms' : `${index * 100}ms`
              }}
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                fill
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}