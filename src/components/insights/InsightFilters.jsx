'use client';

export default function InsightFilters({ tags, activeFilters, toggleFilter }) {
  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium mb-3">Filter by topic:</h3>
      
      <div className="flex flex-wrap gap-2">
        {tags.map(tag => (
          <button
            key={tag}
            onClick={() => toggleFilter(tag)}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              activeFilters.includes(tag)
                ? 'bg-sky-cyan text-white'
                : 'bg-night-navy/10 text-night-navy hover:bg-night-navy/20'
            }`}
            aria-pressed={activeFilters.includes(tag)}
          >
            {tag}
          </button>
        ))}
      </div>
    </div>
  );
}