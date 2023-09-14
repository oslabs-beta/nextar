'use client';

import React, { useEffect, useState, useRef } from 'react';
import * as d3 from 'd3';

export default function NewGraph(props) {
  const data = props.array.map((el, i) => ({
    x: i,
    y: el,
  }));

  const good = props.array.map((el, i) => ({
    x: i,
    y: 1,
  }));

  const needsImprov = props.array.map((el, i) => ({
    x: i,
    y: props.ni,
  }));

  const poor = props.array.map((el, i) => ({
    x: i,
    y: props.poor,
  }));

  const svgRef = useRef();

  useEffect(() => {
    const margin = { top: 10, right: 10, bottom: 20, left: 40 },
      width = 400 - margin.left - margin.right,
      height = 200 - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      // .style('background', 'white')
      // .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')
      .style('overflow', 'visible');

    // deleting old svg
    svg.selectAll('svg > *').remove();

    const x = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.x;
        }),
      ])
      .range([0, width]);

    const y = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, function (d) {
          return d.y + props.ni / 3;
        }),
      ])
      .range([height, 0]);

    // var xAxis = d3.svg.axis().scale(x).orient('bottom');

    // var yAxis = d3.svg.axis().scale(y).orient('left');
    svg.selectAll('svg').remove();

    const xAxis = d3
      .axisBottom(x)
      // .ticks(data.length)
      .tickFormat((i) => i);
    const yAxis = d3.axisLeft(y).ticks(10);
    // svg.append('g').call(xAxis).attr('transform', `translate(0,${height})`);
    // svg.append('g').call(yAxis);

    const area = d3
      .area()
      .x(function (d) {
        return x(d.x);
      })
      .y0(function (d) {
        return y(0);
      })
      .y1(function (d) {
        return y(Math.min(Math.max(...props.array) + props.ni / 3, props.ni));
      });

    const areaNI = d3
      .area()
      .x(function (d) {
        return x(d.x);
      })
      .y0(function (d) {
        return y(Math.min(Math.max(...props.array) + props.ni / 3, props.ni));
      })
      .y1(function (d) {
        return y(Math.min(Math.max(...props.array) + props.ni / 3, props.poor));
      });

    const areaPoor = d3
      .area()
      .x(function (d) {
        return x(d.x);
      })
      .y0(function (d) {
        return y(Math.min(Math.max(...props.array) + props.ni / 3, props.poor));
      })
      .y1(function (d) {
        return y(Math.max(...props.array) + props.ni / 3);
      });

    const generateScaledLine = d3
      .line()
      .x((d, i) => x(i))
      .y(y)
      .curve(d3.curveLinear);

    // deleting old svg
    // svg.selectAll('svg').remove();

    svg
      .append('path')
      .datum(good)
      .attr('class', 'area')
      .attr('d', area)
      .attr('fill', '#57e964')
      .attr('opacity', '.4 ');

    if (Math.max(...props.array) + props.ni / 3 > props.ni) {
      svg
        .append('path')
        .datum(needsImprov)
        .attr('class', 'area')
        .attr('d', areaNI)
        .attr('fill', 'yellow')
        .attr('opacity', '.4');

      svg
        .append('path')
        .data([props.array.map((el) => props.ni)])
        .join('path')
        .attr('d', (d) => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', '#F6BE00')
        .style('stroke-width', 2);
    }

    if (Math.max(...props.array) + props.ni / 3 > props.poor) {
      svg
        .append('path')
        .datum(poor)
        .attr('class', 'area')
        .attr('d', areaPoor)
        .attr('fill', 'red')
        .attr('opacity', '.2');

      svg
        .append('path')
        .data([props.array.map((el) => props.poor)])
        .join('path')
        .attr('d', (d) => generateScaledLine(d))
        .attr('fill', 'none')
        .attr('stroke', 'red')
        .style('stroke-width', 2);
    }

    svg
      .append('g')
      .attr('class', 'x axis')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g').attr('class', 'y axis').call(yAxis);

    svg
      .append('path')
      .data([props.array.map((el) => 0)])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'green')
      .style('stroke-width', 4);

    svg
      .append('path')
      .data([props.array])
      .join('path')
      .attr('d', (d) => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'gray')
      .style('stroke-width', 3);

    // set up scaling
  }, [data]);

  return (
    <>
      <div
        className='Graph'
        style={{
          backgroundColor: 'white',
          boxShadow: '-10px 10px lightblue',
          border: 'solid 2px black',
          borderRadius: '10px',
          padding: '10px',
        }}
      >
        <svg ref={svgRef}></svg>
      </div>
    </>
  );
}
