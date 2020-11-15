import React from "react";
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";
import Exponential from "../viz/Exponential";
import Typography from "@material-ui/core/Typography";

export const Lesson2 = (props) => {
  return (
    <LessonLayout>
      {" "}
      <Typography variant="h2" gutterBottom>
        Describing data with Histogram and Distributions
      </Typography>
      <Typography variant="body1" gutterBottom></Typography>
      <Normal />
      <Exponential />
    </LessonLayout>
  );
};
