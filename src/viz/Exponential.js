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
      lambda: 1 + Number.EPSILON,
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
      if (prevProps.dataStep !== dataStep && dataStep === 21) {
        this.createChart();
      } else if (dataStep === 22) {
        this.highlightCenter();
      } else if (dataStep === 23) {
        this.unhighlightCenter();
        this.highlightEdge();
      } else if (dataStep === 25) {
        // Make sure to set stepsWithProgress in Lesson 2 accordingly!
        this.unhighlightEdge();
        // stop redrawing halfway through the progress to give time for graphic to "pause"
        if (stepProgress < 0.5) {
          // Starts at 1 and ends up at 0.5 * (-1.5) + 1 = 0.25, "infrequent" case
          this.setState({
            lambda: stepProgress * -1.5 + 1,
          });
          this.createChart();
        }
      } else if (dataStep === 26) {
        // Starts at 0.25 and ends up at 2, "frequent" case
        this.setState({ lambda: stepProgress * 1.75 + 0.25 });
        this.createChart();
      }
    } else if (!this.props.controlled) {
      this.createChart();
    }
  }

  highlightEdge = () => {
    const svg = d3.select("#exp");
    svg.selectAll(".circle-edge").attr("fill", "red");
  };

  highlightCenter = () => {
    const svg = d3.select("#exp");
    svg.selectAll(".circle-center").attr("fill", "red");
  };

  unhighlightEdge = () => {
    const svg = d3.select("#exp");
    svg.selectAll(".circle-edge").attr("fill", "black");
  };

  unhighlightCenter = () => {
    const svg = d3.select("#exp");
    svg.selectAll(".circle-center").attr("fill", "black");
  };

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
        if (val < 1) {
          return "circle-center";
        } else if (val > 2.5) {
          return "circle-edge";
        }
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
