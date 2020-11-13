import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import * as d3 from "d3";
import { worldHospRates } from "../assets/data/data";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

var colorScale = d3
  .scaleSequential()
  .interpolator(d3.interpolateInferno)
  .domain([0.01, 0.15]);

export const MapChart = () => {
  return (
    <ComposableMap projection="geoMercator" projectionConfig={{ scale: 125 }}>
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies
            .filter((d) => d.properties.REGION_UN !== "Antarctica")
            .map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#EAEAEC"
                stroke="#D6D6DA"
              />
            ))
        }
      </Geographies>
      {worldHospRates.map(({ name, coordinates, markerOffset, rates }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle
            r={10}
            fill={colorScale(rates)}
            stroke="#fff"
            strokeWidth={2}
          />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {`${name}: ${Math.round(rates * 10000) / 100}%`}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};
