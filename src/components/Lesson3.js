import React, { useState } from "react";
import LessonLayout from "./Lessons";
import Typography from "@material-ui/core/Typography";
import { Scrollama, Step } from "react-scrollama";
import ErrorSankey from "../viz/Sankey";
import { stepStyle, chartStyle, StepContent } from "./Steps";

export const Lesson3 = (props) => {
  const [currentStep, setCurrentStep] = useState(null);
  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };
  return (
    <LessonLayout backLink="/histogram-distribution" backText="Distributions">
      <Typography variant="h2" gutterBottom>
        An introduction to errors
      </Typography>

      <Typography variant="body1" gutterBottom>
        Sometimes we have more than just the average and spread of data.
        Sometimes we know which <em>distribution</em> the data came from, or can
        be approximated by.
      </Typography>
      <div className="sticky" style={{ ...chartStyle, top: 0 }}>
        <ErrorSankey />
      </div>
      <Scrollama onStepEnter={onStepEnter} offset={0.6}>
        <Step data={21}>
          <div className="step" style={stepStyle}>
            <StepContent>
              To make that clearer, let's very briefly (promise) look at another
              distribution: The Exponential distribution.
            </StepContent>
          </div>
        </Step>

        <Step data={22}>
          <div className="step" style={stepStyle}>
            <StepContent>
              Here, it models the time (in hours) between patients arriving at a
              hospital with the new disease. Let's say on average 1 patients
              will arrive per hour. Most of the time, you have to wait less than
              1 hour to see a new patient arriving.
            </StepContent>
          </div>
        </Step>

        <Step data={23}>
          <div className="step" style={stepStyle}>
            <StepContent>
              But just by chance, sometimes, you will wait much longer before
              seeing a new patient.
            </StepContent>
          </div>
        </Step>

        <Step data={24}>
          <div className="step" style={stepStyle}>
            <StepContent>
              If you are a different hospital, it's likely that your
              distribution won't change, because the <em>nature</em> of your
              data is not changing: patients still arrive in the same random
              way, and your wait time still behaves the same. Yet your{" "}
              <em>parameter</em> will change
            </StepContent>
          </div>
        </Step>

        <Step data={25}>
          <div className="step" style={stepStyle}>
            <StepContent>
              Lambda is the mean number of patients arriving each hour. At a
              hospital in the middle of nowhere, with small lambda, you might
              equally expect long intervals between patients as short intervals.
            </StepContent>
          </div>
        </Step>

        <Step data={26}>
          <div className="step" style={stepStyle}>
            <StepContent style={{ marginBottom: 300 }}>
              But at busy hospitals with high lambdas, short intervals are more
              and more likely. Long intervals are more and more rare.
            </StepContent>
          </div>
        </Step>
      </Scrollama>
    </LessonLayout>
  );
};
