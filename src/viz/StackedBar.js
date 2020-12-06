import React, { useState } from "react";
import {
  VictoryChart,
  VictoryAxis,
  VictoryBar,
  VictoryLabel,
  VictoryLegend,
  VictoryStack,
} from "victory";

const data1 = [
  [{ x: "Mortality of Treated patients", y: 0.0 }],
  [{ x: "Mortality of Treated patients", y: 0.0 }],
];
const data2 = [
  [{ x: "Mortality of Treated patients", y: 0.8 }],
  [{ x: "Mortality of Treated patients", y: 0.2 }],
];

const data3 = [
  [
    { x: "Mortality of Treated patients", y: 0.8 },
    { x: "Mortality of Untreated patients", y: 0.65 },
  ],
  [
    { x: "Mortality of Treated patients", y: 0.2 },
    { x: "Mortality of Untreated patients", y: 0.35 },
  ],
];
const data4 = [
  [
    { x: "Mortality of prioritized patients", y: 0.8 },
    { x: "Mortality of 'lost-cause' patients", y: 0.65 },
  ],
  [
    { x: "Mortality of prioritized patients", y: 0.2 },
    { x: "Mortality of 'lost-cause' patients", y: 0.35 },
  ],
];
const dataDict = { 1: data1, 2: data2, 3: data3, 4: data4 };
export const StackedBar = (props) => {
  const data = dataDict[props.currentStep];
  const transparentStyle = {
    axis: { stroke: "transparent" },
    ticks: { stroke: "transparent" },
    tickLabels: { fill: "transparent" },
  };
  return (
    <VictoryChart
      height={180}
      width={300}
      padding={25}
      domainPadding={{ x: 60 }}
      animate={{ duration: 500 }}
    >
      <VictoryAxis
        style={{
          axis: { stroke: "transparent" },
          ticks: { stroke: "transparent" },
          tickLabels: {
            fontSize: 10,
            fill: props.currentStep > 0 ? "black" : "transparent",
          },
        }}
      />
      <VictoryAxis style={transparentStyle} dependentAxis />
      {props.currentStep > 0 ? (
        <VictoryLegend
          x={props.currentStep === 2 ? 200 : 120}
          y={20}
          style={{ labels: { fontSize: 8 } }}
          data={[
            { name: "Death", symbol: { fill: "tomato", type: "square" } },
            { name: "Survival", symbol: { fill: "79C7E3", type: "square" } },
          ]}
        />
      ) : null}
      <VictoryStack
        style={{
          data: { width: 20 },
          labels: { fontSize: 8, fill: "white" },
        }}
        colorScale={["tomato", "#79C7E3"]}
      >
        {(data || []).map((d, i) => {
          return (
            <VictoryBar
              key={i}
              data={d}
              labels={({ datum }) => datum.y}
              labelComponent={<VictoryLabel dy={15} />}
            />
          );
        })}
      </VictoryStack>
    </VictoryChart>
  );
};
