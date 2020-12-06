import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Navbar } from "./Navbar";
import { Link } from "react-router-dom";

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
    lineHeight: "150%",
  },
  button: {
    margin: theme.spacing(1),
    textTransform: "none",
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
                <Typography variant="h6">
                  Your boss and your politicians are using Statistics to justify
                  decisions that will directly or indirectly affect your life.
                </Typography>
                <Typography variant="body1" gutterBottom>
                  Believing in climate change, increasing or reducing taxes,
                  hiring or firing people..., all of these have Statistics
                  playing a part. That is simply an inevitable fact in today's
                  society.
                </Typography>
                <Typography variant="h6">
                  Thus it is extremely important that you, too, understand
                  Statistics
                </Typography>
                <Typography variant="body1" gutterBottom>
                  At least enough to not be intimidated by it. We are going on
                  an adventure, using some basic concepts in Statistics to
                  overcome a real-world challenge. There will be no Maths, and
                  the goal is for you to recognize these concepts when you come
                  across them in an argument.
                </Typography>
                <Button
                  component={Link}
                  to="/entry-quiz"
                  variant="contained"
                  className={classes.button}
                  color="primary"
                  autoFocus
                >
                  <Typography variant="body1">
                    Begin with an optional survey
                  </Typography>
                </Button>
                <Button
                  component={Link}
                  to="/descriptive-stats"
                  variant="contained"
                  className={classes.button}
                >
                  <Typography variant="body1">
                    Begin with the first adventure!
                  </Typography>
                </Button>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
