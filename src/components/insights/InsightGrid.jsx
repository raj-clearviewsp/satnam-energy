'use client';

import { useState, useEffect } from 'react';
import Card from '@/components/ui/Card';
import InsightFilters from './InsightFilters';
import { useInView } from '@/lib/hooks';

export default function InsightGrid({ insights, tags }) {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [activeFilters, setActiveFilters] = useState([]);
  const [filteredInsights, setFilteredInsights] = useState(insights);

  // Filter insights based on active tags
  useEffect(() => {
    if (activeFilters.length === 0) {
      setFilteredInsights(insights);
      return;
    }

    const filtered = insights.filter(insight => 
      insight.tags.some(tag => activeFilters.includes(tag))
    );
    
    setFilteredInsights(filtered);
  }, [activeFilters, insights]);

  // Toggle a filter
  const toggleFilter = (tag) => {
    setActiveFilters(prev => 
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div ref={ref}>
      <InsightFilters 
        tags={tags} 
        activeFilters={activeFilters} 
        toggleFilter={toggleFilter} 
      />

      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredInsights.map((insight, index) => (
          <div 
            key={insight.slug}
            className={`transition-all duration-500 ${
              isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            style={{ transitionDelay: `${Math.min(index * 100, 500)}ms` }}
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

      {filteredInsights.length === 0 && (
        <div className="mt-12 text-center">
          <p className="text-graphite">No insights match your selected filters.</p>
          <button 
            onClick={() => setActiveFilters([])}
            className="mt-4 text-sky-cyan hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}