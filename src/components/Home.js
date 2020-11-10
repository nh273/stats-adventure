import React, { Component } from "react";
import { Navbar } from "./Navbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1500 + theme.spacing(3 * 2))]: {
      width: 1500,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  markdown: {
    padding: `${theme.spacing(3)}px`,
  },
});
class Home extends Component {
  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <Navbar />{" "}
        <div className={classes.layout}>
          <Grid container className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Paper elevation={1} className={classes.markdown}>
                <Typography variant="body1" gutterBottom>
                  If you think that Statistics is not necessary to your life,
                  then you have been mistaken. Of course, Statistics is the
                  foundation for natural science, social science, and
                  engineering. Without it, modern society as we know would not
                  exist. But even if you do not work in science and engineering,
                  Statistics is increasingly controlling our daily lives.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  We evolved to coexist in small groups of around a hundred
                  people. Can you imagine in your head a million people, let
                  alone a billion, or seven? And can your - or anyone's - mind
                  fathom the diverse behaviors of the multitude of people in
                  your average large corporation, city, or country?
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Even if you are not aware of it, your boss and your
                  politicians are using Statistics to justify decisions that
                  will directly or indirectly affect your life. Believing in
                  climate change, increasing or reducing taxes, hiring or firing
                  people..., all of these have Statistics playing a part. That
                  is simply an inevitable fact in today's society, whose scale
                  has long grown beyond our intuition's grasp.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Thus it is extremely important that you, too, understand
                  Statistics. At least you need to understand it enough to not
                  be intimidated by it. I believe that Statistics is difficult
                  but not incomprehensible to the majority of people. This guide
                  will take you through some of the most basic concepts in
                  Statistics. There will be no Maths, and the goal is just for
                  you to understand these concepts when you come across them in
                  an argument.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Let's begin!
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
