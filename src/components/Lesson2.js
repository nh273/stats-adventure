import React, { useState } from "react";
import { Scrollama, Step } from "react-scrollama";
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";
import Exponential from "../viz/Exponential";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const stepStyle = {
  position: "relative",
  zIndex: 5,
  paddingBottom: 300,
  opacity: 0.9,
};
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
  const [control, setControl] = useState(false);
  const [controlExp, setControlExp] = useState(false);
  const [currentStep, setCurrentStep] = useState(null);
  const [currentStepExp, setCurrentStepExp] = useState(null);
  const [currentProgress, setCurrentProgress] = useState(null);
  const [currentProgressExp, setCurrentProgressExp] = useState(null);
  const stepsWithProgress = [2, 3, 5, 6, 8, 25, 26];
  const onStepEnter = ({ data }) => {
    if (data === 1) {
      // assume control
      setControl(true);
      setCurrentStep(data);
    } else if (data < 20) {
      setCurrentStep(data);
    } else if (data === 21) {
      setControlExp(true);
      setCurrentStepExp(data);
    } else {
      setCurrentStepExp(data);
    }
  };
  const onStepExit = ({ data }) => {
    if (data === 8) {
      // relinquish control
      setControl(false);
    }
  };
  const onStepProgress = ({ data, progress }) => {
    if (data < 20 && stepsWithProgress.includes(data)) {
      setCurrentProgress(progress);
    } else if (data >= 20 && stepsWithProgress.includes(data)) {
      setCurrentProgressExp(progress);
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
          <Normal
            dataStep={currentStep}
            stepProgress={currentProgress}
            controlled={control}
          />
        </div>

        <Scrollama
          onStepEnter={onStepEnter}
          onStepProgress={onStepProgress}
          onStepExit={onStepExit}
          offset={0.6}
          progress
        >
          <Step data={1}>
            <div className="step" style={stepStyle}>
              <StepContent>
                A distribution is simply a way to describe a certain shape of
                data. You might remember the <em>Normal Distribution</em>, or
                the bell-curve. If the data "follows a normal distribution", it
                simply means that it has this shape.
              </StepContent>
            </div>
          </Step>

          <Step data={1.1}>
            <div className="step" style={stepStyle}>
              <StepContent>
                Let's say the number of days a person have to stay in hospital
                due to this new disease follows a Normal distribution. Each dot
                is a person's stay. The shape tells us that a lot of the data
                will be around the middle, so most people will stay around 15
                days.
              </StepContent>
            </div>
          </Step>

          <Step data={1.2}>
            <div className="step" style={stepStyle}>
              <StepContent>
                and much fewer data points will be at either extremes. So
                relatively few people will be lucky and have a very short stay
                or have to stay a very long time.
              </StepContent>
            </div>
          </Step>

          <Step data={2}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 200 }}>
                Of course it's not quite as simple as that, since there are
                other distributions that look kinda similar but have slightly
                different specific features. But we can simplify things that way
                for now. There are 2 additional things that can affect how a
                normal distribution looks. First, where its mean is.
              </StepContent>
              <StepContent>
                As you can see, this is quite straightforward. The shape of the
                data is unchanged, but its center shifts. So in a
                better-prepared country with good healthcare people might only
                stay 10 days, on average.
              </StepContent>
            </div>
          </Step>

          <Step data={3}>
            <div className="step" style={stepStyle}>
              <StepContent>
                While in a country with overwhelmed doctors, people might stay
                something like 24 days on average.
              </StepContent>
            </div>
          </Step>

          <Step data={4}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The other "parameter" would be the <em>Standard deviation</em>,
                which describes the spread of data.
              </StepContent>
            </div>
          </Step>

          <Step data={5}>
            <div className="step" style={stepStyle}>
              <StepContent>
                A country with well-equipped hospitals in the cities and
                badly-equipped hospitals in rural area will have highly variable
                lengths of stay.
              </StepContent>
            </div>
          </Step>
          <Step data={6}>
            <div className="step" style={stepStyle}>
              <StepContent>
                While a country with more equitable healthcare system can treat
                everyone equally well (or equally badly) and will have less
                variance in length of stays.
              </StepContent>
            </div>
          </Step>
          <Step data={7}>
            <div className="step" style={stepStyle}>
              <StepContent>
                Thus with just 2 parameters, you can describe a lot of things
                about the data you have. This particular distribution has 1000
                points / patients. If you look at the raw data of 1000 patients,
                it would be nearly impossible to comprehend or communicate
                anything about the data.
              </StepContent>
            </div>
          </Step>
          <Step data={8}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 200 }}>
                Yet if you say "the patients' length of stays in the hospital
                follow a normal distribution with Mean 17 and Standard Deviation
                3.5, everyone will know exactly what you mean.
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>

      <Typography variant="body1" gutterBottom>
        You might vaguely remember from class that the Normal distribution is
        important, and that is true! Normally distributed data keeps showing up
        in nature, whenever multiple factors influence the same measurement
        (such as many genes affecting height).
      </Typography>
      <Typography variant="body1" gutterBottom>
        There are additional properties of the Normal distribution that makes it
        important in all of Statistics. But the important takeaway here is that
        a Distribution is just another way to summarize data, and that
        distributions usual have <em>parameters</em> that further describe it in
        details, which can change for different data.
      </Typography>

      <div id="part-2">
        <div className="sticky" style={chartStyle}>
          <Exponential
            dataStep={currentStepExp}
            stepProgress={currentProgressExp}
            controlled={controlExp}
          />
        </div>

        <Scrollama
          onStepEnter={onStepEnter}
          onStepProgress={onStepProgress}
          offset={0.6}
          progress
        >
          <Step data={21}>
            <div className="step" style={stepStyle}>
              <StepContent>
                To make that clearer, let's very briefly (promise) look at
                another distribution: The Exponential distribution.
              </StepContent>
            </div>
          </Step>

          <Step data={22}>
            <div className="step" style={stepStyle}>
              <StepContent>
                Here, it models the time (in hours) between patients arriving at
                a hospital with the new disease. Let's say on average 1 patients
                will arrive per hour. Most of the time, you have to wait less
                than 1 hour to see a new patient arriving.
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
                equally expect long intervals between patients as short
                intervals.
              </StepContent>
            </div>
          </Step>

          <Step data={26}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 300 }}>
                But at busy hospitals with high lambdas, short intervals are
                more and more likely. Long intervals are more and more rare.
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>

      <Typography variant="body1" gutterBottom>
        So to summarize, distributions describes data. Different distributions
        <em>approximate</em> data with different properties. For each
        distribution, you can usual change one or several <em>parameters</em> to
        fit your particular situation.
      </Typography>
      <Typography variant="body1" gutterBottom>
        One way that distributions are especially useful is in simulations. Once
        you are fairly certain that patients arrive at your hospital according
        to an exponential distribution, and their durations of stay fit a normal
        distribution, you can simulate many days of patient arrivals and stays
        and be fairly confident that they will be realistic.
      </Typography>
    </LessonLayout>
  );
};
