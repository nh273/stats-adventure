import * as d3 from "d3";

export const dodger = (radius) => {
  const radius2 = radius ** 2;
  const bisect = d3.bisector((d) => d.x);
  const circles = [];
  return (x) => {
    const l = bisect.left(circles, x - radius);
    const r = bisect.right(circles, x + radius, l);
    let y = 0;
    for (let i = l; i < r; ++i) {
      const { x: xi, y: yi } = circles[i];
      const x2 = (xi - x) ** 2;
      const y2 = (yi - y) ** 2;
      if (radius2 > x2 + y2) {
        y = yi + Math.sqrt(radius2 - x2) + 1e-6;
        i = l - 1;
        continue;
      }
    }
    circles.splice(bisect.left(circles, x, l, r), 0, { x, y });
    return y;
  };
};

export const pachinko = (random, svg, xScale, height, margin) => {
  const n = 1000;
  const radius = 2;
  const dodge = dodger(radius * 2 + 1);
  const values = Float64Array.from({ length: n }, random);

  svg.selectAll("circle").remove();

  for (let i = 0; i < n; ++i) {
    const val = values[i];
    const cx = xScale(val);
    const cy = height - margin.bottom - dodge(cx) - radius - 1;
    if (cy < margin.top) break;
    svg
      .append("circle")
      .attr("cx", cx)
      .attr("cy", cy)
      .attr("r", radius)
      .attr("class", val < 1.5 && val > -1.5 ? "circle-center" : "circle-edge");
  }

  return svg.node();
};
