import React from "react";
import { Scrollama, Step } from 'react-scrollama';
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";
import Exponential from "../viz/Exponential";
import Typography from "@material-ui/core/Typography";

export const Lesson2 = (props) => {
  const onStepEnter = ({data}) => {
    console.log(data)
  }
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
      <div className="sticky" style={{ position: 'sticky', top: 200}}>
      <Normal />
      </div>

      <Scrollama onStepEnter={onStepEnter} debug>
      <Step key='1' data={1}>
      <div className="step">
      <Typography variant="body1" gutterBottom>
        A distribution is simply a way to describe a certain shape of data. You
        might remember the <em>Normal Distribution</em>, or the bell-curve. If
        the data "follows a normal distribution", it simply means that it has
        this shape. The shape tells us that a lot of the data will be around the
        middle, and much fewer data points will be at either extremes. Of course
        it's not quite as simple as that, since there are other distributions
        that look kinda similar but have slightly different specific features.
        But we can simplify things that way for now.
      </Typography>
      </div>
      </Step>

      <Step key='2' data={2}>
      <div className="step">
      <Typography variant="body1" gutterBottom>
        As you can see, there a 2 additional things that can affect how a normal
        distribution looks: where its mean is, and how spread out is the data.
        These, we call "parameters".
      </Typography>
      <Typography variant="body1" gutterBottom>
        So now, much like when we described 20 data points with the average and
        the spread before, we can describe these 2000 points with just 3 things:
        the name "normal distribution", which tells you the shape; the mean
        parameter, which is the average; and the standard deviation, which tells
        you the spread.
      </Typography>
      </div>
      </Step>
      </Scrollama>
      </div>

      <div id="part-2">

      <div className="sticky" style={{ position: 'sticky', top: 200}}>
      <Exponential />
      </div>

      <Scrollama onStepEnter={onStepEnter} debug>
      <Step key='1' data={1}>
      <div className="step">
      <Typography variant="body1" gutterBottom>
        A distribution is simply a way to describe a certain shape of data. You
        might remember the <em>Normal Distribution</em>, or the bell-curve. If
        the data "follows a normal distribution", it simply means that it has
        this shape. The shape tells us that a lot of the data will be around the
        middle, and much fewer data points will be at either extremes. Of course
        it's not quite as simple as that, since there are other distributions
        that look kinda similar but have slightly different specific features.
        But we can simplify things that way for now.
      </Typography>
      </div>
      </Step>

      <Step key='2' data={2}>
      <div className="step">
      <Typography variant="body1" gutterBottom>
        As you can see, there a 2 additional things that can affect how a normal
        distribution looks: where its mean is, and how spread out is the data.
        These, we call "parameters".
      </Typography>
      <Typography variant="body1" gutterBottom>
        So now, much like when we described 20 data points with the average and
        the spread before, we can describe these 2000 points with just 3 things:
        the name "normal distribution", which tells you the shape; the mean
        parameter, which is the average; and the standard deviation, which tells
        you the spread.
      </Typography>
      </div>
      </Step>
      </Scrollama>
      </div>
    </LessonLayout>
  );
};
