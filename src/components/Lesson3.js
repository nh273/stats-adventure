import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { Scrollama, Step } from "react-scrollama";
import { db } from "../Firebase/firebase";
import LessonLayout from "./Lessons";
import {
  ErrorSankey,
  DumbSankey,
  DumbSankeyNeg,
  ControlledSankey,
} from "../viz/Sankey";
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
  sankeySlider: {
    width: 200,
    height: 5,
    paddingTop: 2,
    paddingBottom: 2,
    paddingLeft: 10,
    paddingRight: 5,
    justifyContent: "center",
  },
});

const ErrorSurvey = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(0.5);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dbref = db.ref(props.id);

  const handleSubmit = (e) => {
    e.preventDefault();
    var newSubmissionRef = dbref.push();
    newSubmissionRef.set(value, function (error) {
      if (error) {
        alert(
          `There had been an error ${error}. Please notify the dev at\n
          pnguyen320@gatech.edu, or just ignore me and move on`
        );
      } else {
        props.onSuccessfulSubmit(value);
      }
    });
  };

  return (
    <Card style={{ margin: 10 }}>
      <form name="error-bias-survey-1" onSubmit={handleSubmit}>
        <div className={classes.slider}>
          <Slider
            min={0}
            max={1}
            step={0.05}
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

const ErrorExperiment = (props) => {
  const classes = useStyles();
  const [prevalence, setPrevalence] = React.useState(0.03);
  const [sensitive, setSensitive] = React.useState(0.99);
  const [specific, setSpecific] = React.useState(0.95);
  const handleChangeSensitive = (event, newValue) => {
    setSensitive(newValue);
  };
  const handleChangeSpecific = (event, newValue) => {
    setSpecific(newValue);
  };
  const handleChangePrevalence = (event, newValue) => {
    setPrevalence(newValue);
  };

  return (
    <Grid container>
      <Grid>
        <ControlledSankey
          params={{
            prevalence: prevalence,
            sensitivity: sensitive,
            specificity: specific,
          }}
        />
      </Grid>
      The chance of you having the disease, given that the test is positive{" "}
      {(
        (prevalence * sensitive) /
        (prevalence * sensitive + (1 - prevalence) * (1 - specific))
      ).toFixed(2)}
      <Grid>
        <div className={classes.slider}>
          <Typography variant="body2" gutterBottom>
            How likely is your event? (e.g. how many percent of people have the
            disease)
          </Typography>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={prevalence}
            onChange={handleChangePrevalence}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={classes.slider}>
          <Typography variant="body2" gutterBottom>
            How sensitive is your test? i.e. how likely is it to find True
            Positive
          </Typography>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={sensitive}
            onChange={handleChangeSensitive}
            valueLabelDisplay="auto"
          />
        </div>
        <div className={classes.slider}>
          <Typography variant="body2" gutterBottom>
            How specific is your test? i.e. how likely is it to find True
            Negative
          </Typography>
          <Slider
            min={0}
            max={1}
            step={0.01}
            value={specific}
            onChange={handleChangeSpecific}
            valueLabelDisplay="auto"
          />
        </div>
      </Grid>
    </Grid>
  );
};

export const Lesson3 = (props) => {
  const [currentStep, setCurrentStep] = useState(null);
  const [answer, setAnswer] = useState(null);
  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };
  return (
    <LessonLayout
      backLink="/histogram-distribution"
      backText="Distributions"
      fwdLink="/significance"
      fwdText="Statistical Significance"
    >
      <Typography variant="h2" gutterBottom>
        An introduction to errors
      </Typography>

      <Typography variant="body1" gutterBottom>
        In the effort to curb the pandemic, scientists have created a test to
        detect if a person had been infected. It has an accuracy of 99% which
        does sound impressive!
      </Typography>
      <DumbSankey />
      <Typography variant="body1" gutterBottom>
        But is this enough to combat the pandemic?{" "}
        <em>
          If you tested positive <span>➕</span> for the virus
        </em>
        , what do you think is the chance that you <em>actually</em> have it?
      </Typography>

      <ErrorSurvey
        id="error-survey-1"
        onSuccessfulSubmit={(value) => setAnswer(value)}
      />
      {answer ? (
        <Typography variant="body1" gutterBottom>
          You answered {answer}, which is{" "}
          {answer >= 0.35 && answer <= 0.4
            ? "spot-on."
            : answer > 0.4
            ? "too high."
            : "too low."}
        </Typography>
      ) : (
        ""
      )}
      <Typography variant="body1" gutterBottom>
        For what it's worth, here are some additional information: The error
        rates for <em>falsely</em> giving you a positive <span>➕</span> when
        you <em>don't</em>
        actually have the disease is 5%.
      </Typography>
      <DumbSankeyNeg />
      <Typography variant="body1" gutterBottom>
        And the disease is still fairly rare, with about 3% of the population
        expected to have it. Given these information, would you like to guess
        again? (skip this if you already guessed - or calculated - correctly the
        first time. Smartass.)
      </Typography>
      <ErrorSurvey id="error-survey-reguess" />
      <details>
        <summary style={{ padding: 10 }}>Click to reveal the answer</summary>
        <Typography variant="body1" gutterBottom>
          The actual probability is 0.38
        </Typography>
      </details>

      <Typography variant="body1" gutterBottom>
        Let me repeat: even if you tested positive <span>➕</span> for this new
        disease, using a test that can detect the disease 99% of the time if
        it's there, and is wrongly positive only 5% of the time, you{" "}
        <em>actual</em> chance of having the disease is only slightly over{" "}
        <em>one-third</em>!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Most people overestimate this probability. Let's look at why.
      </Typography>

      <div id="contains-sticky">
        <div className="sticky" style={{ ...chartStyle, top: 0 }}>
          <ErrorSankey currentStep={currentStep} />
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

      <Typography variant="body1" marginTop={500} gutterBottom>
        Hopefully, you have seen now how our intuition can mislead us, and how a
        basic understanding of Statistics can help us clarify things.
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you are designing such a test, maybe you would want to focus on
        reducing the False Positive more so than the False Negative. But maybe
        if you are designing a web advertisement, and you don't care if your ad
        reaches someone who does not want your product, but you <em>really</em>{" "}
        do not want to miss someone who might buy it, then you focus might be
        opposite.
      </Typography>
      <div style={{ marginBottom: 50 }}>
        <ErrorExperiment />
      </div>
      <Typography variant="body1" gutterBottom>
        You will see these error types: True Positive, False Positive, True
        Negative, False Negative in a lot of places, such as in Machine
        Learning. So it is certainly worth knowing them well!
      </Typography>
    </LessonLayout>
  );
};
