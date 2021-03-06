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
const sumstat = sumStat(worldHospRates);
const xScale = d3.scaleLinear().domain([0, 0.15]).range([padding.left, width]);

const colorScale = d3
  .scaleSequential()
  .interpolator(d3.interpolateInferno)
  .domain([0.01, 0.15]);

const boxHeight = 90;
class Boxplot extends Component {
  componentDidUpdate(prevProps) {
    const currentStep = this.props.currentStep;
    if (prevProps.currentStep !== currentStep) {
      if (currentStep === 1) {
        this.setupChart();
      } else if (currentStep === 2) {
        this.drawCirles();
      } else if (currentStep === 3) {
        this.drawMedian();
      } else if (currentStep === 4) {
        this.drawMean();
      } else if (currentStep === 5) {
        this.highlightOuliers();
      } else if (currentStep === 6) {
        this.drawBox();
      } else if (currentStep === 7) {
        this.drawWhisker();
        this.highlightOuliers();
      }
    }
  }
  setupChart = () => {
    const svg = d3.select("#boxplot");
    svg
      .append("g")
      .attr(
        "transform",
        `translate(${padding.left},${height - margin.bottom / 2})`
      )
      .call(d3.axisBottom(xScale).ticks(10));
  };

  drawWhisker = () => {
    const svg = d3.select("#boxplot");
    // Show the main horizontal line
    svg
      .append("line")
      .attr("y1", height / 2)
      .attr("y2", height / 2)
      .attr("x1", (d) => xScale(sumstat.min))
      .attr("x2", (d) => xScale(sumstat.max))
      .transition()
      .duration(500)
      .attr("stroke", "black")
      .style("width", 40);
  };

  drawMedian = () => {
    const svg = d3.select("#boxplot");
    // Show the median
    svg
      .append("line")
      .attr("y1", height / 2)
      .attr("y2", height / 2 - boxHeight / 2)
      .attr("x1", (d) => xScale(sumstat.median))
      .attr("x2", (d) => xScale(sumstat.median))
      .attr("stroke", "red")
      .transition()
      .duration(500)
      .attr("stroke-width", 3);
  };

  drawMean = () => {
    const svg = d3.select("#boxplot");
    // Show the mean
    svg
      .append("line")
      .attr("y1", height / 2)
      .attr("y2", height / 2 - boxHeight / 2)
      .attr("x1", (d) => xScale(sumstat.mean))
      .attr("x2", (d) => xScale(sumstat.mean))
      .attr("stroke", "orange")
      .transition()
      .duration(500)
      .attr("stroke-width", 3)
      .attr("stroke-dasharray", 4);
  };

  drawBox = () => {
    const svg = d3.select("#boxplot");

    svg
      .append("rect")
      .attr("x", xScale(sumstat.q1))
      .attr("width", (d) => xScale(sumstat.q3) - xScale(sumstat.q1))
      .attr("y", height / 2 - boxHeight / 2)
      .attr("height", boxHeight)
      .attr("stroke", "black")
      .style("fill", "#69b3a2")
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", 0.3);
  };

  highlightOuliers = () => {
    const svg = d3.select("#boxplot");
    svg
      .selectAll(".outlier")
      .transition()
      .duration(250)
      .attr("r", 20)
      .transition()
      .duration(250)
      .attr("r", 10);
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
      .attr("class", (d) => (+d.rates > 0.08 ? "outlier" : "non-outlier"))
      .attr("cx", 0)
      .attr("cy", (d) => {
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
