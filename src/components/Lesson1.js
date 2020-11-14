import React from "react";
import LazyLoad from "react-lazyload";
import LessonLayout from "./Lessons";
import Normal from "../viz/Normal";
import { MapChart } from "../viz/WorldMap";
import Boxplot from "../viz/Boxplot";
import growth from "../assets/images/growth.PNG";
import Typography from "@material-ui/core/Typography";

export const Lesson1 = (props) => {
  return (
    <LessonLayout>
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
      <Typography variant="body1" gutterBottom>
        This type of plot is extremely common in science, but not many people
        can read it. Usually, the data points are not there, but I have overlaid
        them so we can relate the plot to the data better. First, each data
        point from the map is arranged on the horizontal axis. I have randomly
        nudged them up and down just a bit to see the nearly-overlapping points
        better.
      </Typography>
      <div className="box-plot-area">
        <Boxplot />
      </div>
      <Typography variant="body1" gutterBottom>
        The red line is the "median", which is simply the middle one among all
        the values. This gives us an idea about the "average" hospitalization
        rates. The dotted orange line is the "mean", which might be the kind of
        "average" that you are familiar with: summing all values together then
        dividing by the number of values. Here we can see the mean is higher
        than the median. This is because of the presence of an "outlier" of
        extremely high value on the right, pulling the mean higher. The median
        is merely determined by rank, so it is not affected by how far this
        outlier is from the rest of the data.
      </Typography>
      <Typography variant="body1" gutterBottom>
        Already you might see how carefully selected Statistics can be used to
        construct a narrative with the same data. Say we want the average Income
        of people in a country, which tend to have many high outliers (some
        people make a lot of money). You might be tempted to use the mean rather
        than the median, if you want to make the "average" income appears
        higher.
      </Typography>
      <Typography variant="body1" gutterBottom>
        The blue box is the Interquartile Range (IQR): the middle 50% of the
        data is in this box. The top and bottom 25% are outside. The whiskers
        start from either ends of the box, and have length equal to 1.5 of the
        IQR. Data points outside the whiskers are generally considered
        "outliers" by convention.
      </Typography>
      <Normal data={[1, 3, 4, 5]} size={[50, 50]} />
      Then some more random text here
    </LessonLayout>
  );
};
