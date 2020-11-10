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
        <Navbar />
        <Grid container className={classes.mainGrid}>
          <Grid item xs={12} md={8}>
            <Paper elevation={1} className={classes.markdown}>
              <div>
                If you think that Statistics is not necessary to your life, then
                you have been mistaken. Statistics is the foundation for natural
                science, social science, and engineering. Without it, modern
                society as we know would not exist. But even if you do not work
                in science and engineering, Statistics is increasingly governing
                our daily lives.
              </div>
            </Paper>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Home);
