import React from "react";
import LessonLayout from "./Lessons";
import { Histogram } from "../viz/Histogram";

export const Lesson1 = (props) => {
  return (
    <LessonLayout>
      Some random text here
      <Histogram />
      Then some more random text here
    </LessonLayout>
  );
};
