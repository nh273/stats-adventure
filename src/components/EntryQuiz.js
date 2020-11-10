import React from "react";
import { Quiz } from "./Quiz";

const entryQuiz = [
  {
    questionContent: "I like statistics.",
    questionChoices: ["🤢", "😕", "😍"],
  },
];

export const EntryQuiz = (props) => {
  return <Quiz questions={entryQuiz} />;
};
