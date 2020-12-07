import React, { useState } from "react";
import Typography from "@material-ui/core/Typography";
import { Scrollama, Step } from "react-scrollama";

import LessonLayout from "./Lessons";
import { StackedBar } from "../viz/StackedBar";
import Sig from "../viz/Significance";
import { stepStyle, chartStyle, StepContent } from "./Steps";

export const Lesson4 = (props) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [currentProgress, setCurrentProgress] = useState(null);
  const onStepEnter = ({ data }) => {
    setCurrentStep(data);
  };
  return (
    <LessonLayout
      backLink="/error-bias"
      backText="Introduction to Errors"
      fwdLink="/exit-quiz"
      fwdText="Optional Exit Survey"
    >
      <Typography variant="h2" gutterBottom>
        What is "statistically significant" anyway?
      </Typography>
      <Typography variant="body1" gutterBottom>
        The end is in sight! Scientists have found a treatment for the pandemic.
      </Typography>
      <Typography variant="body1" gutterBottom>
        But how do you know if the treatment really works against the disease?
      </Typography>
      <div className="contains-sticky">
        <div className="sticky" style={{ ...chartStyle, top: 200 }}>
          <StackedBar currentStep={currentStep} />
        </div>
        <Scrollama onStepEnter={onStepEnter} offset={0.6}>
          <Step data={1}>
            <div className="step" style={stepStyle}>
              <StepContent>
                You may think it's simple: let's give this treatment to some
                people, and see if they recover.
              </StepContent>
            </div>
          </Step>

          <Step data={2}>
            <div className="step" style={stepStyle}>
              <StepContent>
                The good news is 80% of people recovered. But of course, it's
                not so simple.
              </StepContent>
            </div>
          </Step>

          <Step data={2.5}>
            <div className="step" style={stepStyle}>
              <StepContent>
                How do you know if those people recovered thanks to your
                treatment? What if 80% of people would recover anyway, with or
                without the treatment?
              </StepContent>
            </div>
          </Step>

          <Step data={3}>
            <div className="step" style={stepStyle}>
              <StepContent>
                Well, then let's go and measure in a hospital. Some doctors have
                been using this treatment on patients as soon as it was deemed
                safe. But you are disheartened to see that people given this
                treatment actually do <em>worse</em> than people not treated.
              </StepContent>
            </div>
          </Step>

          <Step data={4}>
            <div className="step" style={stepStyle}>
              <StepContent>
                But this is due to bad Statistics, not your treatment! The only
                patients treated with this new, experimental treatment were
                those with severe illness. It makes sense that they have worse
                mortality. This is called <em>"selection bias"</em>.
              </StepContent>
            </div>
          </Step>

          <Step data={5}>
            <div className="step" style={stepStyle}>
              <StepContent>
                So the only right way to do this is to randomly, ahead of time,
                pick some patients to get the new treatment, and some patients
                to get a harmless but ineffective "fake" treatment called
                "placebo". We have to do the placebo thing because there is a
                lot of evidence that merely <em>thinking</em> they are getting
                treated makes people become healthier. Somehow.
              </StepContent>
            </div>
          </Step>

          <Step data={6}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 500 }}>
                The doctors directly giving the treatment also cannot know who
                gets treated and who gets placebo. Otherwise they can
                inadvertently affect results, such as giving more care to people
                receive placebo out of compassion. This is called{" "}
                <em>"double-blinded"</em>, i.e. both patients and doctors are
                "blind" to whom is getting real treatment.
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>
      <Typography variant="body1" gutterBottom>
        This process, the <em>randomized controlled trials</em> or RCT, is how
        drugs and vaccines are actually tested in the real world. "Controlled"
        refers to the people receiving placebo, also known as the "control".
      </Typography>
      <Typography variant="body1" gutterBottom>
        As you can see, Statistics is not just about Maths and formulas. A lot
        of it is avoiding biases and designing good experiments that will not
        fool us.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Finally, there is one more piece to the puzzle.
      </Typography>
      <div className="contains-sticky">
        <div className="sticky" style={{ ...chartStyle, top: 200 }}>
          <Sig dataStep={currentStep} stepProgress={currentProgress} />
        </div>
        <Scrollama
          onStepEnter={onStepEnter}
          onStepProgress={({ progress }) => setCurrentProgress(progress)}
          offset={0.3}
          progress
        >
          <Step data={7}>
            <div className="step" style={stepStyle}>
              <StepContent>
                Even if the treatment does not work at all, we can still expect
                to see some differences in mortality, due to random variations.
              </StepContent>
            </div>
          </Step>
          <Step data={8}>
            <div className="step" style={stepStyle}>
              <StepContent style={{ marginBottom: 300 }}>
                We need to have enough people in the trials, and hopefully see a
                difference <em>so extreme</em> that it can rarely happens{" "}
                <em>only</em> due to this random variation. Exactly{" "}
                <em>how rare</em> is our p-value, or "statistical significance
                level".
              </StepContent>
              <StepContent style={{ marginBottom: 300 }}>
                When we set p &lt; 0.05, essentially we are saying: If results
                this extreme (e.g. the difference in mortality) only happen 5%
                of the time due to random chance, then we are comfortable saying
                that there is a "real" effect (e.g. the treatment) influencing
                this result.
              </StepContent>
            </div>
          </Step>
        </Scrollama>
      </div>
      <Typography variant="body1" gutterBottom>
        p &lt; 0.05 is a somewhat arbitrary threshold. For some disciplines, p
        &lt; 0.01 is the convention. High energy physics can even see p &lt;
        0.0000001! Exactly how p is computed is also a vast and complicated
        topic.
      </Typography>
      <Typography variant="body1" gutterBottom>
        If you have one takeaway, it should be that p-value is not the only
        measure of "good results" in science. As we have seen above, the details
        of the experiment matter. p-value gives us an idea of how unlikely our
        result is, nothing more and nothing less, and is only{" "}
        <em>meaningful</em> when the experiment is well-designed.
      </Typography>
      <Typography variant="body1" gutterBottom>
        But alas, let's allow our hypothetical world to have performed a
        well-designed, well-run randomize controlled trial. The new treatment
        has been proven effective in reducing mortality (p=0.002), and the end
        of the pandemic is in sight. I hope you have enjoyed this brief
        adventure in Statistics, and hope to see you again soon on a new
        adventure!
      </Typography>
    </LessonLayout>
  );
};
