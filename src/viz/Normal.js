import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import * as d3 from "d3";

const svgWidth = 600;
const height = 200;
const margin = { top: 0, right: 30, bottom: 20, left: 30 };

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

const xScale = d3
  .scaleLinear([-5, 5], [margin.left, svgWidth - margin.right])
  .nice();

function pachinko(random) {
  const n = 1000;
  const radius = 2;
  const dodge = dodger(radius * 2 + 1);
  const values = Float64Array.from({ length: n }, random);

  const svg = d3.select("#normal");

  svg.selectAll("circle").remove();

  for (let i = 0; i < n; ++i) {
    const cx = xScale(values[i]);
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

const styles = (theme) => ({
  control: {
    height: 50,
    width: 300,
    paddingTop: 25,
    paddingLeft: 5,
    paddingRight: 5,
    justifyContent: "center",
  },
});

class Normal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mean: 0,
      sd: 1,
    };
  }
  componentDidMount() {
    this.setupBarChart();
    this.createBarChart();
  }
  componentDidUpdate() {
    this.createBarChart();
  }

  setupBarChart = () => {
    const svg = d3.select("#normal");
    svg.selectAll("g").remove();
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  };
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
    const { classes } = this.props;
    return (
      <div className="normal-illustration">
        <svg id="normal" width={svgWidth} height={200}></svg>
        <Card>
          <CardContent>
            <Typography id="continuous-slider" variant="body2" gutterBottom>
              Mean
            </Typography>
            <div className={classes.control}>
              <Slider
                value={this.state.mean}
                onChange={this.handleMeanChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                max={5}
                min={-5}
              />
            </div>
            <Typography id="disabled-slider" variant="body2" gutterBottom>
              Standard Deviation
            </Typography>
            <div className={classes.control}>
              <Slider
                value={this.state.sd}
                onChange={this.handleSdChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Normal);
