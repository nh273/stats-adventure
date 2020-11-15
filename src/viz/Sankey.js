import React from "react";
import { Sankey } from "react-vis";

const data = {
  nodes: [
    { name: "Probability of actually catching disease: 3%" },
    {
      name:
        "Probability of test detecting disease correctly (true positive): 90%",
    },
    {
      name:
        "Probability of test incorrectly detecting disease on uninfected person (false positive): 1%",
    },
    { name: "Infected and positive" },
    { name: "Infected and wrongly negative" },
    { name: "Not infected and wrongly positive" },
    { name: "Not infected and negative" },
  ],
  links: [
    { source: 0, target: 1, value: 0.03 },
    { source: 0, target: 2, value: 0.97 },
    { source: 1, target: 3, value: 0.9 * 0.03 },
    { source: 1, target: 4, value: 0.1 * 0.03 },
    { source: 2, target: 5, value: 0.97 * 0.01 },
    { source: 2, target: 6, value: 0.97 * 0.99 },
  ],
};

export default class ErrorSankey extends React.Component {
  render() {
    return (
      <Sankey
        animation
        margin={50}
        nodes={data.nodes}
        links={data.links}
        width={960}
        align={"center"}
        height={500}
        layout={24}
        nodeWidth={15}
        nodePadding={10}
        style={{
          links: {
            opacity: 0.3,
          },
          labels: {
            fontSize: "8px",
          },
          rects: {
            strokeWidth: 2,
            stroke: "#1A3177",
          },
        }}
      />
    );
  }
}
