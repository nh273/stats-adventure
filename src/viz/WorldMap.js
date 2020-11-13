import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";

const geoUrl =
  "https://raw.githubusercontent.com/zcreativelabs/react-simple-maps/master/topojson-maps/world-110m.json";

const markers = [
  { markerOffset: -15, name: "Italy", coordinates: [12.5, 41.9] },
  { markerOffset: -25, name: "England", coordinates: [0.13, 51.5] },
  { markerOffset: 25, name: "Kenya", coordinates: [36.8, 1.29] },
  { markerOffset: 25, name: "East Coast US", coordinates: [-74.0721, 40.7] },
  { markerOffset: 25, name: "Russia", coordinates: [37.6, 55.8] },
  { markerOffset: -15, name: "South Africa", coordinates: [18.4, -33.9] },
  { markerOffset: -15, name: "China", coordinates: [114.3, 30.6] },
  { markerOffset: 25, name: "Indonesia", coordinates: [106.8, 6.2] },
  { markerOffset: -25, name: "Australia", coordinates: [151.2, -33.9] },
  { markerOffset: -15, name: "Venezuela", coordinates: [-66.9036, 10.4806] },
  { markerOffset: -15, name: "Brazil", coordinates: [-46.6, -23.6] },
  { markerOffset: -15, name: "Argentina", coordinates: [-58.4, -34.6] },
  { markerOffset: -15, name: "Nigeria", coordinates: [3.38, 6.52] },
  { markerOffset: -15, name: "Lebanon", coordinates: [35 / 5, 33.9] },
  { markerOffset: -15, name: "India", coordinates: [77.2, 28.6] },
  { markerOffset: -15, name: "Japan", coordinates: [139.7, 35.7] },
  { markerOffset: -15, name: "Mexico", coordinates: [99.1, 19.4] },
  { markerOffset: -15, name: "West Coast US", coordinates: [-118.2, 34.1] },
  { markerOffset: -15, name: "Canada", coordinates: [-123.1, 49.3] },
  { markerOffset: -15, name: "Ecuador", coordinates: [-78.5, 0.18] },
  { markerOffset: -15, name: "Qatar", coordinates: [51.5, 25.3] },
];

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
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
          <circle r={10} fill="#F00" stroke="#fff" strokeWidth={2} />
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#5D5A6D" }}
          >
            {name}
          </text>
        </Marker>
      ))}
    </ComposableMap>
  );
};
