import React from "react";
import { Sankey, Hint } from "react-vis";

const data = {
  nodes: [
    {
      // Chance of actually catching disease: 3%
      step: 1,
    },
    {
      // Chance of test detecting disease correctly (true positive): 90%
      name: "Infected",
      step: 1,
    },
    {
      // Chance of test incorrectly detecting disease on uninfected person
      // (false positive): 1%
      name: "Not infected",
      step: 1,
    },
    { name: "Infected & correct ➕", step: 2 },
    { name: "Infected & wrongly ➖", step: 2 },
    { name: "Not infected & wrongly ➕", step: 3 },
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
      value: 0.9 * 0.03,
      step: 2,
      explanation: "True Positive",
    },
    {
      source: 1,
      target: 4,
      value: 0.1 * 0.03,
      step: 2,
      explanation: "False Negative",
    },
    {
      source: 2,
      target: 5,
      value: 0.97 * 0.01,
      step: 3,
      explanation: "False Positive",
    },
    {
      source: 2,
      target: 6,
      value: 0.97 * 0.99,
      step: 3,
      explanation: "True Negative",
    },
  ],
};

const BLURRED_LINK_OPACITY = 0.2;
const FOCUSED_LINK_OPACITY = 0.8;

export default class ErrorSankey extends React.Component {
  constructor(props) {
    super();
    this.state = { currentStep: 1, activeLink: null };
  }

  _renderHint() {
    const { activeLink } = this.state;

    // calculate center x,y position of link for positioning of hint
    const x =
      activeLink.source.x1 + (activeLink.target.x0 - activeLink.source.x1) / 2;
    const y = activeLink.y0 - (activeLink.y0 - activeLink.y1) / 2;

    const hintValue = {
      Probability: `${activeLink.explanation} ${activeLink.value}`,
    };

    return <Hint x={x} y={y} value={hintValue} />;
  }

  render() {
    const { activeLink } = this.state;
    return (
      <div>
        <Sankey
          animation
          margin={{ left: 50, right: 50, top: 50, bottom: 50 }}
          padding={50}
          nodes={data.nodes.filter((n) => n.step <= this.state.currentStep)}
          links={data.links
            .filter((l) => l.step <= this.state.currentStep)
            .map((d, i) => ({
              ...d,
              opacity:
                activeLink && i === activeLink.index
                  ? FOCUSED_LINK_OPACITY
                  : BLURRED_LINK_OPACITY,
            }))}
          hasVoronoi={false}
          // onLinkMouseOver={(node) => this.setState({ activeLink: node })}
          // onLinkMouseOut={() => this.setState({ activeLink: null })}
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
  }
}
