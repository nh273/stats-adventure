import React, { Component } from "react";
import * as d3 from "d3";
import { worldHospRates } from "../assets/data/data";

// set the dimensions and margins of the graph
var margin = { top: 50, right: 100, bottom: 50, left: 100 },
  width = 800 - margin.left - margin.right,
  height = 300 - margin.top - margin.bottom,
  padding = { left: 10 };

const sumStat = (data) => {
  const q1 = d3.quantile(data.map((d) => d.rates).sort(d3.ascending), 0.25);
  const median = d3.quantile(data.map((d) => d.rates).sort(d3.ascending), 0.5);
  const q3 = d3.quantile(data.map((d) => d.rates).sort(d3.ascending), 0.75);
  const interQuantileRange = q3 - q1;
  const min = q1 - 1.5 * interQuantileRange;
  const max = q3 + 1.5 * interQuantileRange;
  const mean = d3.mean(data.map((d) => d.rates));
  return {
    q1: q1,
    median: median,
    q3: q3,
    interQuantileRange: interQuantileRange,
    min: min,
    max: max,
    mean: mean,
  };
};

var xScale = d3.scaleLinear().domain([0, 0.15]).range([padding.left, width]);

const colorScale = d3
  .scaleSequential()
  .interpolator(d3.interpolateInferno)
  .domain([0.01, 0.15]);
class Boxplot extends Component {
  componentDidMount() {
    this.setupChart();
    this.drawCirles();
  }
  componentDidUpdate() {
    this.setupChart();
  }
  setupChart = () => {
    const svg = d3.select("#boxplot");
    const sumstat = sumStat(worldHospRates);
    console.log(sumstat);
    svg
      .append("g")
      .attr(
        "transform",
        `translate(${padding.left},${height - margin.bottom / 2})`
      )
      .call(d3.axisBottom(xScale).ticks(10));

    // Show the main horizontal line
    svg
      .append("line")
      .attr("x1", (d) => xScale(sumstat.min))
      .attr("x2", (d) => xScale(sumstat.max))
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("stroke", "black")
      .style("width", 40);

    // rectangle for the main box
    const boxHeight = 90;
    svg
      .append("rect")
      .attr("x", xScale(sumstat.q1))
      .attr("width", (d) => xScale(sumstat.q3) - xScale(sumstat.q1))
      .attr("y", height / 2 - boxHeight / 2)
      .attr("height", boxHeight)
      .attr("stroke", "black")
      .style("fill", "#69b3a2")
      .style("opacity", 0.3);

    // Show the median
    svg
      .append("line")
      .attr("y1", height / 2)
      .attr("y2", height / 2 - boxHeight / 2)
      .attr("x1", (d) => xScale(sumstat.median))
      .attr("x2", (d) => xScale(sumstat.median))
      .attr("stroke", "red")
      .attr("stroke-width", 3);

    // Show the mean
    svg
      .append("line")
      .attr("y1", height / 2)
      .attr("y2", height / 2 - boxHeight / 2)
      .attr("x1", (d) => xScale(sumstat.mean))
      .attr("x2", (d) => xScale(sumstat.mean))
      .attr("stroke", "orange")
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", 4);
  };

  drawCirles = () => {
    // create a tooltip
    const tooltip = d3
      .select(".box-plot-area")
      .append("div")
      .style("opacity", 0)
      .attr("id", "tooltip")
      .style("font-size", "16px");

    const mouseover = (e) => {
      const d = e.target.__data__;
      tooltip.transition().duration(200).style("opacity", 1);
      tooltip
        .html(`<span style='color:grey'>${d.name}: ${d.rates}</span>`)
        .style("left", xScale(d.rates) + 30 + "px")
        .style("top", height / 2 - 30 + "px");
    };

    const mouseleave = (d) => {
      tooltip.transition().duration(200).style("opacity", 0);
    };

    // add circles
    const jitterWidth = 20;
    const svg = d3.select("#boxplot");
    const dots = svg
      .selectAll("circle")
      .data(worldHospRates)
      .enter()
      .append("circle")
      .attr("cx", 0)
      .attr("cy", function (d) {
        return height / 2 - jitterWidth / 2 + Math.random() * jitterWidth;
      })
      .attr("r", 10)
      .style("fill", function (d) {
        return colorScale(+d.rates);
      })
      .attr("stroke", "white")
      .on("mouseover", mouseover)
      .on("mouseleave", mouseleave);

    dots
      .transition()
      .attr("cx", function (d) {
        return xScale(d.rates);
      })
      .duration(500);
  };

  render() {
    return <svg id="boxplot" width={width} height={height}></svg>;
  }
}

export default Boxplot;
