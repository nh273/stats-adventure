import React from "react";
import LazyLoad from "react-lazyload";
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";
import { MapChart } from "../viz/WorldMap";
import growth from "../assets/images/growth.PNG";
import Typography from "@material-ui/core/Typography";

export const Lesson1 = (props) => {
  return (
    <LessonLayout>
      <Typography variant="h2" gutterBottom>
        Describing data and uncertainty
      </Typography>
      <Typography variant="body1" gutterBottom>
        Statistics is especially useful when there is uncertainty. Let's put
        ourselves in the totally hypothetical situation when there is an
        emerging pandemic.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The mysterious new disease seems to spread very quickly. It is not
        extremely fatal, but because of how fast it spreads, even when only a
        small percentage of people needs intensive care, it becomes a huge
        problem for hospitals. How many hospital beds must be prepared for it?
        Your country's Ministry of Health wants to know.
      </Typography>
      <LazyLoad>
        <img
          src={growth}
          alt="Illustration of speed of spread of the disease"
          className="responsive"
        />
        <Typography variant="caption" gutterBottom>
          The new disease spreads extremely quickly
        </Typography>
      </LazyLoad>
      <Typography variant="body1" gutterBottom>
        Since the disease is new, we don't know much about it. We have the
        hospitalization rates reported by 20 different countries. What can we
        say about the true hospitalization rates of this disease? Fortunately,
        Statistics can help!
      </Typography>
      <div className="map-chart-area">
        <MapChart />
      </div>
      <Normal data={[1, 3, 4, 5]} size={[50, 50]} />
      Then some more random text here
    </LessonLayout>
  );
};
