import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { pachinko } from "./d3Helpers";

const svgWidth = 600;
const height = 200;
const margin = { top: 0, right: 30, bottom: 20, left: 30 };

const xScale = d3
  .scaleLinear([-5, 5], [margin.left, svgWidth - margin.right])
  .nice();

const styles = (theme) => ({
  control: {
    height: 80,
    width: 500,
    paddingTop: 25,
    paddingLeft: 50,
    paddingRight: 5,
    paddingBottom: 25,
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
    this.setupChart();
  }

  componentDidUpdate(prevProps) {
    const dataStep = this.props.dataStep;
    const stepProgress = this.props.stepProgress;
    if (
      prevProps.dataStep !== dataStep ||
      prevProps.stepProgress !== stepProgress
    ) {
      if (dataStep === 1) {
        this.createChart();
      } else if (dataStep === 1.1) {
        this.highlightCenter();
      } else if (dataStep === 1.2) {
        this.unhighlightCenter();
        this.highlightEdge();
      } else if (dataStep === 2) {
        this.unhighlightEdge();
        this.setState({ mean: stepProgress * -3 });
        this.createChart();
      } else if (dataStep === 3) {
        this.setState({ mean: stepProgress * 4.75 - 3 });
        this.createChart();
      }
    }
  }

  highlightEdge = () => {
    const svg = d3.select("#normal");
    svg.selectAll(".circle-edge").attr("fill", "red");
  };

  highlightCenter = () => {
    const svg = d3.select("#normal");
    svg.selectAll(".circle-center").attr("fill", "red");
  };

  unhighlightEdge = () => {
    const svg = d3.select("#normal");
    svg.selectAll(".circle-edge").attr("fill", "black");
  };

  unhighlightCenter = () => {
    const svg = d3.select("#normal");
    svg.selectAll(".circle-center").attr("fill", "black");
  };

  setupChart = () => {
    const svg = d3.select("#normal");
    svg.selectAll("g").remove();
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  };
  createChart = () => {
    const svg = d3.select("#normal");
    pachinko(
      d3.randomNormal(this.state.mean, this.state.sd),
      svg,
      xScale,
      height,
      margin
    );
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

        <div className={classes.control}>
          <Typography variant="body2" gutterBottom>
            Mean
          </Typography>
          <Slider
            value={this.state.mean}
            onChange={this.handleMeanChange}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            max={5}
            min={-5}
            step={0.3}
          />
        </div>

        <div className={classes.control}>
          <Typography variant="body2" gutterBottom>
            Standard Deviation
          </Typography>
          <Slider
            value={this.state.sd}
            onChange={this.handleSdChange}
            aria-labelledby="continuous-slider"
            valueLabelDisplay="auto"
            min={0}
            max={5}
            step={0.3}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Normal);
