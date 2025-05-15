'use client';

import { useState } from 'react';
import LineChart from '../charts/LineChart';
import AreaChart from '../charts/AreaChart';
import { useFetch } from '@/lib/hooks';
import Button from '../ui/Button';

export default function RenewableFinanceTracker() {
  const { data: financeData, loading, error } = useFetch('/data/renewable-finance.json');
  
  // State for filters
  const [selectedRegion, setSelectedRegion] = useState('global');
  const [selectedTechnology, setSelectedTechnology] = useState('all');
  const [showCarbonPrice, setShowCarbonPrice] = useState(false);
  const [includeCurrencyHedge, setIncludeCurrencyHedge] = useState(false);
  const [includeIncentives, setIncludeIncentives] = useState(false);
  
  // Process data based on filters
  const processedData = financeData ? financeData.filter(item => {
    return (
      (selectedRegion === 'global' || item.region === selectedRegion) && 
      (selectedTechnology === 'all' || item.technology === selectedTechnology)
    );
  }) : [];
  
  // Get unique regions and technologies for filter options
  const regions = financeData 
    ? ['global', ...new Set(financeData.map(item => item.region))]
    : ['global'];
    
  const technologies = financeData
    ? ['all', ...new Set(financeData.map(item => item.technology))]
    : ['all'];
  
  // Generate report data
  const generateReport = () => {
    console.log('Generating report with settings:', {
      region: selectedRegion,
      technology: selectedTechnology,
      carbonPrice: showCarbonPrice,
      currencyHedge: includeCurrencyHedge,
      incentives: includeIncentives
    });
    
    // In a real app, this would trigger a download or open a modal with the report
    alert('Report generated! In a real app, this would download a PDF or Excel file.');
  };
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Renewable Finance Sentiment Tracker</h2>
        <p className="text-graphite">
          Track financing trends, capital costs, and investment flows for renewable energy technologies 
          across key global markets.
        </p>
      </div>
      
      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {/* Region filter */}
        <div>
          <label className="block text-sm font-medium text-night-navy mb-2">
            Region:
          </label>
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-cyan focus:ring-sky-cyan"
          >
            {regions.map(region => (
              <option key={region} value={region}>
                {region.charAt(0).toUpperCase() + region.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Technology filter */}
        <div>
          <label className="block text-sm font-medium text-night-navy mb-2">
            Technology:
          </label>
          <select
            value={selectedTechnology}
            onChange={(e) => setSelectedTechnology(e.target.value)}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-sky-cyan focus:ring-sky-cyan"
          >
            {technologies.map(tech => (
              <option key={tech} value={tech}>
                {tech === 'all' ? 'All Technologies' : tech.charAt(0).toUpperCase() + tech.slice(1)}
              </option>
            ))}
          </select>
        </div>
        
        {/* Scenario toggles */}
        <div>
          <label className="block text-sm font-medium text-night-navy mb-2">
            Scenarios:
          </label>
          <div className="space-y-2">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={showCarbonPrice}
                onChange={() => setShowCarbonPrice(!showCarbonPrice)}
                className="rounded text-sky-cyan focus:ring-sky-cyan"
              />
              <span className="ml-2 text-sm text-night-navy">Include carbon price impact</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeCurrencyHedge}
                onChange={() => setIncludeCurrencyHedge(!includeCurrencyHedge)}
                className="rounded text-sky-cyan focus:ring-sky-cyan"
              />
              <span className="ml-2 text-sm text-night-navy">Include currency hedging costs</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={includeIncentives}
                onChange={() => setIncludeIncentives(!includeIncentives)}
                className="rounded text-sky-cyan focus:ring-sky-cyan"
              />
              <span className="ml-2 text-sm text-night-navy">Include policy incentives</span>
            </label>
          </div>
        </div>
      </div>
      
      {/* Loading state */}
      {loading && (
        <div className="flex justify-center items-center h-80">
          <div className="animate-pulse text-sky-cyan">Loading financial data...</div>
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="bg-red-50 text-red-600 p-4 rounded-md">
          <p>Error loading financial data. Please try again later.</p>
        </div>
      )}
      
      {/* Charts */}
      {financeData && (
        <div className="space-y-8">
          {/* WACC Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">Weighted Average Cost of Capital (WACC)</h3>
            <LineChart
              data={processedData}
              xField="date"
              yField="wacc"
              color="#00B6F1"
              height={350}
              title={`WACC Trends (${selectedRegion === 'global' ? 'Global' : selectedRegion})`}
              xAxisLabel="Date"
              yAxisLabel="WACC (%)"
            />
          </div>
          
          {/* Investment Flow Chart */}
          <div>
            <h3 className="text-lg font-medium mb-4">Investment Flows</h3>
            <AreaChart
              data={processedData}
              xField="date"
              yField="investment"
              color="#0A1B2B"
              fillOpacity={0.2}
              height={350}
              title={`Investment Trends (${selectedRegion === 'global' ? 'Global' : selectedRegion})`}
              xAxisLabel="Date"
              yAxisLabel="Investment ($ billions)"
            />
          </div>
          
          {/* Key Insights */}
          <div className="bg-night-navy/5 p-6 rounded-lg">
            <h3 className="text-lg font-medium mb-4">Key Insights</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Financing Trends</h4>
                <ul className="space-y-2 text-graphite">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-sky-cyan rounded-full mr-2 mt-1"></span>
                    <span>WACC has decreased by ~1.5% over the past 2 years for solar PV globally</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-sky-cyan rounded-full mr-2 mt-1"></span>
                    <span>Green hydrogen financing costs remain elevated due to technology risk premium</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-sky-cyan rounded-full mr-2 mt-1"></span>
                    <span>European policy incentives have reduced effective WACC by 0.8% for wind projects</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Risk Factors</h4>
                <ul className="space-y-2 text-graphite">
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-night-navy rounded-full mr-2 mt-1"></span>
                    <span>Currency volatility adding 1.2% to unhedged project costs in emerging markets</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-night-navy rounded-full mr-2 mt-1"></span>
                    <span>Regulatory uncertainty has increased risk premium in Asia by 0.6%</span>
                  </li>
                  <li className="flex items-start">
                    <span className="inline-block w-4 h-4 bg-night-navy rounded-full mr-2 mt-1"></span>
                    <span>Supply chain disruptions impacting returns across all technologies</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Download report button */}
            <div className="mt-6">
              <Button
                onClick={generateReport}
                variant="primary"
                className="w-full md:w-auto"
              >
                Generate Detailed Report
              </Button>
              <p className="text-xs text-graphite mt-2">
                Includes detailed scenario tables and regional benchmarks
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}