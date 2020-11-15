import React from "react";
import LessonLayout from "./Lessons";
import Typography from "@material-ui/core/Typography";
import ErrorSankey from "../viz/Sankey";

export const Lesson3 = (props) => {
  return (
    <LessonLayout>
      <Typography variant="h2" gutterBottom>
        An introduction to errors
      </Typography>
      <ErrorSankey />
    </LessonLayout>
  );
};
