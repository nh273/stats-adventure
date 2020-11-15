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
  .scaleLinear([-5, 5], [margin.left, svgWidth - margin.right])
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
    this.createChart();
  }
  componentDidUpdate() {
    this.createChart();
  }

  setupChart = () => {
    const svg = d3.select("#normal");
    svg.selectAll("g").remove();
    svg
      .append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(xScale));
  };
  createChart = () => {
    pachinko(
      d3.randomNormal(this.state.mean, this.state.sd),
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
