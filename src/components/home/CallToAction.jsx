'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '@/components/ui/Button';
import { useInView, useReducedMotion } from '@/lib/hooks';
import { PARTNERS } from '@/lib/constants';

export default function CallToAction() {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const reduceMotion = useReducedMotion();
  const [partnersVisible, setPartnersVisible] = useState(false);
  
  useEffect(() => {
    if (isInView && !reduceMotion) {
      // Delay partner logos appearing for visual effect
      const timer = setTimeout(() => {
        setPartnersVisible(true);
      }, 800);
      
      return () => clearTimeout(timer);
    } else if (isInView && reduceMotion) {
      // Immediately show partners with reduced motion
      setPartnersVisible(true);
    }
  }, [isInView, reduceMotion]);

  return (
    <section ref={ref} className="py-20" id="cta">
      <div 
        className="bg-gradient-to-r from-night-navy to-sky-cyan py-16 px-4"
      >
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold text-cloud-white mb-6">
            Build your next energy decision on numbers, not guesswork
          </h2>
          
          <p className="text-xl text-cloud-white/80 mb-12 max-w-3xl mx-auto">
            Our data-driven insights power better energy policy, investment, and technology decisions.
          </p>
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-16">
            <Button 
              href="/about#contact" 
              variant="outline"
              className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-night-navy"
            >
              Contact Us
            </Button>
          </div>
          
          {/* Partner logos section */}
          <div className="mt-16">
            <p className="text-cloud-white/70 mb-8">Trusted by leading organizations</p>
            
            <div className="flex flex-wrap justify-center items-center gap-12">
              {PARTNERS.map((partner, index) => (
                <div 
                  key={partner.name}
                  className={`relative h-12 w-32 transition-all duration-1000 ${
                    partnersVisible ? 'opacity-100 filter-none' : 'opacity-30 grayscale'
                  }`}
                  style={{ 
                    transitionDelay: reduceMotion ? '0ms' : `${index * 200}ms`
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
        </div>
      </div>
    </section>
  );
}