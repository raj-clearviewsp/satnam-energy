'use client';

import { useRef, useEffect, useState } from 'react';
import * as d3 from 'd3';
import { useReducedMotion } from '@/lib/hooks';

export default function LineChart({
  data,
  xField = 'date',
  yField = 'value',
  color = '#00B6F1',
  height = 400,
  margin = { top: 20, right: 30, bottom: 50, left: 50 },
  title,
  xAxisLabel,
  yAxisLabel,
  animate = true,
}) {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);
  const reduceMotion = useReducedMotion();
  
  useEffect(() => {
    if (!svgRef.current || !data || data.length === 0) return;
    
    const svg = d3.select(svgRef.current);
    const width = svgRef.current.clientWidth;
    const tooltipDiv = d3.select(tooltipRef.current);
    
    // Clear previous content
    svg.selectAll('*').remove();
    
    // Create scales
    const xScale = d3.scaleTime()
      .domain(d3.extent(data, d => new Date(d[xField])))
      .range([margin.left, width - margin.right]);
      
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[yField]) * 1.1])
      .nice()
      .range([height - margin.bottom, margin.top]);
      
    // Create axes
    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale).ticks(width > 500 ? 10 : 5).tickSizeOuter(0))
      .call(g => g.select('.domain').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6B7280'));
      
    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale).ticks(height > 300 ? 10 : 5).tickSizeOuter(0))
      .call(g => g.select('.domain').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick line').attr('stroke', '#E5E7EB'))
      .call(g => g.selectAll('.tick text').attr('fill', '#6B7280'));
      
    // Add axes
    svg.append('g').call(xAxis);
    svg.append('g').call(yAxis);
    
    // Add axes labels
    if (xAxisLabel) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', height - 5)
        .attr('text-anchor', 'middle')
        .attr('fill', '#6B7280')
        .attr('font-size', 12)
        .text(xAxisLabel);
    }
    
    if (yAxisLabel) {
      svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -(height / 2))
        .attr('y', 15)
        .attr('text-anchor', 'middle')
        .attr('fill', '#6B7280')
        .attr('font-size', 12)
        .text(yAxisLabel);
    }
    
    // Create line generator
    const line = d3.line()
      .x(d => xScale(new Date(d[xField])))
      .y(d => yScale(d[yField]))
      .curve(d3.curveMonotoneX);
      
    // Add background grid
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale)
        .ticks(10)
        .tickSize(-(height - margin.top - margin.bottom))
        .tickFormat('')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', '#E5E7EB')
        .attr('stroke-opacity', 0.5)
        .attr('stroke-dasharray', '2,2')
      );
      
    svg.append('g')
      .attr('class', 'grid')
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(yScale)
        .ticks(10)
        .tickSize(-(width - margin.left - margin.right))
        .tickFormat('')
      )
      .call(g => g.select('.domain').remove())
      .call(g => g.selectAll('.tick line')
        .attr('stroke', '#E5E7EB')
        .attr('stroke-opacity', 0.5)
        .attr('stroke-dasharray', '2,2')
      );
      
    // Add line with animation
    const path = svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', color)
      .attr('stroke-width', 2.5)
      .attr('d', line);
      
    if (animate && !reduceMotion) {
      const totalLength = path.node().getTotalLength();
      
      path
        .attr('stroke-dasharray', totalLength + ' ' + totalLength)
        .attr('stroke-dashoffset', totalLength)
        .transition()
        .duration(1500)
        .ease(d3.easeLinear)
        .attr('stroke-dashoffset', 0);
    }
    
    // Add dots with tooltips
    svg.selectAll('dot')
      .data(data)
      .enter()
      .append('circle')
      .attr('r', 4)
      .attr('cx', d => xScale(new Date(d[xField])))
      .attr('cy', d => yScale(d[yField]))
      .attr('fill', color)
      .on('mouseover', (event, d) => {
        tooltipDiv
          .style('display', 'block')
          .style('left', `${event.pageX + 15}px`)
          .style('top', `${event.pageY - 28}px`)
          .html(`
            <div class="font-medium">${new Date(d[xField]).toLocaleDateString()}</div>
            <div>${yField}: ${d[yField]}</div>
          `);
      })
      .on('mouseout', () => {
        tooltipDiv.style('display', 'none');
      });
      
    // Add title if provided
    if (title) {
      svg.append('text')
        .attr('x', width / 2)
        .attr('y', margin.top / 2)
        .attr('text-anchor', 'middle')
        .attr('font-size', 16)
        .attr('font-weight', 'bold')
        .attr('fill', '#0A1B2B')
        .text(title);
    }
  }, [data, xField, yField, color, height, margin, title, xAxisLabel, yAxisLabel, animate, reduceMotion]);
  
  return (
    <div className="relative">
      <svg ref={svgRef} width="100%" height={height}></svg>
      <div 
        ref={tooltipRef} 
        className="absolute hidden bg-night-navy text-white px-3 py-2 rounded shadow-lg text-sm pointer-events-none"
        style={{ zIndex: 10 }}
      ></div>
    </div>
  );
}