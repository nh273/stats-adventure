import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Scrollama, Step } from "react-scrollama";
import { db } from "../Firebase/firebase";
import LessonLayout from "./Lessons";
import ErrorSankey, { DumbSankey } from "../viz/Sankey";
import { stepStyle, chartStyle, StepContent } from "./Steps";

const useStyles = makeStyles({
  slider: {
    height: 120,
    width: 500,
    paddingTop: 50,
    paddingLeft: 50,
    paddingRight: 5,
    paddingBottom: 10,
    justifyContent: "center",
  },
});

const ErrorSurvey = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0.5);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dbref = db.ref("error-bias-survey-1");

  const handleSubmit = (e) => {
    e.preventDefault();
    var newSubmissionRef = dbref.push();
    newSubmissionRef.set(value, function (error) {
      if (error) {
        alert(`There had been an error ${error}`);
      } else {
        props.giveAnswer();
      }
    });
  };

  return (
    <Card>
      <form name="error-bias-survey-1" onSubmit={handleSubmit}>
        <div className={classes.slider}>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={value}
            onChange={handleChange}
            valueLabelDisplay="auto"
          />
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Card>
  );
};

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
        In the effort to curb the pandemic, scientists have created a test to
        detect if a person had been infected. It has an accuracy of 90% which
        does sound impressive.
      </Typography>
      <DumbSankey />
      <Typography variant="body1" gutterBottom>
        But is this enough to combat the pandemic? If you tested positive for
        the virus, what do you think is the chance that you <em>actually</em>{" "}
        have it?
      </Typography>
      <ErrorSurvey />
      <div className="sticky" style={{ ...chartStyle, top: 0 }}>
        <ErrorSankey />
      </div>
      <Scrollama onStepEnter={onStepEnter} offset={0.6}>
        <Step data={1}>
          <div className="step" style={stepStyle}>
            <StepContent>
              To make that clearer, let's very briefly (promise) look at another
              distribution: The Exponential distribution.
            </StepContent>
          </div>
        </Step>

        <Step data={2}>
          <div className="step" style={stepStyle}>
            <StepContent>
              Here, it models the time (in hours) between patients arriving at a
              hospital with the new disease. Let's say on average 1 patients
              will arrive per hour. Most of the time, you have to wait less than
              1 hour to see a new patient arriving.
            </StepContent>
          </div>
        </Step>

        <Step data={3}>
          <div className="step" style={stepStyle}>
            <StepContent style={{ marginBottom: 300 }}>
              But just by chance, sometimes, you will wait much longer before
              seeing a new patient.
            </StepContent>
          </div>
        </Step>
      </Scrollama>
    </LessonLayout>
  );
};
