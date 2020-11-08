import React from "react";
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";

export const Lesson1 = (props) => {
  return (
    <LessonLayout>
      Some random text here
      <Normal data={[1, 3, 4, 5]} size={[50, 50]} />
      Then some more random text here
    </LessonLayout>
  );
};
