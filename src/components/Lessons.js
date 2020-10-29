import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Navbar } from "./Navbar";

const styles = (theme) => ({
  layout: {
    width: "auto",
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    [theme.breakpoints.up(1100 + theme.spacing(3 * 2))]: {
      width: 1100,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  markdown: {
    padding: `${theme.spacing(3)}px 0`,
  },
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(3),
    padding: `${theme.spacing(3)}px 0`,
  },
});

const LessonLayout = (props) => {
  const { classes } = props;
  return (
    <React.Fragment>
      <CssBaseline />
      <Navbar />
      <div className={classes.layout}>
        <Grid container className={classes.mainGrid}>
          <Grid item xs={12} md={8} className={classes.markdown}>
            <Paper elevation={1}>{props.children}</Paper>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(LessonLayout);
