import React, { Component } from "react";
import * as d3 from "d3";

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 50, left: 70 },
  width = 460 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

const sumStat = (data) => {
  const q1 = d3.quantile(data.map((d) => d.rates).sort(d3.ascending), 0.25);
  const median = d3.quantile(data.map((d) => d.rates).sort(d3.ascending), 0.5);
  const q3 = d3.quantile(data.map((d) => d.rates).sort(d3.ascending), 0.75);
  const interQuantileRange = q3 - q1;
  const min = q1 - 1.5 * interQuantileRange;
  const max = q3 + 1.5 * interQuantileRange;
  return {
    q1: q1,
    median: median,
    q3: q3,
    interQuantileRange: interQuantileRange,
    min: min,
    max: max,
  };
};
