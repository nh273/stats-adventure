import React from "react";
import Typography from "@material-ui/core/Typography";

import LessonLayout from "./Lessons";
import { StackedBar } from "../viz/StackedBar";

export const Lesson4 = (props) => {
  return (
    <LessonLayout backLink="/error-bias" backText="Introduction to Errors">
      <Typography variant="h2" gutterBottom>
        What is "statistically significant" anyway?
      </Typography>
      <Typography variant="body1" gutterBottom>
        The end is in sight! Scientists have created a treatment for the
        pandemic.
      </Typography>
      <Typography variant="body1" gutterBottom>
        But how do you know which treatment really works, and which doesn't?
      </Typography>
      <StackedBar />
    </LessonLayout>
  );
};
