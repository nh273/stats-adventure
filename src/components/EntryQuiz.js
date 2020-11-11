import React from "react";
import Quiz from "./Quiz";
import { db } from "../Firebase/firebase";

const entryQuiz = [
  {
    qid: "entry_attitude_0",
    questionContent: "I like statistics.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_1",
    questionContent: "I am not afraid of statistics.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_2",
    questionContent: "I enjoy taking statistics courses.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_3",
    questionContent: "I am interested in learning statistics.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_4",
    questionContent: "I don’t find it hard to understand statistical concept.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_5",
    questionContent: "Statistics can be quickly learned by most people.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_6",
    questionContent: "I can learn statistics.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_7",
    questionContent: "Statistics should be a required part of my study",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_8",
    questionContent:
      "Other than for study purpose, statistics is also useful for my daily life.",
    questionChoices: ["🤢", "😕", "😍"],
  },
  {
    qid: "entry_attitude_9",
    questionContent: "I will use statistics in my future career.",
    questionChoices: ["🤢", "😕", "😍"],
  },
];

class EntryQuiz extends React.Component {
  render() {
    const dbref = db.ref("entry-attitude-quiz");
    return <Quiz questions={entryQuiz} dbref={dbref} />;
  }
}

export default EntryQuiz;
