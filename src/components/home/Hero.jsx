'use client';

import { useReducedMotion } from '@/lib/hooks';
import Button from '@/components/ui/Button';

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative h-screen min-h-[600px] flex items-center bg-night-navy text-cloud-white">
      {/* Background elements - animated dots */}
      {!reduceMotion && (
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-6 h-6 rounded-full bg-sky-cyan/20 animate-pulse" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-4 h-4 rounded-full bg-sky-cyan/30 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute bottom-32 left-1/4 w-8 h-8 rounded-full bg-sky-cyan/20 animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-60 right-1/3 w-5 h-5 rounded-full bg-sky-cyan/10 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl font-headline font-bold leading-tight">
            Data-Driven Insights to Secure Low-Carbon Energy
          </h1>
          
          <p className="mt-6 text-xl text-cloud-white/90">
            Evidence-based policy, economic and financial insights for a net-zero world.
          </p>
          
          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Button href="/insights" variant="primary">
              Explore Our Insights
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}