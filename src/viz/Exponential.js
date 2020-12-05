import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { pachinko } from "./d3Helpers";

const svgWidth = 600;
const height = 200;
const margin = { top: 0, right: 30, bottom: 20, left: 30 };

const xScale = d3
  .scaleLinear([0, 5], [margin.left, svgWidth - margin.right])
  .nice();

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

class Exponential extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lambda: 0 + Number.EPSILON,
    };
  }
  componentDidMount() {
    this.setupChart();
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }

  setupChart = () => {
    const svg = d3.select("#exp");
    svg.selectAll("g").remove();
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  };
  createChart = () => {
    const svg = d3.select("#exp");
    pachinko(
      d3.randomExponential(this.state.lambda + Number.EPSILON),
      svg,
      xScale,
      height,
      margin,
      (val) => {
        return val > 11 && val < 19 ? "circle-center" : "circle-edge";
      }
    );
  };
  handleLambdaChange = (event, newValue) => {
    this.setState({ lambda: newValue });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="exp-illustration">
        <svg id="exp" width={svgWidth} height={200}></svg>
        <Card>
          <CardContent>
            <Typography id="continuous-slider" variant="body2" gutterBottom>
              Lambda
            </Typography>
            <div className={classes.control}>
              <Slider
                value={this.state.lambda}
                onChange={this.handleLambdaChange}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                max={5}
                min={0}
                step={0.1}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(Exponential);
