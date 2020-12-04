import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";
import Exponential from "../viz/Exponential";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const stepStyle = { position: "relative", zIndex: 5, paddingBottom: 300 };
const chartStyle = { position: "sticky", top: 200, zIndex: 1 };

const StepContent = (props) => {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
};

export const Lesson2 = (props) => {
  const [currentStep, setCurrentStep] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(null);
  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };
  const onStepProgress = ({ data, progress }) => {
    if (data === 2 || data === 3) {
      setCurrentProgress(progress);
    }
  };
  return (
    <LessonLayout>
      <Typography variant="h2" gutterBottom>
        Describing data with Histogram and Distributions
      </Typography>
      <Typography variant="body1" gutterBottom>
        Sometimes we have more than just the average and spread of data.
        Sometimes we know which <em>distribution</em> the data came from, or can
        be approximated by.
      </Typography>
      <div id="part-1">
        <div className="sticky" style={chartStyle}>
          <Normal dataStep={currentStep} stepProgress={currentProgress} />
        </div>

        <Scrollama
          onStepEnter={onStepEnter}
          onStepProgress={onStepProgress}
          offset={0.5}
          progress
          debug
        >
          <Step data={1}>
            <div className="step" style={stepStyle}>
              <StepContent>
                A distribution is simply a way to describe a certain shape of
                data. You might remember the <em>Normal Distribution</em>, or
                the bell-curve. If the data "follows a normal distribution", it
                simply means that it has this shape. The shape tells us that a
                lot of the data will be around the middle, and much fewer data
                points will be at either extremes. Of course it's not quite as
                simple as that, since there are other distributions that look
                kinda similar but have slightly different specific features. But
                we can simplify things that way for now.
              </StepContent>
            </div>
          </Step>

          <Step data={2}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 200 }}>
                There are 2 additional things that can affect how a normal
                distribution looks. First, where its mean is.
              </StepContent>
              <StepContent>
                As you can see, this is quite straightforward. The shape of the
                data is unchanged, but its center shifts. So winter temperatures
                in Paris might have a mean of -3 (in degrees Celsius).
              </StepContent>
            </div>
          </Step>

          <Step data={3}>
            <div className="step" style={stepStyle}>
              <StepContent>
                While height of men in meter might have a mean of +1.75
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>

      <div id="part-2">
        <div className="sticky" style={chartStyle}>
          <Exponential />
        </div>

        <Scrollama onStepEnter={onStepEnter} offset={0.5} debug>
          <Step data={1}>
            <div className="step" style={stepStyle}>
              <Typography variant="body1" gutterBottom>
                A distribution is simply a way to describe a certain shape of
                data. You might remember the <em>Normal Distribution</em>, or
                the bell-curve. If the data "follows a normal distribution", it
                simply means that it has this shape. The shape tells us that a
                lot of the data will be around the middle, and much fewer data
                points will be at either extremes. Of course it's not quite as
                simple as that, since there are other distributions that look
                kinda similar but have slightly different specific features. But
                we can simplify things that way for now.
              </Typography>
            </div>
          </Step>

          <Step data={2}>
            <div className="step" style={stepStyle}>
              <Typography variant="body1" gutterBottom>
                As you can see, there a 2 additional things that can affect how
                a normal distribution looks: where its mean is, and how spread
                out is the data. These, we call "parameters".
              </Typography>
              <Typography variant="body1" gutterBottom>
                So now, much like when we described 20 data points with the
                average and the spread before, we can describe these 2000 points
                with just 3 things: the name "normal distribution", which tells
                you the shape; the mean parameter, which is the average; and the
                standard deviation, which tells you the spread.
              </Typography>
            </div>
          </Step>
        </Scrollama>
      </div>
    </LessonLayout>
  );
};
