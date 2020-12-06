import React, { useState } from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
  VictoryStack,
} from "victory";

export const StackedBar = (props) => {
  const transparentStyle = {
    axis: { stroke: "transparent" },
    ticks: { stroke: "transparent" },
    tickLabels: { fill: "transparent" },
  };
  return (
    <VictoryChart height={200} width={300} padding={50}>
      <VictoryAxis
        style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: { fontSize: 10 },
        }}
      />
      <VictoryAxis style={transparentStyle} dependentAxis />
      <VictoryStack
        style={{ data: { width: 20 }, labels: { fontSize: 8, fill: "white" } }}
      >
        <VictoryBar
          style={{ data: { fill: "tomato" } }}
          data={[{ x: "Mortality of Treated patients", y: 0.8 }]}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={15} />}
        />
        <VictoryBar
          style={{ data: { fill: "#79C7E3" } }}
          data={[{ x: "Mortality of Treated patients", y: 0.2 }]}
          labels={({ datum }) => datum.y}
          labelComponent={<VictoryLabel dy={15} />}
        />
      </VictoryStack>
    </VictoryChart>
  );
};
