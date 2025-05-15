'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from '@/lib/hooks';

// Mock data for geopolitical risk indicators
const mockData = {
  years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023],
  countries: [
    {
        id: "USA",
        name: "United States",
        color: "#0066CC",
        indicators: {
            "Political Stability": [66.67, 59.05, 55.71, 58.96, 52.36, 47.64, 46.70, 46.23, 47.39],
            "Regulatory Quality": [85.24, 91.9, 92.86, 92.86, 89.05, 87.14, 90.48, 91.04, 90.57],
            "Energy Independence": [62, 68, 75, 82, 87, 90, 88, 85, 83],
            "Supply Diversity": [72, 74, 75, 75, 76, 78, 79, 80, 82]
        },
        hhi: [2779.0, 2811.0, 2843.0, 2860.0, 2911.0, 2890.0, 2875.0, 2933.0, 3011.0],
        energySources: [
            {
            name: "Coal, peat and oil shale",
            color: "#545454",
            values: [0.161, 0.1477, 0.1422, 0.1337, 0.1148, 0.101, 0.111, 0.1012, 0.0918]
            },
            {
            name: "Crude",
            color: "#8B4513",
            values: [0.4019, 0.4074, 0.4167, 0.4132, 0.4099, 0.3946, 0.4004, 0.4026, 0.4176]
            },
            {
            name: "Natural gas",
            color: "#76b7b2",
            values: [0.2784, 0.2823, 0.2768, 0.2894, 0.31, 0.3276, 0.316, 0.3264, 0.3227]
            },
            {
            name: "Nuclear",
            color: "#af8dc3",
            values: [0.0931, 0.0946, 0.094, 0.0914, 0.0918, 0.0977, 0.0924, 0.0886, 0.0896]
            },
            {
            name: "Renewables and waste",
            color: "#7fc97f",
            values: [0.0655, 0.0681, 0.0703, 0.0724, 0.0736, 0.0791, 0.0802, 0.0812, 0.0782]
            }
        ]
       },
      {
      id: "BRA",
      name: "Brazil",
      color: "#4daf4a",
      indicators: {
        "Political Stability": [22.38, 23.81, 22.38, 22.17, 18.40, 31.13, 31.13, 31.13, 28.44],
        "Regulatory Quality": [47.14, 46.67, 47.62, 40.48, 49.05, 47.62, 47.14, 43.87, 40.09],
        "Energy Independence": [40, 38, 36, 35, 33, 32, 30, 25, 42],
        "Supply Diversity": [62, 63, 65, 66, 68, 67, 65, 58, 68]
      },
      hhi: [3381.0, 3496.0, 3461.0, 3550.0, 3602.0, 3708.0, 3472.0, 3759.0, 3870.0],
      energySources: [
        {
          name: "Coal, peat and oil shale",
          color: "#545454",
          values: [0.0618, 0.0585, 0.0615, 0.06, 0.0555, 0.0497, 0.0596, 0.0482, 0.045]
        },
        {
          name: "Crude",
          color: "#8B4513",
          values: [0.3706, 0.3598, 0.3445, 0.3351, 0.3303, 0.3372, 0.3352, 0.3528, 0.3569]
        },
        {
          name: "Natural gas",
          color: "#76b7b2",
          values: [0.1302, 0.1158, 0.1225, 0.115, 0.1146, 0.107, 0.1285, 0.0964, 0.0856]
        },
        {
          name: "Nuclear",
          color: "#af8dc3",
          values: [0.0134, 0.0152, 0.015, 0.0149, 0.0151, 0.013, 0.0134, 0.0131, 0.0124]
        },
        {
          name: "Renewables and waste",
          color: "#7fc97f",
          values: [0.424, 0.4507, 0.4565, 0.475, 0.4844, 0.493, 0.4633, 0.4895, 0.5001]
        }
      ]
    },
    {
      id: "CHN",
      name: "China",
      color: "#ff7f00",
      indicators: {
        "Political Stability": [26.19, 26.67, 38.57, 36.32, 38.21, 27.83, 28.30, 29.72, 25.12],
        "Regulatory Quality": [41.9, 40.95, 45.24, 44.29, 41.9, 44.29, 40, 36.79, 38.68],
        "Energy Independence": [84, 82, 80, 78, 76, 75, 73, 72, 72],
        "Supply Diversity": [58, 59, 60, 61, 63, 64, 66, 68, 70]
      },
      hhi: [4855.0, 4617.0, 4475.0, 4328.0, 4221.0, 4176.0, 4155.0, 4191.0, 4289.0],
      energySources: [
        {
          name: "Coal, peat and oil shale",
          color: "#545454",
          values: [0.6649, 0.6429, 0.6302, 0.6166, 0.6061, 0.602, 0.6015, 0.6065, 0.6172]
        },
        {
          name: "Crude",
          color: "#8B4513",
          values: [0.1817, 0.1914, 0.1932, 0.1956, 0.199, 0.1983, 0.192, 0.1834, 0.1759]
        },
        {
          name: "Natural gas",
          color: "#76b7b2",
          values: [0.0528, 0.057, 0.0628, 0.07, 0.0726, 0.0751, 0.0794, 0.0778, 0.08]
        },
        {
          name: "Nuclear",
          color: "#af8dc3",
          values: [0.0148, 0.0185, 0.0208, 0.0235, 0.0266, 0.027, 0.0282, 0.0285, 0.0273]
        },
        {
          name: "Renewables and waste",
          color: "#7fc97f",
          values: [0.0858, 0.0902, 0.093, 0.0944, 0.0957, 0.0975, 0.0989, 0.1038, 0.0996]
        }
      ]
    },
    {
      id: "IND",
      name: "India",
      color: "#e41a1c",
      indicators: {
        "Political Stability": [17.14, 14.76, 18.57, 13.68, 19.34, 18.40, 22.64, 24.06, 21.33],
        "Regulatory Quality": [37.14, 41.43, 42.86, 44.76, 47.14, 46.67, 49.05, 50.94, 47.17],
        "Energy Independence": [32, 30, 28, 27, 26, 24, 22, 20, 18],
        "Supply Diversity": [45, 47, 49, 51, 54, 56, 59, 62, 65]
      },
      hhi: [3213.0, 3151.0, 3159.0, 3178.0, 3134.0, 3107.0, 3175.0, 3237.0, 3318.0],
      energySources: [
        {
          name: "Coal, peat and oil shale",
          color: "#545454",
          values: [0.437, 0.4216, 0.426, 0.431, 0.4247, 0.4229, 0.4392, 0.4467, 0.4679]
        },
        {
          name: "Crude",
          color: "#8B4513",
          values: [0.2866, 0.2938, 0.2876, 0.2826, 0.2807, 0.2607, 0.2565, 0.2596, 0.2468]
        },
        {
          name: "Natural gas",
          color: "#76b7b2",
          values: [0.052, 0.0543, 0.0552, 0.0546, 0.0565, 0.0584, 0.0563, 0.0495, 0.0531]
        },
        {
          name: "Nuclear",
          color: "#af8dc3",
          values: [0.0112, 0.0112, 0.0108, 0.0103, 0.0126, 0.0124, 0.0125, 0.0115, 0.0109]
        },
        {
          name: "Renewables and waste",
          color: "#7fc97f",
          values: [0.2131, 0.2191, 0.2203, 0.2215, 0.2255, 0.2456, 0.2355, 0.2328, 0.2213]
        }
      ]
    },
    {
      id: "DEU",
      name: "Germany",
      color: "#984ea3",
      indicators: {
        "Political Stability": [68.10, 68.57, 65.24, 64.62, 65.09, 67.92, 69.81, 66.98, 66.35],
        "Regulatory Quality": [94.29, 96.7, 95.24, 95.24, 96.2, 93.33, 94.76, 92.45, 92],
        "Energy Independence": [95, 95, 95, 96, 96, 96, 97, 97, 98],
        "Supply Diversity": [40, 41, 42, 43, 44, 45, 46, 47, 48]
      },
      hhi: [2346.0, 2361.0, 2362.0, 2333.0, 2346.0, 2402.0, 2350.0, 2483.0, 2599.0],
      energySources: [
        {
          name: "Coal, peat and oil shale",
          color: "#545454",
          values: [0.2579, 0.2492, 0.2315, 0.232, 0.1945, 0.1638, 0.189, 0.2016, 0.1785]
        },
        {
          name: "Crude",
          color: "#8B4513",
          values: [0.3123, 0.3127, 0.3109, 0.3016, 0.3104, 0.3179, 0.3023, 0.3355, 0.3355]
        },
        {
          name: "Natural gas",
          color: "#76b7b2",
          values: [0.2116, 0.227, 0.2442, 0.2451, 0.2609, 0.2739, 0.2707, 0.2424, 0.2624]
        },
        {
          name: "Nuclear",
          color: "#af8dc3",
          values: [0.0777, 0.0712, 0.0645, 0.066, 0.0675, 0.0616, 0.0632, 0.0328, 0.0078]
        },
        {
          name: "Renewables and waste",
          color: "#7fc97f",
          values: [0.1406, 0.1399, 0.149, 0.1552, 0.1666, 0.1829, 0.1749, 0.1877, 0.2159]
        }
      ]
    }
  ]
};

// Descriptions for each indicator
const indicatorDescriptions = {
  "Political Stability": "Measures government stability, absence of violence, and institutional strength. World Bank Data (World Governance Indicators). Displayed as percentile rank.",
  "Regulatory Quality": "Assesses the quality of policies and regulations that enable energy market function. World Bank Data (World Governance Indicators). Displayed as percentile rank.",
  "Supply Diversity": "Measures the diversification of energy sources using the Herfindahl-Hirschman Index (HHI). Lower values indicate better diversification and improved resilience against disruptions."
};

// Sources for each indicator
const indicatorSources = {
  "Political Stability": "Source: World Governance Indicators (World Bank). Measured as percentile rank among all countries.",
  "Regulatory Quality": "Source: World Governance Indicators (World Bank). Measured as percentile rank among all countries.",
  "Supply Diversity": "Source: Calculated from IEA World Energy Balance data. The Herfindahl-Hirschman Index (HHI) is computed by squaring the market share of each energy source in a country's total primary energy supply and summing the resulting numbers."
};

// Energy Supply Diversity Chart Component
const EnergySupplyDiversityChart = ({ selectedCountries, highlightedCountry, toggleCountry }) => {
  const chartRef = useRef(null);
  const legendRef = useRef(null);
  const areaChartRef = useRef(null);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [yearIndex, setYearIndex] = useState(8); // Default to latest year

  useEffect(() => {
    if (selectedCountries.length > 0 && !selectedCountry) {
      setSelectedCountry(selectedCountries[0]);
    } else if (selectedCountries.length > 0 && !selectedCountries.includes(selectedCountry)) {
      setSelectedCountry(selectedCountries[0]);
    }
  }, [selectedCountries, selectedCountry]);

  useEffect(() => {
    if (highlightedCountry) {
      setSelectedCountry(highlightedCountry);
    }
  }, [highlightedCountry]);

  // Set default year to 2023 (last year in dataset)
  useEffect(() => {
    // Initialize to the last year (2023) which is the last index in our years array
    setYearIndex(mockData.years.length - 1);
  }, []);

  // Render the HHI Index chart
  useEffect(() => {
    if (!chartRef.current) return;

    // Import D3 on client side
    import('d3').then((d3) => {
      // Clear any existing SVG
      d3.select(chartRef.current).selectAll("*").remove();

      // Set up dimensions
      const margin = { top: 40, right: 20, bottom: 30, left: 60 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = 240 - margin.top - margin.bottom;

      // Create SVG
      const svg = d3.select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Create scales
      const xScale = d3.scaleLinear()
        .domain([d3.min(mockData.years), d3.max(mockData.years)])
        .range([0, width]);

      // For HHI, we use the 0-1 normalized scale for better intuition
      const yScale = d3.scaleLinear()
        .domain([0, 0.5]) // Max HHI normalized is around 0.48 (4800/10000)
        .range([0, height]);

      // Invert y-scale for visualization (lower HHI = higher on chart)
      const yScaleInverted = d3.scaleLinear()
        .domain([0, 0.5])
        .range([height, 0]);

      // Create axes
      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d"))
        .ticks(mockData.years.length);

      const yAxis = d3.axisLeft(yScaleInverted)
        .ticks(5)
        .tickFormat(d => d.toFixed(2)); // Format as decimal

      // Add X axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#F8FBFD");

      // Add Y axis
      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#F8FBFD");

      // Add X axis label
      svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .style("fill", "#F8FBFD")
        .style("font-size", "12px")
        .text("Year");

      // Add Y axis label
      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${-margin.left + 20},${height / 2}) rotate(-90)`)
        .style("fill", "#F8FBFD")
        .style("font-size", "12px")
        .text("Normalized HHI (0-1)");

      // Add grid lines
      svg.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(yScaleInverted.ticks(5))
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", d => yScaleInverted(d))
        .attr("y2", d => yScaleInverted(d))
        .attr("stroke", "rgba(248, 251, 253, 0.1)")
        .attr("stroke-dasharray", "3,3");

      // Add colored background zones for HHI interpretation
      // Highly diversified: 0-0.15
      svg.append("rect")
        .attr("x", 0)
        .attr("y", yScaleInverted(0.15))
        .attr("width", width)
        .attr("height", yScaleInverted(0) - yScaleInverted(0.15))
        .attr("fill", "rgba(127, 201, 127, 0.1)") // Green tint
        .attr("stroke", "none");

      // Moderately diversified: 0.15-0.25
      svg.append("rect")
        .attr("x", 0)
        .attr("y", yScaleInverted(0.25))
        .attr("width", width)
        .attr("height", yScaleInverted(0.15) - yScaleInverted(0.25))
        .attr("fill", "rgba(118, 183, 178, 0.1)") // Blue-green tint
        .attr("stroke", "none");

      // Concentrated: 0.25+
      svg.append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", yScaleInverted(0.25))
        .attr("fill", "rgba(228, 26, 28, 0.1)") // Red tint
        .attr("stroke", "none");

      // Add zone labels
      svg.append("text")
        .attr("x", width - 5)
        .attr("y", yScaleInverted(0.075))
        .attr("text-anchor", "end")
        .attr("fill", "rgba(127, 201, 127, 0.8)")
        .attr("font-size", "10px")
        .text("Highly Diversified");

      svg.append("text")
        .attr("x", width - 5)
        .attr("y", yScaleInverted(0.2))
        .attr("text-anchor", "end")
        .attr("fill", "rgba(118, 183, 178, 0.8)")
        .attr("font-size", "10px")
        .text("Moderately Diversified");

      svg.append("text")
        .attr("x", width - 5)
        .attr("y", yScaleInverted(0.35))
        .attr("text-anchor", "end")
        .attr("fill", "rgba(228, 26, 28, 0.8)")
        .attr("font-size", "10px")
        .text("Concentrated");

      // Create line generator
      const line = d3.line()
        .x((d, i) => xScale(mockData.years[i]))
        .y(d => yScaleInverted(d/10000)) // Normalize each value here
        .curve(d3.curveMonotoneX);

      // Add lines for each selected country
      const filteredCountries = mockData.countries.filter(country =>
        selectedCountries.includes(country.id)
      );

      // Add lines with animation
      filteredCountries.forEach((country, index) => {
        // Pass the raw data to the line generator which will normalize each value
        const path = svg.append("path")
          .datum(country.hhi)
          .attr("fill", "none")
          .attr("stroke", country.color)
          .attr("stroke-width", selectedCountry === country.id ? 4 : 2)
          .attr("d", line)
          .style("opacity", selectedCountry && selectedCountry !== country.id ? 0.3 : 1);

        // Animate path
        const pathLength = path.node().getTotalLength();

        path.attr("stroke-dasharray", pathLength)
          .attr("stroke-dashoffset", pathLength)
          .transition()
          .duration(1500)
          .delay(index * 200)
          .ease(d3.easeLinear)
          .attr("stroke-dashoffset", 0);

        // Add dots for each data point
        svg.selectAll(`.dot-${country.id}`)
          .data(country.hhi)
          .enter()
          .append("circle")
          .attr("class", `dot-${country.id}`)
          .attr("cx", (d, i) => xScale(mockData.years[i]))
          .attr("cy", d => yScaleInverted(d/10000)) // Normalize here too
          .attr("r", 4)
          .attr("fill", country.color)
          .style("opacity", selectedCountry && selectedCountry !== country.id ? 0.3 : 1)
          .on("mouseover", (event, d) => {
            const i = country.hhi.indexOf(d);
            const year = mockData.years[i];
            const normalizedValue = (d/10000).toFixed(3);

            // Show tooltip
            d3.select(".tooltip")
              .style("opacity", 1)
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 28}px`)
              .html(`
                <strong>${country.name}</strong><br/>
                HHI: ${d.toFixed(1)} (${normalizedValue} normalized)<br/>
                Year: ${year}
              `);
          })
          .on("click", (event, d) => {
            const i = country.hhi.indexOf(d);
            setYearIndex(i);
            setSelectedCountry(country.id);
          })
          .on("mouseout", () => {
            // Hide tooltip
            d3.select(".tooltip")
              .style("opacity", 0);
          });
      });

      // Add chart title
      svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -15)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#F8FBFD")
        .text("Herfindahl-Hirschman Index (2015-2023)");
    });
  }, [selectedCountries, selectedCountry, yearIndex]);

  // Render the Energy Composition area chart
  useEffect(() => {
    if (!areaChartRef.current || !selectedCountry) return;

    const countryData = mockData.countries.find(c => c.id === selectedCountry);
    if (!countryData) return;

    // Import D3 on client side
    import('d3').then((d3) => {
      // Clear any existing SVG
      d3.select(areaChartRef.current).selectAll("*").remove();

      // Set up dimensions
      const margin = { top: 30, right: 20, bottom: 40, left: 60 };
      const width = areaChartRef.current.clientWidth - margin.left - margin.right;
      const height = 240 - margin.top - margin.bottom;

      // Create SVG
      const svg = d3.select(areaChartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      // Prepare data for stacked area chart
      const keys = countryData.energySources.map(source => source.name);
      
      // Transform data for d3 stacked area
      const stackData = mockData.years.map((year, i) => {
        const yearData = { year };
        countryData.energySources.forEach(source => {
          yearData[source.name] = source.values[i];
        });
        return yearData;
      });

      // Create scales
      const xScale = d3.scaleLinear()
        .domain([d3.min(mockData.years), d3.max(mockData.years)])
        .range([0, width]);

      const yScale = d3.scaleLinear()
        .domain([0, 1])
        .range([height, 0]);

      // Stack generator
      const stack = d3.stack().keys(keys);
      const stackedData = stack(stackData);

      // Create color scale based on the country's energy sources colors
      const colorScale = d3.scaleOrdinal()
        .domain(keys)
        .range(countryData.energySources.map(source => source.color));

      // Area generator
      const area = d3.area()
        .x((d, i) => xScale(mockData.years[i]))
        .y0(d => yScale(d[0]))
        .y1(d => yScale(d[1]))
        .curve(d3.curveMonotoneX);

      // Draw stacked areas
      svg.selectAll(".area")
        .data(stackedData)
        .enter()
        .append("path")
        .attr("class", "area")
        .attr("d", area)
        .attr("fill", d => colorScale(d.key))
        .attr("opacity", 0.9)
        .attr("stroke", "#0A1B2B")
        .attr("stroke-width", 0.5);

      // Add X axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(xScale).tickFormat(d3.format("d")).ticks(mockData.years.length))
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#F8FBFD");

      // Add Y axis
      svg.append("g")
        .attr("class", "y-axis")
        .call(d3.axisLeft(yScale).tickFormat(d3.format(".0%")).ticks(5))
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#F8FBFD");

      // Add X axis label
      svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 5)
        .style("fill", "#F8FBFD")
        .style("font-size", "12px")
        .text("Year");

      // Add Y axis label
      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${-margin.left + 20},${height / 2}) rotate(-90)`)
        .style("fill", "#F8FBFD")
        .style("font-size", "12px")
        .text("Share of Energy Mix");

      // Add vertical line for selected year
      const selectedYearPos = xScale(mockData.years[yearIndex]);
      
      svg.append("line")
        .attr("class", "selected-year-line")
        .attr("x1", selectedYearPos)
        .attr("x2", selectedYearPos)
        .attr("y1", 0)
        .attr("y2", height)
        .attr("stroke", "#00B6F1")
        .attr("stroke-width", 2)
        .attr("stroke-dasharray", "4,4");

      // Add year label
      svg.append("text")
        .attr("class", "selected-year-label")
        .attr("x", selectedYearPos)
        .attr("y", -5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .style("font-weight", "bold")
        .style("fill", "#00B6F1")
        .text(mockData.years[yearIndex]);

      // Add chart title
      svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .style("fill", "#F8FBFD")
        .text(`${countryData.name} Energy Mix Composition`);
      
      // Add interactions - hover effects
      svg.selectAll(".area")
        .on("mouseover", function(event, d) {
          // Highlight this area
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 1);
          
          // Get the stack data for the current year
          const i = yearIndex;
          const sourceData = d[i];
          const sourceName = d.key;
          const percentage = (sourceData[1] - sourceData[0]) * 100;
          
          // Show tooltip
          d3.select(".tooltip")
            .style("opacity", 1)
            .style("left", `${event.pageX + 10}px`)
            .style("top", `${event.pageY - 28}px`)
            .html(`
              <strong>${sourceName}</strong><br/>
              ${percentage.toFixed(1)}% of energy mix<br/>
              Year: ${mockData.years[i]}
            `);
        })
        .on("click", function(event, d) {
          // We could add specific interaction here if needed
          // But we keep the year selection controlled by the HHI chart
        })
        .on("mouseout", function() {
          // Reset opacity
          d3.select(this)
            .transition()
            .duration(200)
            .attr("opacity", 0.9);
          
          // Hide tooltip
          d3.select(".tooltip")
            .style("opacity", 0);
        });
      
      // Add source attribution at the bottom
      svg.append("text")
        .attr("x", width)
        .attr("y", height + margin.bottom - 5)
        .attr("text-anchor", "end")
        .style("font-size", "9px")
        .style("fill", "#F8FBFD80")
        .text("Data source: IEA World Energy Balance");
    });
  }, [selectedCountry, yearIndex]);

  // Render energy source legend
  useEffect(() => {
    if (!legendRef.current || !selectedCountry) return;

    const countryData = mockData.countries.find(c => c.id === selectedCountry);
    if (!countryData) return;

    // Import D3 on client side
    import('d3').then((d3) => {
      // Clear existing content
      d3.select(legendRef.current).selectAll("*").remove();

      // Create SVG
      const svg = d3.select(legendRef.current)
        .append("svg")
        .attr("width", "100%")
        .attr("height", countryData.energySources.length * 25 + 30);

      // Add title
      svg.append("text")
        .attr("x", 0)
        .attr("y", 15)
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .style("fill", "#F8FBFD")
        .text("Energy Sources");

      // Add legend items
      const legend = svg.selectAll(".legend-item")
        .data(countryData.energySources)
        .enter()
        .append("g")
        .attr("class", "legend-item")
        .attr("transform", (d, i) => `translate(0, ${i * 25 + 30})`);

      // Add colored rectangles
      legend.append("rect")
        .attr("width", 15)
        .attr("height", 15)
        .attr("fill", d => d.color);

      // Add source names
      legend.append("text")
        .attr("x", 25)
        .attr("y", 12)
        .style("font-size", "12px")
        .style("fill", "#F8FBFD")
        .text(d => d.name);

      // Add percentage values for the selected year
      legend.append("text")
        .attr("x", "90%")
        .attr("y", 12)
        .attr("text-anchor", "end")
        .style("font-size", "12px")
        .style("fill", "#00B6F1")
        .text((d, i) => `${(d.values[yearIndex] * 100).toFixed(1)}%`);
    });
  }, [selectedCountry, yearIndex]);

  // Create tooltip
  useEffect(() => {
    // Import D3 on client side
    import('d3').then((d3) => {
      // Add tooltip div if it doesn't exist
      if (!d3.select("body").select(".tooltip").size()) {
        d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background-color", "#0A1B2B")
          .style("color", "#F8FBFD")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("pointer-events", "none")
          .style("font-size", "14px")
          .style("z-index", 10);
      }
    });
  }, []);

  // Get the HHI category for the selected country and year
  const getHHICategory = () => {
    if (!selectedCountry) return "";
    
    const countryData = mockData.countries.find(c => c.id === selectedCountry);
    if (!countryData) return "";
    
    const hhi = countryData.hhi[yearIndex]/10000; // Normalize here
    
    if (hhi < 0.15) return "Highly Diversified";
    if (hhi < 0.25) return "Moderately Diversified";
    return "Concentrated";
  };

  // Get the color for the HHI category
  const getHHICategoryColor = () => {
    if (!selectedCountry) return "";
    
    const countryData = mockData.countries.find(c => c.id === selectedCountry);
    if (!countryData) return "";
    
    const hhi = countryData.hhi[yearIndex]/10000; // Normalize here
    
    if (hhi < 0.15) return "text-green-400";
    if (hhi < 0.25) return "text-blue-400";
    return "text-red-400";
  };

  return (
    <div className="bg-night-navy/20 p-8 rounded-lg shadow-lg backdrop-blur-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold">Energy Supply Diversity Analysis</h3>
        <div className="flex items-center space-x-2 text-sm">
          <span className="text-cloud-white/70">Select country to view details</span>
        </div>
      </div>
      
      {/* Note about Supply Diversity vs Generation Mix */}
      <div className="mb-8 bg-sky-cyan/10 border-l-4 border-sky-cyan p-5 rounded-r-lg shadow-md">
        <div className="flex items-start">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-sky-cyan flex-shrink-0 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-cloud-white font-medium">Beyond Electricity: Total Energy Supply</p>
            <p className="text-cloud-white/80 text-sm mt-1">
              Unlike the Generation Mix section which focuses only on electricity, Supply Diversity captures 
              <span className="text-sky-cyan font-medium"> all energy sources across all sectors</span> including transport, 
              industry, buildings, and other end uses. This provides a more complete picture of a nation's 
              energy security profile and vulnerability to supply disruptions.
            </p>
          </div>
        </div>
      </div>
      
      {/* Country selector */}
      <div className="grid grid-cols-5 gap-3 mb-8">
        {mockData.countries.filter(country => 
          selectedCountries.includes(country.id)
        ).map(country => (
          <button
            key={country.id}
            className={`p-4 rounded-lg transition-all duration-300 ${
              selectedCountry === country.id 
                ? 'bg-sky-cyan text-white shadow-xl scale-105 ring-2 ring-sky-cyan/50' 
                : 'bg-night-navy/30 text-cloud-white hover:bg-night-navy/50 hover:shadow-md'
            }`}
            onClick={() => setSelectedCountry(country.id)}
          >
            <div className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: country.color }}
              ></div>
              <span className="font-medium">{country.name}</span>
            </div>
          </button>
        ))}
      </div>
      
      {/* Year selection instruction */}
      <div className="mb-8 text-center">
        <span className="inline-block px-5 py-2 bg-night-navy/40 text-cloud-white/80 text-sm rounded-full shadow-inner">
          Click on timeline points to change year • Currently showing data for <span className="text-sky-cyan font-medium">{mockData.years[yearIndex]}</span>
        </span>
      </div>
      
      {/* Main visualization area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left sidebar with legend and metrics */}
        <div className="lg:col-span-1">
          <div className="bg-night-navy/30 p-6 rounded-lg mb-8 shadow-lg">
            <h4 className="text-xl font-medium mb-6 border-b border-cloud-white/10 pb-3">Metrics for {selectedCountry && mockData.years[yearIndex]}</h4>
            
            {selectedCountry && (
              <>
                <div className="mb-6">
                  <span className="text-cloud-white/70 text-sm">HHI Index:</span>
                  <div className="flex items-baseline mt-2">
                    <div className="text-3xl font-bold mr-3">
                      {(mockData.countries.find(c => c.id === selectedCountry)?.hhi[yearIndex]/10000).toFixed(3)}
                    </div>
                    <div className={`text-sm font-medium ${getHHICategoryColor()}`}>
                      {getHHICategory()}
                    </div>
                  </div>
                </div>
                
                <div className="h-px bg-cloud-white/10 my-6"></div>
                
                <div>
                  <span className="text-cloud-white/70 text-sm flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    Energy Source Breakdown:
                  </span>
                  <div ref={legendRef} className="mt-4"></div>
                </div>
                
                <div className="h-px bg-cloud-white/10 my-6"></div>
                
                <div className="text-sm text-cloud-white/80 bg-night-navy/20 p-4 rounded-lg">
                  <p>The Herfindahl-Hirschman Index (HHI) measures market concentration. Lower values indicate more diversified energy supply, improving resilience against disruptions.</p>
                  <p className="mt-2 text-xs text-cloud-white/60">HHI values range from 0 (perfectly diversified) to 1 (complete monopoly).</p>
                  
                  {/* Add source information here */}
                  <div className="mt-3 pt-3 border-t border-cloud-white/10">
                    <div className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-sky-cyan flex-shrink-0 mr-1.5 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <p className="text-xs text-cloud-white/60">
                        Source: IEA World Energy Balance data. HHI calculated by squaring each energy source's market share and summing the results.
                      </p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Main charts area */}
        <div className="lg:col-span-2 space-y-8">
          {/* HHI Line Chart */}
          <div className="bg-night-navy/30 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl">
            <div ref={chartRef} className="w-full h-[240px]"></div>
          </div>
          
          {/* Energy Mix Area Chart */}
          <div className="bg-night-navy/30 p-6 rounded-lg shadow-lg transform transition-all duration-500 hover:shadow-xl">
            <div ref={areaChartRef} className="w-full h-[240px]"></div>
          </div>
          
          {/* Analysis text */}
          {selectedCountry && (
            <div className="bg-night-navy/30 p-6 rounded-lg shadow-lg">
              <h4 className="font-medium text-sky-cyan mb-3 text-lg flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Key Insights:
              </h4>
              
              <p className="text-cloud-white/90 leading-relaxed">
                {selectedCountry === "USA" && 
                  "The United States has maintained a moderately diversified energy portfolio, with a notable shift from coal toward natural gas and renewables. This transition has improved supply diversity while maintaining energy independence."
                }
                {selectedCountry === "DEU" && 
                  "Germany demonstrates the most dramatic energy transition, phasing out nuclear completely while rapidly expanding renewables. Despite this shift, Germany has maintained strong supply diversity metrics through strategic source management."
                }
                {selectedCountry === "CHN" && 
                  "China's energy mix remains concentrated with heavy coal dependence, though recent years show a gradual diversification trend. The high HHI reflects vulnerability to supply disruptions despite improved diversity metrics."
                }
                {selectedCountry === "IND" && 
                  "India faces dual challenges of concentrated supply (high HHI) and import dependency. Coal dominance is slowly giving way to more balanced sourcing, though the transition lags behind more diversified economies."
                }
                {selectedCountry === "BRA" && 
                  "Brazil demonstrates a unique energy profile with high renewable penetration and a strong balance between hydropower, biofuels, and petroleum products. This natural resource advantage contributes to its moderate HHI values."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default function EnergySecurityQuadrant() {
  const [ref, isInView] = useInView({ threshold: 0.3 });
  const chartRef = useRef(null);
  const reduceMotion = useReducedMotion();
  const [selectedIndicator, setSelectedIndicator] = useState("Political Stability");
  const [selectedCountries, setSelectedCountries] = useState(["USA", "DEU", "CHN", "IND", "BRA"]);
  const [highlightedCountry, setHighlightedCountry] = useState(null);
  const [showDescription, setShowDescription] = useState(true);
  
  // Toggle country selection
  const toggleCountry = (countryId) => {
    if (selectedCountries.includes(countryId)) {
      // Don't allow deselecting if it's the last country
      if (selectedCountries.length > 1) {
        setSelectedCountries(selectedCountries.filter(id => id !== countryId));
      }
    } else {
      setSelectedCountries([...selectedCountries, countryId]);
    }
  };
  
  // Set up chart when component is in view
  useEffect(() => {
    if (!isInView || !chartRef.current || selectedIndicator === "Supply Diversity") return;
    
    // Import D3 on client side
    import('d3').then((d3) => {
      // Clear any existing SVG
      d3.select(chartRef.current).selectAll("*").remove();
      
      // Set up dimensions
      const margin = { top: 40, right: 120, bottom: 60, left: 60 };
      const width = chartRef.current.clientWidth - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;
      
      // Create SVG
      const svg = d3.select(chartRef.current)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);
      
      // Create scales
      const xScale = d3.scaleLinear()
        .domain([d3.min(mockData.years), d3.max(mockData.years)])
        .range([0, width]);
      
      const yScale = d3.scaleLinear()
        .domain([0, 100])
        .range([height, 0]);
      
      // Create axes
      const xAxis = d3.axisBottom(xScale)
        .tickFormat(d3.format("d")) // Format as integer
        .ticks(mockData.years.length);
      
      const yAxis = d3.axisLeft(yScale)
        .ticks(5);
      
      // Add X axis
      svg.append("g")
        .attr("class", "x-axis")
        .attr("transform", `translate(0,${height})`)
        .call(xAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#F8FBFD");
      
      // Add Y axis
      svg.append("g")
        .attr("class", "y-axis")
        .call(yAxis)
        .selectAll("text")
        .style("font-size", "12px")
        .style("fill", "#F8FBFD");
      
      // Add X axis label
      svg.append("text")
        .attr("class", "x-axis-label")
        .attr("text-anchor", "middle")
        .attr("x", width / 2)
        .attr("y", height + margin.bottom - 10)
        .style("fill", "#F8FBFD")
        .style("font-size", "14px")
        .text("Year");
      
      // Add Y axis label
      svg.append("text")
        .attr("class", "y-axis-label")
        .attr("text-anchor", "middle")
        .attr("transform", `translate(${-margin.left + 20},${height / 2}) rotate(-90)`)
        .style("fill", "#F8FBFD")
        .style("font-size", "14px")
        .text("Index Score (0-100)");
      
      // Add grid lines
      svg.append("g")
        .attr("class", "grid")
        .selectAll("line")
        .data(yScale.ticks(5))
        .enter()
        .append("line")
        .attr("x1", 0)
        .attr("x2", width)
        .attr("y1", d => yScale(d))
        .attr("y2", d => yScale(d))
        .attr("stroke", "rgba(248, 251, 253, 0.1)")
        .attr("stroke-dasharray", "3,3");
      
      // Create line generator
      const line = d3.line()
        .x((d, i) => xScale(mockData.years[i]))
        .y(d => yScale(d))
        .curve(d3.curveMonotoneX);
      
      // Add lines for each selected country
      const filteredCountries = mockData.countries.filter(country => 
        selectedCountries.includes(country.id)
      );
      
      // Add lines with animation
      filteredCountries.forEach((country, index) => {
        const lineData = country.indicators[selectedIndicator];
        
        const path = svg.append("path")
          .datum(lineData)
          .attr("fill", "none")
          .attr("stroke", country.color)
          .attr("stroke-width", highlightedCountry === country.id ? 4 : 2)
          .attr("d", line)
          .style("opacity", highlightedCountry && highlightedCountry !== country.id ? 0.3 : 1);
        
        // Animate path if needed
        if (!reduceMotion) {
          const pathLength = path.node().getTotalLength();
          
          path.attr("stroke-dasharray", pathLength)
            .attr("stroke-dashoffset", pathLength)
            .transition()
            .duration(1500)
            .delay(index * 200)
            .ease(d3.easeLinear)
            .attr("stroke-dashoffset", 0);
        }
        
        // Add dots for each data point
        svg.selectAll(`.dot-${country.id}`)
          .data(lineData)
          .enter()
          .append("circle")
          .attr("class", `dot-${country.id}`)
          .attr("cx", (d, i) => xScale(mockData.years[i]))
          .attr("cy", d => yScale(d))
          .attr("r", 4)
          .attr("fill", country.color)
          .style("opacity", highlightedCountry && highlightedCountry !== country.id ? 0.3 : 1)
          .on("mouseover", (event, d) => {
            const i = lineData.indexOf(d);
            const year = mockData.years[i];
            
            // Show tooltip
            d3.select(".tooltip")
              .style("opacity", 1)
              .style("left", `${event.pageX + 10}px`)
              .style("top", `${event.pageY - 28}px`)
              .html(`
                <strong>${country.name}</strong><br/>
                ${selectedIndicator}: ${d}<br/>
                Year: ${year}
              `);
          })
          .on("mouseout", () => {
            // Hide tooltip
            d3.select(".tooltip")
              .style("opacity", 0);
          });
      });
      
      // Add Legend
      const legend = svg.append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${width + 20}, 0)`);
      
      filteredCountries.forEach((country, i) => {
        const legendItem = legend.append("g")
          .attr("transform", `translate(0, ${i * 25})`)
          .style("cursor", "pointer")
          .on("click", () => toggleCountry(country.id))
          .on("mouseover", () => setHighlightedCountry(country.id))
          .on("mouseout", () => setHighlightedCountry(null));
        
        legendItem.append("rect")
          .attr("width", 15)
          .attr("height", 15)
          .attr("fill", country.color);
        
        legendItem.append("text")
          .attr("x", 20)
          .attr("y", 12)
          .style("fill", "#F8FBFD")
          .text(country.name);
      });
      
      // Add tooltip div if it doesn't exist
      if (!d3.select("body").select(".tooltip").size()) {
        d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0)
          .style("position", "absolute")
          .style("background-color", "#0A1B2B")
          .style("color", "#F8FBFD")
          .style("padding", "8px")
          .style("border-radius", "4px")
          .style("pointer-events", "none")
          .style("font-size", "14px")
          .style("z-index", 10);
      }
      
      // Add chart title
      svg.append("text")
        .attr("class", "chart-title")
        .attr("x", width / 2)
        .attr("y", -15)
        .attr("text-anchor", "middle")
        .style("font-size", "18px")
        .style("font-weight", "bold")
        .style("fill", "#F8FBFD")
        .text(`${selectedIndicator} Index (2015-2023)`);
      
      // Add source attribution
      svg.append("text")
        .attr("x", width)
        .attr("y", height + margin.bottom - 5)
        .attr("text-anchor", "end")
        .style("font-size", "9px")
        .style("fill", "#F8FBFD80")
        .text("Source: World Governance Indicators (World Bank)");
    });
  }, [isInView, reduceMotion, selectedIndicator, selectedCountries, highlightedCountry]);

  return (
    <section ref={ref} className="pt-10 pb-20 bg-night-navy text-cloud-white" id="energy-security">
      <div className="container mx-auto px-6">
        {/* Enhanced section header with decorative elements */}
        <div className="max-w-4xl mx-auto mb-16 relative">
          <div className="absolute left-0 top-12 w-1/4 h-px bg-gradient-to-r from-transparent to-sky-cyan"></div>
          <div className="absolute right-0 top-12 w-1/4 h-px bg-gradient-to-l from-transparent to-sky-cyan"></div>
          
          
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8">
            Beyond Energy Mix: <span className="text-sky-cyan">Geopolitical Resilience</span>
          </h2>
          
          <p className="text-xl text-center text-cloud-white/80 max-w-3xl mx-auto">
            Tracking how political factors and global dynamics shape a nation's energy security over time
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
          {/* Left sidebar with indicator selection */}
          <div className="lg:col-span-1">
            <div className="bg-night-navy/30 p-6 rounded-lg h-full shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-8">Risk Indicators</h3>
              
              <div className="space-y-5">
                {["Political Stability", "Regulatory Quality", "Supply Diversity"].map(indicator => (
                  <button
                    key={indicator}
                    className={`w-full text-left p-4 rounded-lg transition-all duration-300 transform ${
                      selectedIndicator === indicator
                        ? 'bg-sky-cyan text-white shadow-md scale-105'
                        : 'bg-night-navy/20 text-cloud-white hover:bg-night-navy/40'
                    }`}
                    onClick={() => {
                      setSelectedIndicator(indicator);
                      setShowDescription(true);
                    }}
                  >
                    <span className="block font-medium">{indicator}</span>
                  </button>
                ))}
              </div>
              
              {/* Selected indicator description */}
              {showDescription && (
                <div className="mt-8 p-5 bg-night-navy/20 rounded-lg text-cloud-white/80 border-l-2 border-sky-cyan/50">
                  <h4 className="font-medium text-sky-cyan mb-3">
                    {selectedIndicator}
                  </h4>
                  <p>
                    {indicatorDescriptions[selectedIndicator]}
                  </p>
                </div>
              )}
              
              {/* Source information box */}
              <div className="mt-5 bg-night-navy/20 rounded-lg border border-cloud-white/10 p-4">
                <div className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-cyan flex-shrink-0 mr-2 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h5 className="text-sm font-medium text-cloud-white/90 mb-1">Data Source:</h5>
                    <p className="text-xs text-cloud-white/70 leading-relaxed">
                      {indicatorSources[selectedIndicator]}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main chart area */}
          <div className="lg:col-span-3">
            {selectedIndicator === "Supply Diversity" ? (
              <EnergySupplyDiversityChart 
                selectedCountries={selectedCountries}
                highlightedCountry={highlightedCountry}
                toggleCountry={toggleCountry}
              />
            ) : (
              <div className="bg-night-navy/20 p-8 rounded-lg shadow-lg backdrop-blur-sm">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-semibold">{selectedIndicator} Trends</h3>
                  <div className="flex items-center space-x-2 text-sm bg-night-navy/30 p-2 rounded-full">
                    <span className="text-cloud-white/70">Click country name to toggle | </span>
                    <span className="text-cloud-white/70">Hover for details</span>
                  </div>
                </div>
                
                {/* Chart container */}
                <div ref={chartRef} className="w-full h-[400px]"></div>
                
                {/* Interpretation text */}
                <div className="mt-8 bg-night-navy/30 p-6 rounded-lg shadow-md">
                  <h4 className="font-medium text-sky-cyan mb-3 text-lg flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Key Insights:
                  </h4>
                  
                  {selectedIndicator === "Political Stability" && (
                    <p className="text-cloud-white/90 leading-relaxed">
                      Political stability is a key dimension of energy security, affecting everything from infrastructure investment to regulatory continuity. Note the sharp decline in Russia's stability index after 2021, contrasted with the gradual stabilization of India's governance framework.
                    </p>
                  )}
                  
                  {selectedIndicator === "Regulatory Quality" && (
                    <p className="text-cloud-white/90 leading-relaxed">
                      High-quality regulatory frameworks enable efficient market function and attract investment. The gap between advanced economies like Germany and the United States versus emerging markets illustrates the institutional advantages that support energy transition readiness.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
        
        {/* Enhanced transition to next section */}
        <div className="max-w-4xl mx-auto mt-20 text-center">
          <h3 className="text-2xl font-semibold mb-6">Beyond Technical Solutions</h3>
          <p className="text-lg text-cloud-white/80 mb-10 max-w-3xl mx-auto">
              Energy security isn't merely a technical challenge—it's deeply intertwined with governance, international relations, and market design. Countries must balance immediate energy needs against long-term resilience, with policy frameworks often determining success as much as resource endowments.
          </p>
          
          <a 
              href="/services#geopolitical"
              className="group inline-flex items-center bg-sky-cyan px-8 py-4 rounded-full hover:bg-sky-cyan/90 transition-colors shadow-lg hover:shadow-xl"
          >
              <span className="text-white text-lg font-medium">Explore Our Services</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-3 text-white group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
          </a>
      </div>
      </div>
    </section>
  );
}