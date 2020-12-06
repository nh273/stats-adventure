import React, { useState } from "react";
import { Sankey, Hint } from "react-vis";

const data = {
  nodes: [
    {
      // Chance of actually catching disease: 3%
      step: 1,
    },
    {
      name: "Infected",
      step: 1,
    },
    {
      name: "Not infected",
      step: 1,
    },
    { name: "Infected & correct ➕", step: 2, colorOnFour: "green" },
    { name: "Infected & wrongly ➖", step: 2 },
    { name: "Not infected & wrongly ➕", step: 3, colorOnFour: "red" },
    { name: "Not infected & correct ➖", step: 3 },
  ],
  links: [
    {
      source: 0,
      target: 1,
      value: 0.03,
      step: 1,
      explanation: "of getting infected",
    },
    {
      source: 0,
      target: 2,
      value: 0.97,
      step: 1,
      explanation: "of not being infected",
    },
    {
      source: 1,
      target: 3,
      value: 0.99 * 0.03,
      step: 2,
      explanation: "True Positive",
    },
    {
      source: 1,
      target: 4,
      value: 0.01 * 0.03,
      step: 2,
      explanation: "False Negative",
    },
    {
      source: 2,
      target: 5,
      value: 0.97 * 0.05,
      step: 3,
      explanation: "False Positive",
    },
    {
      source: 2,
      target: 6,
      value: 0.97 * 0.95,
      step: 3,
      explanation: "True Negative",
    },
  ],
};

const BLURRED_LINK_OPACITY = 0.2;
const FOCUSED_LINK_OPACITY = 0.8;

export const DumbSankey = (props) => {
  return (
    <Sankey
      animation
      width={600}
      height={200}
      padding={50}
      align={"center"}
      nodes={[
        { name: "Infected" },
        { name: "Test is ➕" },
        { name: "Test is ➖" },
      ]}
      links={[
        { source: 0, target: 1, value: 0.99 },
        { source: 0, target: 2, value: 0.01 },
      ]}
    />
  );
};

export const DumbSankeyNeg = (props) => {
  return (
    <Sankey
      animation
      width={600}
      height={200}
      padding={50}
      align={"center"}
      nodes={[
        { name: "Not Infected" },
        { name: "Test is ➕" },
        { name: "Test is ➖" },
      ]}
      links={[
        { source: 0, target: 1, value: 0.05 },
        { source: 0, target: 2, value: 0.95 },
      ]}
    />
  );
};
export const ErrorSankey = (props) => {
  const [activeLink, setActiveLink] = useState(null);

  const _renderHint = () => {
    // calculate center x,y position of link for positioning of hint
    const x =
      activeLink.source.x1 + (activeLink.target.x0 - activeLink.source.x1) / 2;
    const y = activeLink.y0 - (activeLink.y0 - activeLink.y1) / 2;

    const hintValue = {
      Probability: `${activeLink.explanation} ${activeLink.value}`,
    };

    return <Hint x={x} y={y} value={hintValue} />;
  };

  return (
    <div>
      <Sankey
        animation
        margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
        padding={50}
        nodes={data.nodes
          .filter((n) => n.step <= props.currentStep)
          // on step 1, render only step 1 nodes
          // on step 2, render notes with step 1 & step 2, etc.
          .map((n) =>
            // kinda ugly! if node has colorOnFour = true, then on step 4, add a color property
            props.currentStep === 4 && n.colorOnFour
              ? { ...n, color: n.colorOnFour }
              : n
          )}
        links={data.links
          .filter((l) => l.step <= props.currentStep)
          .map((d, i) => ({
            ...d,
            opacity:
              activeLink && i === activeLink.index
                ? FOCUSED_LINK_OPACITY
                : BLURRED_LINK_OPACITY,
          }))}
        hasVoronoi={false}
        // onLinkMouseOver={(node) => setActiveLink(node)}
        // onLinkMouseOut={() => setActiveLink(null)}
        width={600}
        align={"center"}
        height={800}
        layout={24}
        nodeWidth={15}
        nodePadding={50}
        style={{
          links: {
            opacity: 0.3,
          },
          labels: {
            fontSize: "12px",
          },
          rects: {
            strokeWidth: 2,
            stroke: "#1A3177",
          },
        }}
      >
        {activeLink && this._renderHint()}
      </Sankey>
    </div>
  );
};

export const ControlledSankey = (props) => {
  const { prevalence, sensitivity, specificity } = props.params;
  const data = {
    nodes: [
      {
        // Chance of actually catching disease: 3%
      },
      {
        name: "Infected",
      },
      {
        name: "Not infected",
      },
      { name: "Infected & correct ➕", color: "green" },
      { name: "Infected & wrongly ➖" },
      { name: "Not infected & wrongly ➕", color: "red" },
      { name: "Not infected & correct ➖" },
    ],
    links: [
      { source: 0, target: 1, value: prevalence },
      { source: 0, target: 2, value: 1 - prevalence },
      {
        source: 1,
        target: 3,
        value: sensitivity * prevalence,
        // True Positive
      },
      {
        source: 1,
        target: 4,
        value: (1 - sensitivity) * prevalence,
        // False Negative
      },
      {
        source: 2,
        target: 5,
        value: (1 - prevalence) * (1 - specificity),
        // False Positive
      },
      {
        source: 2,
        target: 6,
        value: (1 - prevalence) * specificity,
        // True Negative
      },
    ],
  };

  return (
    <Sankey
      animation
      align="center"
      width={600}
      height={300}
      nodeWidth={15}
      nodePadding={20}
      padding={20}
      nodes={data.nodes}
      links={data.links}
    />
  );
};
