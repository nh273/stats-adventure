import React, { Component } from "react";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import * as d3 from "d3";
import { pachinko } from "./d3Helpers";

const svgWidth = 600;
const height = 200;
const margin = { top: 0, right: 30, bottom: 20, left: 30 };
const xAxisStart = 10;
const xAxisEnd = 30;

const xScale = d3
  .scaleLinear(
    [xAxisStart - 10, xAxisEnd + 10],
    [margin.left, svgWidth - margin.right]
  )
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

const initialMean = 15;
const initialSd = 3;
class Normal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mean: initialMean,
      sd: initialSd,
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
      if (prevProps.dataStep !== dataStep && dataStep === 1) {
        this.createChart();
      } else if (dataStep === 1.1) {
        this.highlightCenter();
      } else if (dataStep === 1.2) {
        this.unhighlightCenter();
        this.highlightEdge();
      } else if (dataStep === 2) {
        this.unhighlightEdge();
        // Starts at 15 and ends up at 10, "shorter stay" case
        this.setState({ mean: stepProgress * -5 + initialMean });
        this.createChart();
      } else if (dataStep === 3) {
        // Starts at 10 and ends up at 24, "longer stay" case
        this.setState({ mean: stepProgress * 14 + 10 });
        this.createChart();
      } else if (dataStep === 5) {
        // high variable case, ends at 6
        this.setState({ sd: stepProgress * 3 + initialSd });
        this.createChart();
      } else if (dataStep === 6) {
        // high variable case, starts at 6 ends at 1
        this.setState({ sd: stepProgress * -5 + 6 });
        this.createChart();
      } else if (dataStep === 8) {
        // mean starts at 24 and ends at 17, sd starts at 1 and ends at 3.5
        this.setState({
          mean: stepProgress * -7 + 24,
          sd: stepProgress * 2.5 + initialSd,
        });
        this.createChart();
      }
    } else if (!this.props.controlled) {
      this.createChart();
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
      margin,
      (val) => {
        return val > initialMean - 1.5 * initialSd &&
          val < initialMean + 1.5 * initialSd
          ? "circle-center"
          : "circle-edge";
      }
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
            min={xAxisStart}
            max={xAxisEnd}
            step={1}
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
            max={10}
            step={0.5}
          />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Normal);
