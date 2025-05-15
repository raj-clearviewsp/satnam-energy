'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { feature } from 'topojson-client';
import { useReducedMotion } from '@/lib/hooks';
import { calculateColorShade } from '@/lib/utils';

export default function ChoroplethMap({
  data,
  geoData,
  colorScale = d3.interpolateBlues,
  valueField = 'value',
  tooltipFields = ['name', 'value'],
  height = 500,
}) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const [selectedYear, setSelectedYear] = useState(2023);
  const reduceMotion = useReducedMotion();
  const [dataRange, setDataRange] = useState({ min: 0, max: 100 });
  
  // Process data when year changes
  useEffect(() => {
    if (!data) return;
    
    const yearData = data.filter(d => d.year === selectedYear);
    const values = yearData.map(d => d[valueField]);
    
    setDataRange({
      min: d3.min(values) || 0,
      max: d3.max(values) || 100
    });
  }, [data, selectedYear, valueField]);

  // Draw map when data changes
  useEffect(() => {
    if (!svgRef.current || !geoData || !data) return;

    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Process TopoJSON data
    const countries = feature(geoData, geoData.objects.countries);
    
    // Create projection
    const projection = d3.geoNaturalEarth1()
      .fitSize([width, height], countries);
    
    const path = d3.geoPath().projection(projection);
    
    // Create color scale
    const colorDomain = [dataRange.min, dataRange.max];
    const color = d3.scaleSequential(colorScale).domain(colorDomain);
    
    // Filter data for selected year
    const yearData = data.filter(d => d.year === selectedYear);
    
    // Create tooltip
    const tooltip = d3.select(tooltipRef.current);
    
    // Draw map
    const g = svg.append('g');
    
    g.selectAll('path')
      .data(countries.features)
      .enter()
      .append('path')
      .attr('d', path)
      .attr('fill', d => {
        const countryData = yearData.find(item => item.id === d.id);
        return countryData ? color(countryData[valueField]) : '#f0f0f0';
      })
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .on('mouseover', (event, d) => {
        const countryData = yearData.find(item => item.id === d.id);
        
        if (countryData) {
          tooltip
            .style('display', 'block')
            .style('left', `${event.pageX + 15}px`)
            .style('top', `${event.pageY - 28}px`);
          
          tooltip.html(() => {
            let html = `<strong>${countryData.name}</strong><br/>`;
            
            tooltipFields.forEach(field => {
              if (field !== 'name' && countryData[field] !== undefined) {
                html += `${field}: ${countryData[field]}<br/>`;
              }
            });
            
            return html;
          });
        }
      })
      .on('mouseout', () => {
        tooltip.style('display', 'none');
      })
      .on('click', (event, d) => {
        const countryData = yearData.find(item => item.id === d.id);
        if (countryData) {
          console.log('Selected country:', countryData);
          // Handle country selection
        }
      });
      
    // Add country outlines
    g.append('path')
      .datum(countries)
      .attr('fill', 'none')
      .attr('stroke', '#fff')
      .attr('stroke-width', 0.5)
      .attr('d', path);
      
    // Add zoom capability
    const zoom = d3.zoom()
      .scaleExtent([1, 8])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });
      
    svg.call(zoom);
    
  }, [geoData, data, height, selectedYear, dataRange, colorScale, valueField, tooltipFields]);

  // Handle year change
  const handleYearChange = (event) => {
    setSelectedYear(parseInt(event.target.value));
  };

  // Available years for the slider
  const years = data ? [...new Set(data.map(d => d.year))].sort() : [2023];
  
  return (
    <div className="relative">
      <div className="mb-4">
        <label htmlFor="year-slider" className="block text-sm font-medium text-gray-700 mb-2">
          Year: {selectedYear}
        </label>
        <input
          id="year-slider"
          type="range"
          min={years[0]}
          max={years[years.length - 1]}
          value={selectedYear}
          onChange={handleYearChange}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          step="1"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{years[0]}</span>
          <span>{years[years.length - 1]}</span>
        </div>
      </div>
      
      <div className="relative">
        <svg ref={svgRef} width="100%" height={height} className="border rounded-lg"></svg>
        <div 
          ref={tooltipRef} 
          className="absolute hidden bg-night-navy text-white px-3 py-2 rounded shadow-lg text-sm pointer-events-none"
          style={{ zIndex: 10 }}
        ></div>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex items-center">
        <span className="text-xs text-gray-700">Low</span>
        <div className="mx-2 h-3 flex-grow rounded-full" style={{
          background: `linear-gradient(to right, ${
            calculateColorShade(dataRange.min, dataRange.min, dataRange.max)
          }, ${
            calculateColorShade(dataRange.max, dataRange.min, dataRange.max)
          })`
        }}></div>
        <span className="text-xs text-gray-700">High</span>
      </div>
    </div>
  );
}