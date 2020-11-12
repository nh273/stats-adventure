import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import * as d3 from "d3";

const svgWidth = 600;
const dodger = (radius) => {
  const radius2 = radius ** 2;
  const bisect = d3.bisector((d) => d.x);
  const circles = [];
  return (x) => {
    const l = bisect.left(circles, x - radius);
    const r = bisect.right(circles, x + radius, l);
    let y = 0;
    for (let i = l; i < r; ++i) {
      const { x: xi, y: yi } = circles[i];
      const x2 = (xi - x) ** 2;
      const y2 = (yi - y) ** 2;
      if (radius2 > x2 + y2) {
        y = yi + Math.sqrt(radius2 - x2) + 1e-6;
        i = l - 1;
        continue;
      }
    }
    circles.splice(bisect.left(circles, x, l, r), 0, { x, y });
    return y;
  };
};

function pachinko(random, extent, height = 200) {
  const n = 1000;
  const width = svgWidth;
  const radius = 2;
  const dodge = dodger(radius * 2 + 1);
  const margin = { top: 0, right: 30, bottom: 20, left: 30 };
  const values = Float64Array.from({ length: n }, random);
  if (extent === undefined) extent = d3.extent(values);
  const x = d3.scaleLinear(extent, [margin.left, width - margin.right]).nice();

  const svg = d3.select("#normal");

  svg.selectAll("circle").remove();
  svg.selectAll("g").remove();

  svg
    .append("g")
    .attr("transform", `translate(0,${height - margin.bottom})`)
    .call(d3.axisBottom(x));

  for (let i = 0; i < n; ++i) {
    const cx = x(values[i]);
    const cy = height - margin.bottom - dodge(cx) - radius - 1;
    if (cy < margin.top) break;
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", -400)
      .attr("r", radius)
      .attr("cy", cy);
  }

  return svg.node();
}

class Normal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mean: 0,
      sd: 1,
    };
  }
  componentDidMount() {
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }
  createBarChart = () => {
    pachinko(d3.randomNormal(this.state.mean, this.state.sd));
  };
  handleMeanChange = (event, newValue) => {
    this.setState({ mean: newValue });
  };

  handleSdChange = (event, newValue) => {
    this.setState({ sd: newValue });
  };

  render() {
    return (
      <div className="normal-illustration">
        <svg id="normal" width={svgWidth} height={200}></svg>
        <Typography id="continuous-slider" gutterBottom>
          Mean
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs>
            <Slider
              value={this.state.mean}
              onChange={this.handleMeanChange}
              aria-labelledby="continuous-slider"
            />
          </Grid>
        </Grid>
        <Typography id="disabled-slider" gutterBottom>
          Standard Deviation
        </Typography>
        <Slider
          value={this.state.sd}
          onChange={this.handleSdChange}
          aria-labelledby="continuous-slider"
        />
      </div>
    );
  }
}

export default Normal;
