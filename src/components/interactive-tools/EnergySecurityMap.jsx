'use client';

import { useState } from 'react';
import ChoroplethMap from '../charts/ChoroplethMap';
import { useFetch } from '@/lib/hooks';

export default function EnergySecurityMap() {
  const [selectedMetric, setSelectedMetric] = useState('importDependency');
  const { data: energySecurityData, loading, error } = useFetch('/data/energy-security-map.json');
  const { data: geoData } = useFetch('/data/world-topo.json');
  
  // Define metrics and their descriptions
  const metrics = [
    { 
      id: 'importDependency', 
      name: 'Import Dependency', 
      description: 'Percentage of total energy consumption imported from abroad',
      unit: '%'
    },
    { 
      id: 'supplierConcentration', 
      name: 'Supplier Concentration (HHI)', 
      description: 'Herfindahl-Hirschman Index measuring concentration of energy suppliers',
      unit: 'Index value'
    },
    { 
      id: 'geopoliticalRisk', 
      name: 'Geopolitical Risk', 
      description: 'Combined index of political stability and regulatory risk in supplier countries',
      unit: 'Score (0-100)'
    },
    { 
      id: 'overallVulnerability', 
      name: 'Overall Vulnerability', 
      description: 'Composite metric combining import dependency, supplier concentration, and geopolitical risk',
      unit: 'Score (0-100)'
    },
  ];
  
  // Get selected metric details
  const currentMetric = metrics.find(m => m.id === selectedMetric);
  
  // Handle country selection for detailed view
  const [selectedCountry, setSelectedCountry] = useState(null);
  
  // Handle country details panel close
  const handleCloseDetails = () => {
    setSelectedCountry(null);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Global Energy-Security Stress Map</h2>
        <p className="text-graphite">
          Explore global patterns of energy security vulnerability through import dependency, 
          supplier concentration, and geopolitical risk indicators.
        </p>
      </div>
      
      {/* Metric selector */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-night-navy mb-2">
          Select metric:
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {metrics.map(metric => (
            <button
              key={metric.id}
              className={`p-3 text-sm rounded-md transition-colors ${
                selectedMetric === metric.id
                  ? 'bg-sky-cyan text-white'
                  : 'bg-gray-100 text-night-navy hover:bg-gray-200'
              }`}
              onClick={() => setSelectedMetric(metric.id)}
            >
              {metric.name}
            </button>
          ))}
        </div>
        
        {currentMetric && (
          <p className="mt-2 text-sm text-graphite">
            {currentMetric.description} ({currentMetric.unit})
          </p>
        )}
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-80">
          <div className="animate-pulse text-sky-cyan">Loading map data...</div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          <p>Error loading map data. Please try again later.</p>
        </div>
      )}
      
      {/* Map view */}
      {energySecurityData && geoData && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map */}
          <div className="lg:col-span-2">
            <ChoroplethMap
              data={energySecurityData}
              geoData={geoData}
              valueField={selectedMetric}
              tooltipFields={['name', selectedMetric]}
              height={500}
            />
          </div>
          
          {/* Info panel */}
          <div className="bg-night-navy/5 p-4 rounded-lg">
            <h3 className="text-lg font-medium mb-4">
              {selectedCountry ? selectedCountry.name : 'Map Legend'}
            </h3>
            
            {!selectedCountry ? (
              <>
                <p className="text-sm text-graphite mb-4">
                  Click on a country to view detailed energy security metrics
                </p>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-1">About this tool</h4>
                    <p className="text-sm text-graphite">
                      This interactive map visualizes energy security risks across countries based on several key metrics. Darker shades indicate higher vulnerability.
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium mb-1">Methodology</h4>
                    <p className="text-sm text-graphite">
                      Data is compiled from multiple sources including IEA, World Bank, and proprietary analysis. The composite vulnerability index combines all metrics with equal weighting.
                      </p>
                  </div>
                </div>
              </>
            ) : (
              // Detailed country view
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  {metrics.map(metric => (
                    <div key={metric.id} className="bg-white p-3 rounded-md">
                      <div className="text-xs text-graphite">{metric.name}</div>
                      <div className="text-xl font-semibold">
                        {selectedCountry[metric.id]}
                        <span className="text-xs ml-1">{metric.unit}</span>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Energy Mix</h4>
                  <div className="h-10 bg-gray-200 rounded-full overflow-hidden flex">
                    {selectedCountry.energyMix && (
                      <>
                        <div className="bg-sky-cyan h-full" style={{ width: `${selectedCountry.energyMix.renewable}%` }} title={`Renewable: ${selectedCountry.energyMix.renewable}%`}></div>
                        <div className="bg-gray-500 h-full" style={{ width: `${selectedCountry.energyMix.nuclear}%` }} title={`Nuclear: ${selectedCountry.energyMix.nuclear}%`}></div>
                        <div className="bg-night-navy h-full" style={{ width: `${selectedCountry.energyMix.fossil}%` }} title={`Fossil: ${selectedCountry.energyMix.fossil}%`}></div>
                      </>
                    )}
                  </div>
                  <div className="flex text-xs mt-1 justify-between">
                    <span>Renewable: {selectedCountry.energyMix?.renewable || 0}%</span>
                    <span>Nuclear: {selectedCountry.energyMix?.nuclear || 0}%</span>
                    <span>Fossil: {selectedCountry.energyMix?.fossil || 0}%</span>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Recent Price Shocks</h4>
                  <ul className="text-sm space-y-1">
                    {selectedCountry.priceShocks ? (
                      selectedCountry.priceShocks.map((shock, index) => (
                        <li key={index} className="flex justify-between">
                          <span>{shock.year}</span>
                          <span className="text-red-500">+{shock.percent}%</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-graphite">No significant price shocks recorded</li>
                    )}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Suggested Hedging Strategies</h4>
                  <ul className="text-sm space-y-1">
                    {selectedCountry.hedgingStrategies ? (
                      selectedCountry.hedgingStrategies.map((strategy, index) => (
                        <li key={index} className="flex items-start">
                          <span className="inline-block w-4 h-4 bg-sky-cyan/20 rounded-full mr-2 mt-1"></span>
                          <span>{strategy}</span>
                        </li>
                      ))
                    ) : (
                      <li className="text-graphite">No specific strategies available</li>
                    )}
                  </ul>
                </div>
                
                <button 
                  onClick={handleCloseDetails}
                  className="mt-4 text-sky-cyan hover:underline text-sm inline-flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Back to map overview
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
