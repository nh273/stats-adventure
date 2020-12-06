import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Navbar } from "./Navbar";
import { withStyles } from "@material-ui/core/styles";
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
  },
  controls: {
    display: "flex",
    alignContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(2),
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
          <Grid item xs={12} md={8}>
            <Paper elevation={1} className={classes.markdown}>
              {props.children}
            </Paper>

            <Card className={classes.controls}>
              {props.backLink ? (
                <Button
                  component={Link}
                  to={props.backLink}
                  variant="contained"
                >
                  <Typography variant="body1">{props.backText}</Typography>
                </Button>
              ) : (
                ""
              )}

              <Grid container justify="flex-end">
                {props.fwdLink ? (
                  <Button
                    component={Link}
                    to={props.fwdLink}
                    variant="contained"
                  >
                    <Typography variant="body1">{props.fwdText}</Typography>
                  </Button>
                ) : (
                  ""
                )}
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
};

export default withStyles(styles)(LessonLayout);
