import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import Typography from "@material-ui/core/Typography";

import LazyLoad from "react-lazyload";
import LessonLayout from "./Lessons";
import { MapChart } from "../viz/WorldMap";
import Boxplot from "../viz/Boxplot";
import growth from "../assets/images/growth.PNG";
import { stepStyle, chartStyle, StepContent } from "./Steps";

export const Lesson1 = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };
  return (
    <LessonLayout
      backLink="/"
      backText="Home"
      fwdLink="/histogram-distribution"
      fwdText="Distributions"
    >
      <Typography variant="h2" gutterBottom>
        Describing data and uncertainty
      </Typography>
      <Typography variant="body1" gutterBottom>
        Statistics is especially useful when there is uncertainty. Let's put
        ourselves in the totally hypothetical situation when there is an
        emerging pandemic.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The mysterious new disease seems to spread very quickly. It is not
        extremely fatal, but because of how fast it spreads, even when only a
        small percentage of people needs intensive care, it becomes a huge
        problem for hospitals. How many hospital beds must be prepared for it?
        Your country's Ministry of Health wants to know.
      </Typography>
      <LazyLoad>
        <img
          src={growth}
          alt="Illustration of speed of spread of the disease"
          className="responsive"
        />
        <Typography variant="caption" gutterBottom>
          The new disease spreads extremely quickly
        </Typography>
      </LazyLoad>
      <Typography variant="body1" gutterBottom>
        Since the disease is new, we don't know much about it. We have the
        hospitalization rates reported by 20 different countries. What can we
        say about the true hospitalization rates of this disease?
      </Typography>
      <div className="map-chart-area">
        <MapChart />
      </div>
      <Typography variant="body1" gutterBottom>
        Looking at all these rates, it might be hard to arrive at a specific
        conclusion. Some influential studies have shown that our mind can only
        hold 7 (plus minus 2) objects in working memory, so this is no surprise!
        Fortunately, Statistics can help!
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is the realm of <em>"descriptive Statistics"</em>, which is just a
        term for "summarizing data". You might have seen a plot similar to the
        one below: a <em>"box-and-whisker"</em> plot. It describes some crucial
        summarizing information about the 20 data points we have.
      </Typography>
      <div className="contains-sticky">
        <div className="sticky" style={{ ...chartStyle, top: 200 }}>
          <Boxplot currentStep={currentStep} />
        </div>
        <Scrollama onStepEnter={onStepEnter} offset={0.6}>
          <Step data={1}>
            <div className="step" style={stepStyle}>
              <StepContent>
                This type of plot is extremely common in science, but not many
                people can read it.
              </StepContent>
            </div>
          </Step>
          <Step data={2}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 300 }}>
                Usually, the data points are not there, but I have overlaid them
                so we can relate the plot to the data better. First, each data
                point from the map is arranged on the horizontal axis. I have
                randomly nudged them up and down just a bit to see the
                nearly-overlapping points better.
              </StepContent>
            </div>
          </Step>
          <Step data={3}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The blue box is the Interquartile Range (IQR): the middle 50% of
                the data is in this box. The top and bottom 25% are outside.
              </StepContent>
            </div>
          </Step>
          <Step data={4}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The whiskers start from either ends of the box, and have length
                equal to 1.5 of the IQR. The whiskers give us an idea of what is
                considered "extreme". Data points outside the whiskers are
                generally considered "outliers" or <em>extreme values</em> by
                convention.
              </StepContent>
            </div>
          </Step>
          <Step data={5}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The red line is the "median", which is simply the middle one
                among all the values. This gives us an idea about the "average"
                hospitalization rates.
              </StepContent>
            </div>
          </Step>
          <Step data={6}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The dotted orange line is the "mean", which might be the kind of
                "average" that you are familiar with: summing all values
                together then dividing by the number of values. Here we can see
                the mean is higher than the median.
              </StepContent>
            </div>
          </Step>
          <Step data={7}>
            <div className="step" style={stepStyle}>
              <StepContent>
                This is because of the presence of an "outlier" of extremely
                high value on the right, pulling the mean higher. The median is
                merely determined by rank, so it is not affected by how far this
                outlier is from the rest of the data
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>

      <Typography variant="body1" gutterBottom>
        Already you might see how carefully selected Statistics can be used to
        construct a narrative with the same data. Let's say your country has a
        region that is doing really badly, with outlyingly high hospitalization
        rates. If you want to make the "average" hospitalization rates appears
        lower, you might be tempted to use the median rather than the mean.
      </Typography>
      <Typography variant="body1" gutterBottom>
        This is what Statistics is about: a common way to summarize and talk
        about data. This is also why you should understand Statistics, because
        it is a tool that people can use to make arguments.
      </Typography>
    </LessonLayout>
  );
};
