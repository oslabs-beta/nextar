'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

export default function DonutGraph({ array }) {
  //   const data = props.array;
  console.log('donut!', array);
  const good = array.filter((el) => el <= 150).length;
  const needsImprovement = array.filter((el) => el <= 300).length - good;
  const poor = array.length - needsImprovement - good;

  const data = [
    { name: 'Good', value: good },
    { name: ' ', value: needsImprovement },
    { name: '  ', value: poor },
  ];

  //   console.log(props.array);
  const svgRef = useRef();

  useEffect(() => {
    // set up svg
    const width = Math.min(500);
    const height = Math.min(width, 500);
    const radius = Math.min(width, height) / 2;

    const arc = d3
      .arc()
      .innerRadius(radius * 0.67)
      .outerRadius(radius - 1);

    const pie = d3
      .pie()
      .padAngle(1 / radius)
      .sort(null)
      .value((d) => d.value);

    const color = d3
      .scaleOrdinal()
      .domain(data.map((d) => d.name))
      .range(
        d3
          .quantize((t) => d3.interpolateSpectral(t * 0.8 + 0.1), data.length)
          .reverse()
      );

    // const margin = { top: 40, right: 80, bottom: 60, left: 50 },
    // width = 960 - margin.left - margin.right,
    // height = 280 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height)
      .attr('viewBox', [-width / 2, -height / 2, width, height])
      .attr('style', 'max-width: 100%; height: auto;');

    // setting up the data
    svg
      .append('g')
      .selectAll()
      .data(pie(data))
      .join('path')
      .attr('fill', (d) => color(d.data.name))
      .attr('d', arc)
      .append('title')
      .text((d) => `${d.data.name}: ${d.data.value.toLocaleString()}`);

    svg
      .append('g')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('text-anchor', 'middle')
      .selectAll()
      .data(pie(data))
      .join('text')
      .attr('transform', (d) => `translate(${arc.centroid(d)})`)
      .call((text) =>
        text
          .append('tspan')
          .attr('y', '-0.4em')
          .attr('font-weight', 'bold')
          .text((d) => d.data.name)
      )
      .call((text) =>
        text
          .filter((d) => d.endAngle - d.startAngle > 0.25)
          .append('tspan')
          .attr('x', 0)
          .attr('y', '0.7em')
          .attr('fill-opacity', 0.7)
          .text((d) => d.data.value.toLocaleString('en-US'))
      );
  }, [data]);

  return (
    <>
      <div className='Donut'>
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}
