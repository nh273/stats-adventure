import React from "react";
import Quiz from "./Quiz";
import { db } from "../Firebase/firebase";

const exitQuiz = [
  {
    qid: "exit_attitude_0",
    questionContent:
      "I find the idea of the project (Stats Adventure) interesting",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_1",
    questionContent:
      "I agree with the premise that some level of Statistics understanding is necessary for most people",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_2",
    questionContent:
      "I find the Statistics concepts covered in the project (Stats Adventure) to be useful and relevant.",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_3",
    questionContent: "I find the visualizations in Stats Adventure helpful",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_4",
    questionContent:
      "The interactivity in Stats Adventure helped me understand the concepts better",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_5",
    questionContent:
      "The context used by Stats Adventure (fighting a pandemic) helped me engage with the subject.",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_6",
    questionContent: "Stats Adventure is easy to navigate",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_7",
    questionContent:
      "Stats Adventure's scrolling interactivity is pleasant to use",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_8",
    questionContent:
      "Stats Adventure has helped my understanding of Statistics",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
  {
    qid: "exit_attitude_9",
    questionContent:
      "Stats Adventure has improved my attitude towards Statistics",
    questionChoices: ["Disagree 🤢", "Neutral 😕", "Agree 😍"],
  },
];

class ExitQuiz extends React.Component {
  render() {
    const dbref = db.ref("exit-attitude-quiz");
    return (
      <Quiz questions={exitQuiz} dbref={dbref} fwdText="Home" fwdLink="/" />
    );
  }
}

export default ExitQuiz;
