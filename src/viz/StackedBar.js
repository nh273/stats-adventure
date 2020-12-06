import React, { useState } from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
  VictoryStack,
} from "victory";

const data0 = [
  { x: "Mortality of Treated patients", y: 0.0, fill: "#79C7E3" },
  { x: "Mortality of Treated patients", y: 0.0, fill: "Tomato" },
];
const data1 = [
  { x: "Mortality of Treated patients", y: 0.8, fill: "#79C7E3" },
  { x: "Mortality of Treated patients", y: 0.2, fill: "Tomato" },
];
const dataDict = { 0: data0, 1: data1 };
export const StackedBar = (props) => {
  const data = dataDict[props.currentStep];
  const transparentStyle = {
    axis: { stroke: "transparent" },
    ticks: { stroke: "transparent" },
    tickLabels: { fill: "transparent" },
  };
  return (
    <VictoryChart height={180} width={300} padding={25}>
      <VictoryAxis
        style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: {
            fontSize: 10,
          },
        }}
      />
      <VictoryAxis style={transparentStyle} dependentAxis />

      <VictoryStack
        style={{
          data: { width: 20 },
          labels: { fontSize: 8, fill: "white" },
        }}
      >
        {(data || []).map((d, i) => {
          return (
            <VictoryBar
              key={i}
              style={{ data: { fill: d.fill } }}
              data={[{ x: "Mortality of Treated patients", y: d.y }]}
              labels={({ datum }) => datum.y}
              labelComponent={<VictoryLabel dy={15} />}
            />
          );
        })}
      </VictoryStack>
    </VictoryChart>
  );
};
