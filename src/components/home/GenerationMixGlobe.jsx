'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '@/lib/hooks';

// Mock data for generation mix by country
const mockData = {
  "USA": {
    name: "United States",
    mix: {
      coal: 14.88,
      gas: 42.51,
      nuclear: 17.82,
      hydro: 5.39,
      wind: 10.34,
      solar: 6.91,
      geothermal: 0,
      bioenergy: 1.07,
      other: 1.08
    },
    household_electricity_price: 0.181,
    outageHours: 5.5
  },
  "KEN": {
    name: "Kenya",
    mix: {
      coal: 0,
      gas: 0,
      nuclear: 0,
      hydro: 28.09,
      wind: 14.09,
      solar: 4.28,
      geothermal: 43.27,
      bioenergy: 2.18,
      other: 8.09
    },
    household_electricity_price: 0.26,
    outageHours: 116
  },
  "EUR": {
    name: "Europe",
    mix: {
      coal: 13.25,
      gas: 22.96,
      nuclear: 19.76,
      hydro: 17.6,
      wind: 12.37,
      solar: 7.14,
      geothermal: 0,
      bioenergy: 4.01,
      other: 2.89
    },
    household_electricity_price: 0.247,
    outageHours: NaN
  },
  "IND": { //https://eparlib.sansad.in/bitstream/123456789/984804/1/AU235.pdf
    name: "India",
    mix: {
      coal: 74.56,
      gas: 2.78,
      nuclear: 2.66,
      hydro: 7.59,
      wind: 3.96,
      solar: 6.5,
      geothermal: 0,
      bioenergy: 1.74,
      other: 0.21
    },
    household_electricity_price: 0.08,
    outageHours: 448
  },
  "CHN": {
    name: "China",
    mix: {
      coal: 58.18,
      gas: 3.01,
      nuclear: 4.42,
      hydro: 13.45,
      wind: 9.84,
      solar: 8.28,
      geothermal: 0,
      bioenergy: 2.07,
      other: 0.76
    },
    household_electricity_price: 0.07,
    outageHours: 6 //varies between urban + rural, between 2 - 8/10
  },
  "NGA": {
    name: "Nigeria",
    mix: {
      coal: 0,
      gas: 76.97,
      nuclear: 0,
      hydro: 22.63,
      wind: 0,
      solar: 0.25,
      geothermal: 0,
      bioenergy: 0.15,
      other:0
    },
    household_electricity_price: 0.03,
    outageHours: 3840
  }
};

export default function GenerationMixGlobe() {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const reduceMotion = useReducedMotion();
  const [selectedCountry, setSelectedCountry] = useState("USA");
  const [showDonut, setShowDonut] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showInsight, setShowInsight] = useState(0);
  
  // Initialize visualization when component is in view
  useEffect(() => {
    if (!isInView) return;
    
    setShowDonut(true);
    
    // Show insights sequentially
    const timer1 = setTimeout(() => setShowInfo(true), 500);
    const timer2 = setTimeout(() => setShowInsight(1), 5000);
    const timer3 = setTimeout(() => setShowInsight(2), 10000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, [isInView]);

  // Function to create color for generation type
  const getGenerationColor = (type) => {
    switch(type) {
      case 'coal': return '#333333';        // Dark gray
      case 'gas': return '#FF9800';         // Orange
      case 'nuclear': return '#9C27B0';     // Purple
      case 'hydro': return '#2196F3';       // Blue
      case 'wind': return '#4CAF50';        // Green
      case 'solar': return '#FFEB3B';       // Yellow
      case 'geothermal':  return '#FF5722'; // Dark Orange
      case 'bioenergy': return '#795548';   // Brown
      case 'other': return '#607D8B';       // Blue gray
      default: return '#CCCCCC';
    }
  };

  // Handle country selection
  const handleCountrySelect = (countryCode) => {
    setSelectedCountry(countryCode);
  };
  
  // Calculate the percentage of clean energy
  const getCleanEnergyPercentage = (country) => {
    const mix = mockData[country].mix;
    return (mix.nuclear + mix.hydro + mix.wind + mix.solar + mix.geothermal + mix.bioenergy).toFixed(1);
  };
  
  // Calculate fossil fuel percentage
  const getFossilFuelPercentage = (country) => {
    const mix = mockData[country].mix;
    return (mix.coal + mix.gas + mix.other).toFixed(1);
  };

  return (
    <section ref={ref} className="py-20 bg-night-navy text-cloud-white" id="generation-mix">
      <div className="container mx-auto px-4">
        {/* Enhanced section header with decorative elements */}
        <div className="max-w-4xl mx-auto mb-12 relative">
          <div className="absolute left-0 top-12 w-1/4 h-px bg-gradient-to-r from-transparent to-sky-cyan"></div>
          <div className="absolute right-0 top-12 w-1/4 h-px bg-gradient-to-l from-transparent to-sky-cyan"></div>
                    
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Energy Colors: <span className="text-sky-cyan">The Generation Mix</span>
          </h2>
          
          <p className="text-xl text-center text-cloud-white/80 mb-8">
            Each grid tells a unique story through its energy sources, shaping reliability, cost, and carbon intensity.
          </p>
        </div>
        
        {/* Country selector - horizontal pills with icons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.keys(mockData).map(countryCode => (
            <button
              key={countryCode}
              className={`px-5 py-3 rounded-full transition-colors flex items-center ${
                selectedCountry === countryCode 
                  ? 'bg-sky-cyan text-white' 
                  : 'bg-night-navy/40 text-cloud-white hover:bg-night-navy/60'
              }`}
              onClick={() => handleCountrySelect(countryCode)}
            >
              <span className="text-base font-medium">{mockData[countryCode].name}</span>
            </button>
          ))}
        </div>
        
        {/* Insights carousel */}
        <div className={`bg-night-navy/30 p-4 rounded-lg text-center mb-8 transition-all duration-700 ${
          showInfo ? 'opacity-100' : 'opacity-0'
        }`}>
          {showInsight === 0 && (
            <p className="text-lg">
              <span className="text-sky-cyan font-semibold">Key insight:</span> High-income countries tend to have more diversified generation mixes, whereas lower-income countries often rely heavily on a single source — usually coal or hydropower.
            </p>
          )}
          
          {showInsight === 1 && (
            <p className="text-lg">
              <span className="text-sky-cyan font-semibold">Key insight:</span> Countries with high reliability (few outage hours) typically have substantial baseload capacity (nuclear or natural gas) to complement variable renewables.
            </p>
          )}
          
          {showInsight === 2 && (
            <p className="text-lg">
              <span className="text-sky-cyan font-semibold">Key insight:</span> Modern renewable leaders like Germany have achieved high clean energy percentages, but often at the cost of higher electricity prices — highlighting the policy balancing act.
            </p>
          )}
          
          {/* Dots indicator */}
          <div className="flex justify-center mt-4 space-x-2">
            {[0, 1, 2].map(i => (
              <button 
                key={i}
                className={`w-2 h-2 rounded-full transition-all ${
                  showInsight === i ? 'bg-sky-cyan scale-125' : 'bg-cloud-white/40'
                }`}
                onClick={() => setShowInsight(i)}
                aria-label={`View insight ${i+1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Main visualization area */}
        <div className="max-w-5xl mx-auto">
          {/* Generation Mix visualization */}
          {selectedCountry && showDonut && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Data column */}
              <div className="md:col-span-5 bg-night-navy/20 rounded-lg p-6">
                <h3 className="text-2xl font-semibold mb-5">
                  {mockData[selectedCountry].name}
                </h3>
                
                {/* Quick stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-night-navy/30 p-4 rounded-lg">
                    <h4 className="text-sm text-cloud-white/70 mb-1">Clean Energy</h4>
                    <p className="text-2xl font-bold text-sky-cyan">
                      {getCleanEnergyPercentage(selectedCountry)}%
                    </p>
                  </div>
                  <div className="bg-night-navy/30 p-4 rounded-lg">
                    <h4 className="text-sm text-cloud-white/70 mb-1">Fossil Fuels</h4>
                    <p className="text-2xl font-bold text-orange-400">
                      {getFossilFuelPercentage(selectedCountry)}%
                    </p>
                  </div>
                </div>
                
                {/* Key metrics */}
                {/* Electricity Price Card */}
                <div className="bg-night-navy/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-cyan" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M11 3a1 1 0 10-2 0v1a1 1 0 102 0V3zM15.657 5.757a1 1 0 00-1.414-1.414l-.707.707a1 1 0 001.414 1.414l.707-.707zM18 10a1 1 0 01-1 1h-1a1 1 0 110-2h1a1 1 0 011 1zM5.05 6.464A1 1 0 106.464 5.05l-.707-.707a1 1 0 00-1.414 1.414l.707.707zM5 10a1 1 0 01-1 1H3a1 1 0 110-2h1a1 1 0 011 1zM8 16v-1h4v1a2 2 0 11-4 0zM12 14c.015-.34.208-.646.477-.859a4 4 0 10-4.954 0c.27.213.462.519.476.859h4.002z" />
                    </svg>
                    <span>Electricity Price</span>
                    
                    {/* Price comparison indicator */}
                    <span className={`ml-auto text-sm px-2 py-0.5 rounded ${
                        mockData[selectedCountry].household_electricity_price <= 0.16 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                        {mockData[selectedCountry].household_electricity_price <= 0.16 
                        ? 'Below Average' 
                        : 'Above Average'}
                    </span>
                    </h4>
                    
                    <div className="flex items-center mt-3">
                    <div className="text-2xl font-bold mr-3">
                        ${mockData[selectedCountry].household_electricity_price}
                    </div>
                    <div className="text-sm text-cloud-white/70">per kWh</div>
                    
                    {/* Comparison indicator icon */}
                    <div className="ml-auto">
                        {mockData[selectedCountry].household_electricity_price <= 0.16 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                        )}
                    </div>
                    </div>
                    
                    {/* Comparison bar */}
                    <div className="mt-3">
                    <div className="flex justify-between text-xs text-cloud-white/70 mb-1">
                        <span>0</span>
                        <span className="relative">
                        <span className="absolute w-0.5 h-2 bg-cloud-white/30 -top-3 left-1/2 transform -translate-x-1/2"></span>
                        Global Avg: $0.16
                        </span>
                        <span>$0.30+</span>
                    </div>
                    <div className="h-2 w-full bg-night-navy/40 rounded-full">
                        <div 
                        className={`h-2 rounded-full ${
                            mockData[selectedCountry].household_electricity_price <= 0.16 
                            ? 'bg-green-400' 
                            : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min((mockData[selectedCountry].household_electricity_price / 0.30) * 100, 100)}%` }}
                        ></div>
                    </div>
                    </div>
                </div>
                
                {/* Grid Reliability Card */}
                <div className="bg-night-navy/30 p-4 rounded-lg">
                    <h4 className="font-medium mb-3 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-sky-cyan" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" />
                    </svg>
                    <span>Grid Reliability</span>
                    
                    {/* Reliability comparison indicator */}
                    <span className={`ml-auto text-sm px-2 py-0.5 rounded ${
                        mockData[selectedCountry].outageHours <= 17 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                        {mockData[selectedCountry].outageHours <= 17 
                        ? 'Above Average' 
                        : 'Below Average'}
                    </span>
                    </h4>
                    
                    <div className="flex items-center mt-3">
                    <div className="text-2xl font-bold mr-3">
                        {mockData[selectedCountry].outageHours}
                    </div>
                    <div className="text-sm text-cloud-white/70">hours without power per year</div>
                    
                    {/* Comparison indicator icon */}
                    <div className="ml-auto">
                        {mockData[selectedCountry].outageHours <= 17 ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        )}
                    </div>
                    </div>
                    
                    {/* Comparison bar */}
                    <div className="mt-3">
                    <div className="flex justify-between text-xs text-cloud-white/70 mb-1">
                        <span>0</span>
                        <span className="relative">
                        <span className="absolute w-0.5 h-2 bg-cloud-white/30 -top-3 left-1/2 transform -translate-x-1/2"></span>
                        Global Avg: 17
                        </span>
                        <span>34+</span>
                    </div>
                    <div className="h-2 w-full bg-night-navy/40 rounded-full">
                        <div 
                        className={`h-2 rounded-full ${
                            mockData[selectedCountry].outageHours <= 17 
                            ? 'bg-green-400' 
                            : 'bg-red-400'
                        }`}
                        style={{ width: `${Math.min((mockData[selectedCountry].outageHours / 34) * 100, 100)}%` }}
                        ></div>
                    </div>
                    </div>
                    
                    {/* Interpretation note */}
                    <div className="mt-3 text-xs text-cloud-white/60 italic">
                    Fewer outage hours indicate higher grid reliability. Note: Average is computed based on World Bank SAIDI data. Data is not available for all countries.
                    </div>
                </div>
                </div>              
              {/* Visualization column */}
              <div className="md:col-span-7">
                <div className="bg-night-navy/20 rounded-lg p-6 h-full flex flex-col">
                  <h3 className="text-xl font-semibold mb-4 text-center">Generation Mix</h3>
                  
                  {/* Enhanced Donut Chart with animations */}
                  <div className="flex-grow flex items-center justify-center">
                    <div className="relative">
                      <svg width="320" height="320" viewBox="-10 -10 120 120">
                        {/* Create donut chart from data */}
                        {(() => {
                          const country = mockData[selectedCountry];
                          let currentAngle = 0;
                          const radius = 50;
                          const centerX = 50;
                          const centerY = 50;
                          const innerRadius = 25;
                          
                          return Object.entries(country.mix).map(([type, percentage], index) => {
                            if (percentage === 0) return null;
                            
                            const startAngle = currentAngle;
                            const angleSize = percentage * 3.6; // 360 degrees / 100
                            currentAngle += angleSize;
                            
                            const startAngleRad = (startAngle - 90) * Math.PI / 180;
                            const endAngleRad = (startAngle + angleSize - 90) * Math.PI / 180;
                            
                            // Outer arc
                            const startX = centerX + radius * Math.cos(startAngleRad);
                            const startY = centerY + radius * Math.sin(startAngleRad);
                            const endX = centerX + radius * Math.cos(endAngleRad);
                            const endY = centerY + radius * Math.sin(endAngleRad);
                            
                            // Inner arc (for donut hole)
                            const innerStartX = centerX + innerRadius * Math.cos(startAngleRad);
                            const innerStartY = centerY + innerRadius * Math.sin(startAngleRad);
                            const innerEndX = centerX + innerRadius * Math.cos(endAngleRad);
                            const innerEndY = centerY + innerRadius * Math.sin(endAngleRad);
                            
                            const largeArcFlag = angleSize > 180 ? 1 : 0;
                            
                            // Create donut segment
                            const pathData = [
                              `M ${innerStartX} ${innerStartY}`,
                              `L ${startX} ${startY}`,
                              `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`,
                              `L ${innerEndX} ${innerEndY}`,
                              `A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${innerStartX} ${innerStartY}`,
                              'Z'
                            ].join(' ');
                            
                            // Animation delay based on index
                            const animationDelay = reduceMotion ? 0 : index * 0.1;
                            
                            return (
                              <g key={type}>
                                <path 
                                  d={pathData} 
                                  fill={getGenerationColor(type)}
                                  stroke="#0A1B2B" 
                                  strokeWidth="0.5"
                                  style={{
                                    transition: 'all 0.5s ease-out',
                                    transitionDelay: `${animationDelay}s`,
                                    opacity: 1,
                                    transform: 'scale(1)'
                                  }}
                                >
                                  <title>{`${type}: ${percentage}%`}</title>
                                </path>
                                
                                {/* Add label for segments > 10% */}
                                {percentage >= 10 && (
                                  <text
                                    x={centerX + (innerRadius + (radius - innerRadius) / 2) * Math.cos((startAngle + angleSize / 2 - 90) * Math.PI / 180)}
                                    y={centerY + (innerRadius + (radius - innerRadius) / 2) * Math.sin((startAngle + angleSize / 2 - 90) * Math.PI / 180)}
                                    textAnchor="middle"
                                    dominantBaseline="middle"
                                    fill="#FFFFFF"
                                    fontSize="4"
                                    fontWeight="bold"
                                    style={{
                                      transition: 'all 0.5s ease-out',
                                      transitionDelay: `${animationDelay + 0.3}s`,
                                      opacity: 1
                                    }}
                                  >
                                    {Math.round(percentage)}%
                                  </text>
                                )}
                              </g>
                            );
                          });
                        })()}
                        
                        {/* Center text with country name */}
                        <text
                          x="50"
                          y="45"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="5"
                          fontWeight="bold"
                        >
                          {mockData[selectedCountry].name}
                        </text>
                        <text
                          x="50"
                          y="52"
                          textAnchor="middle"
                          fill="#FFFFFF"
                          fontSize="4"
                        >
                          Energy Mix
                        </text>
                      </svg>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-2 mt-6">
                    {Object.entries(mockData[selectedCountry].mix)
                        .filter(([_, value]) => value > 0)
                        .map(([type, percentage]) => (
                        <div key={type} className="flex items-center">
                            <div
                            className="w-4 h-4 mr-2 rounded-sm flex-shrink-0"
                            style={{ backgroundColor: getGenerationColor(type) }}
                            />
                            <span className="capitalize">{type}:</span>
                            <span className="ml-1 font-medium">
                            {Number(percentage).toFixed(1)}%
                            </span>
                        </div>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          )}
        </div>
        
        {/* Bottom conclusion section with enhanced transition */}
        <div className={`max-w-3xl mx-auto mt-12 text-center transition-opacity duration-1000 ${
            showInfo ? 'opacity-100' : 'opacity-0'
            }`}>
            <h3 className="text-2xl font-semibold mb-4">Generation Mix Shapes Everything</h3>
            <p className="text-lg text-cloud-white/80 mb-8">
                The electricity a country generates determines not just its carbon footprint, but also its resilience to geopolitical shocks, price volatility, and climate impacts. As we transition to cleaner systems, understanding these complex trade-offs becomes critical.
            </p>
            
            {/* No need to change this as it points to a section ID, not a page */}
            <a 
                href="#energy-security" 
                className="group inline-flex items-center bg-transparent border border-sky-cyan text-sky-cyan px-6 py-3 rounded-full hover:bg-sky-cyan hover:text-white transition-colors"
            >
                <span>Explore Geopolitical Dimensions</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2 group-hover:translate-x-1 transition-transform" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </a>
        </div>
      </div>
      
      {/* Visual transition to next section using decorative elements */}
      <div className="mt-20 relative h-16">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-sky-cyan/30"></div>
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-sky-cyan/30 transform -translate-x-1/2"></div>
        <div className="absolute left-1/2 top-1/2 w-8 h-8 rounded-full bg-sky-cyan transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>
    </section>
  );
}