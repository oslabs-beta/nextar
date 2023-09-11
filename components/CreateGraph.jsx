"use client"

import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";

export default function CreateGraph(props) {

  const [data] = useState(JSON.parse(localStorage.getItem('FCParray')));
  // const [data] = useState([25, 50, 35, 15, 99, 10]);
  const svgRef = useRef();


  // const createGraph = async () => {
  //   // data = JSON.parse(localStorage.getItem('FCParray')) || [];

  //   // set the dimensions and margins of the graph
  //   var margin = { top: 20, right: 20, bottom: 50, left: 70 },
  //       width = 960 - margin.left - margin.right,
  //       height = 500 - margin.top - margin.bottom;
  //   // append the svg object to the body of the page
  //   var svg = d3.select("body").append("svg")
  //       .attr("width", width + margin.left + margin.right)
  //       .attr("height", height + margin.top + margin.bottom)
  //       .append("g")
  //       .attr("transform", `translate(${margin.left},     ${margin.top})`);


  // }


  useEffect(() => {
    // createGraph();
    // set up svg
    const w = 400;
    const h = 50;
    const svg = d3.select(svgRef.current)
      .attr('width', w)
      .attr('height', h)
      .style('background', '#d3d3d3')
      .style('margin-top', '50')
      .style('overflow', 'visible');


    // set up scaling
    const xScale = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([0,w]);
    const yScale = d3.scaleLinear()
      .domain([0, h])
      .range([h,0]);
    const generateScaledLine = d3.line()
      .x((d, i) => xScale(i))
      .y(yScale)
      .curve(d3.curveCardinal);

    // setting up the axis
    const xAxis = d3.axisBottom(xScale)
      .ticks(data.length)
      .tickFormat(i => i + 1);
    const yAxis = d3.axisLeft(xScale)
      .ticks(10);
    svg.append('g')
      .call(xAxis)
      .attr('transform', `translate(0,${h})`);
    svg.append('g')
      .call(yAxis);


    // setting up the data
    svg.selectAll('.line')
      .data([data])
      .join('path')
      .attr('d', d => generateScaledLine(d))
      .attr('fill', 'none')
      .attr('stroke', 'blue')

  }, [data]);


  return (
     <>
     <div className="Graph">
      <svg ref={svgRef}></svg>
     </div>
     </>
  );
}