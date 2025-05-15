'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import { useInView } from '@/lib/hooks';

export default function InsightCards({ insights }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [visibleItems, setVisibleItems] = useState([]);

  // Animate cards appearing one by one
  useEffect(() => {
    if (!isInView) return;
    
    const showItems = async () => {
      for (let i = 0; i < insights.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setVisibleItems(prev => [...prev, i]);
      }
    };
    
    showItems();
  }, [isInView, insights.length]);

  return (
    <section ref={ref} className="section bg-cloud-white">
      <div className="container mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-12">Latest Insights</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {insights.map((insight, index) => (
            <div 
              key={insight.slug}
              className={`transition-all duration-500 ${
                visibleItems.includes(index) 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
            >
              <Card
                title={insight.title}
                description={insight.excerpt}
                imageSrc={insight.coverImage}
                imageAlt={insight.title}
                date={insight.date}
                tags={insight.tags}
                href={`/insights/${insight.slug}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}