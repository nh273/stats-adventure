import React, { Component } from "react";
import * as d3 from "d3";
import { pachinko } from "./d3Helpers";

const svgWidth = 600;
const height = 200;
const margin = { top: 0, right: 30, bottom: 20, left: 30 };
const xAxisStart = 0;
const xAxisEnd = 1;

const xScale = d3
  .scaleLinear([xAxisStart, xAxisEnd], [margin.left, svgWidth - margin.right])
  .nice();

const initialMean = 0.7;
const initialDiff = 0.03;
const sd = 0.05;
const intialN = 200;

class Sig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      diff: initialDiff,
      n: intialN,
    };
  }
  componentDidMount() {
    this.setupChart();
    this.createChart();
  }

  componentDidUpdate(prevProps) {
    const dataStep = this.props.dataStep;
    const stepProgress = this.props.stepProgress;
    if (
      prevProps.dataStep !== dataStep ||
      prevProps.stepProgress !== stepProgress
    ) {
      if (dataStep < 7) {
        this.unhighlightEdge();
      } else if (dataStep === 7) {
        this.highlightEdge();
      } else if (dataStep === 8) {
        // wants to end at about 0.13
        this.setState({
          diff: stepProgress * 0.1 + initialDiff,
          n: stepProgress * 800 + intialN,
        });
        this.createChart();
        this.highlightEdge();
      }
    }
  }

  highlightEdge = () => {
    const svg = d3.select("#sig");
    svg.selectAll(".circle-edge").attr("fill", "red");
  };

  unhighlightEdge = () => {
    const svg = d3.select("#sig");
    svg.selectAll(".circle-edge").attr("fill", "black");
  };

  setupChart = () => {
    const svg = d3.select("#sig");
    svg.selectAll("g").remove();
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  };

  createChart = () => {
    const svg = d3.select("#sig");

    pachinko(
      d3.randomNormal(initialMean, sd),
      svg,
      xScale,
      height,
      margin,
      (val) => {
        return val > initialMean - this.state.diff &&
          val < initialMean + this.state.diff
          ? "circle-center"
          : "circle-edge";
      },
      this.state.n
    );
  };

  render() {
    return (
      <div className="sig-illustration">
        <svg id="sig" width={svgWidth} height={200}></svg>
      </div>
    );
  }
}

export default Sig;
