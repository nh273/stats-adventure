import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Scrollama, Step } from "react-scrollama";

import LessonLayout from "./Lessons";
import { StackedBar } from "../viz/StackedBar";
import { stepStyle, chartStyle, StepContent } from "./Steps";

export const Lesson4 = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };
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
      <div className="contains-sticky">
        <div className="sticky" style={{ ...chartStyle, top: 200 }}>
          <StackedBar currentStep={currentStep} />
        </div>
        <Scrollama onStepEnter={onStepEnter} offset={0.6}>
          <Step data={1}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The key here is the piece of information on how rare this new
                disease is. If you randomly select 100 persons, only 3 would
                have the disease.
              </StepContent>
            </div>
          </Step>

          <Step data={2}>
            <div className="step" style={stepStyle}>
              <StepContent>
                Even with our 99% accuracy, which in this situation we can take
                to mean that we detected all 3 infected persons successfully,
                overall you would still have only 3 people infected and
                positive.
              </StepContent>
            </div>
          </Step>

          <Step data={3}>
            <div className="step" style={stepStyle}>
              <StepContent>
                At 5% false positive, there will be about 5 people who are not
                infected, but their tests are wrongly positive.
              </StepContent>
            </div>
          </Step>

          <Step data={4}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 500 }}>
                So, you can see that even if you are among the 8 people who
                tested positive, it is more likely that you are among the 5 who
                were
                <span style={{ color: "red" }}> misindentified </span> than the
                3 who were{" "}
                <span style={{ color: "green" }}> correctly identified </span>.
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>
    </LessonLayout>
  );
};
