'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

export default function CreateGraph(props) {
  const data = props.array;
  console.log(props.array);
  const svgRef = useRef();

  useEffect(() => {
    // set up svg
    const w = 300;
    const h = 200;

    // const margin = { top: 40, right: 80, bottom: 60, left: 50 },
    // width = 960 - margin.left - margin.right,
    // height = 280 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', 'white')
      // .style('margin-top', '50')
      .style('overflow', 'visible');

    // deleting old svg
    svg.selectAll('svg > *').remove();
    // set up scaling

    const max = d3.max(data);
    // const min = data.sort()[0]
    const xScale = d3
      .scaleLinear()
      .domain([0, data.length - 1])
      .range([0, w]);
    const yScale = d3.scaleLinear().domain([0, max]).range([h, 0]);
    const generateScaledLine = d3
      .line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveLinear);

    // setting up the axis
    const xAxis = d3
      .axisBottom(xScale)
      // .ticks(data.length)
      .tickFormat((i) => i);
    const yAxis = d3.axisLeft(yScale).ticks(10);
    svg.append('g').call(xAxis).attr('transform', `translate(0,${h})`);
    svg.append('g').call(yAxis);

    // setting up the data
    svg
      .append('path')
      .data([data])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .style('stroke-width', 4);
  }, [data]);

  return (
    <>
      <div className='Graph'>
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}
