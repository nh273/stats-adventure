import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
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
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

const Question = (props) => {
  const classes = useStyles();
  return (
    <Card>
      <CardContent>{props.questionContent}</CardContent>
      <CardActions>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {props.questionChoices.map((choice) => {
            return <Button>{choice}</Button>;
          })}
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export const Quiz = (props) => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.layout}>
        {props.questions.map((q) => {
          return (
            <Question
              questionContent={q.questionContent}
              questionChoices={q.questionChoices}
            />
          );
        })}
      </div>
    </React.Fragment>
  );
};
