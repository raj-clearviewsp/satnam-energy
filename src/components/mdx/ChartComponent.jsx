'use client';

import { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { useReducedMotion } from '@/lib/hooks';

export default function ChartComponent({ 
  data, 
  xKey = 'year', 
  lines = [{ key: 'value', color: '#00B6F1', name: 'Value' }],
  title,
  description,
  height = 400,
}) {
  const reduceMotion = useReducedMotion();
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    // If reduced motion is enabled, skip animation
    if (reduceMotion) {
      setShowAnimation(true);
      return;
    }
    
    const timer = setTimeout(() => {
      setShowAnimation(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [reduceMotion]);

  return (
    <div className="my-8 bg-white p-6 rounded-lg shadow-md">
      {title && (
        <h3 className="text-xl font-semibold mb-2 text-night-navy">{title}</h3>
      )}
      
      {description && (
        <p className="text-graphite mb-6">{description}</p>
      )}
      
      <div className="h-[400px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey={xKey} 
              tick={{ fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <YAxis 
              tick={{ fill: '#6B7280' }}
              axisLine={{ stroke: '#E5E7EB' }}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#0A1B2B', 
                border: 'none',
                borderRadius: '4px',
                color: '#F8FBFD'
              }}
            />
            <Legend />
            {lines.map((line, index) => (
              <Line
                key={line.key}
                type="monotone"
                dataKey={line.key}
                name={line.name}
                stroke={line.color}
                strokeWidth={2}
                dot={{ r: 4 }}
                activeDot={{ r: 6 }}
                isAnimationActive={showAnimation}
                animationDuration={reduceMotion ? 0 : 1500}
                animationEasing="ease-out"
                animationBegin={reduceMotion ? 0 : index * 300}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}