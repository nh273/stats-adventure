import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

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
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& > *": {
      margin: theme.spacing(1),
    },
  },
});

const Question = (props) => {
  return (
    <Card>
      <CardContent>{props.questionContent}</CardContent>
      <CardActions>
        <ButtonGroup color="primary" aria-label="outlined primary button group">
          {props.questionChoices.map((choice) => {
            return (
              <Button onClick={(e) => props.onClick(props.qid, choice)}>
                {choice}
              </Button>
            );
          })}
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      answers: this.props.questions.map((q) => ({ qid: q.qid, value: null })),
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(qid, value) {
    this.setState((state) => {
      return {
        answers: state.answers.map((q) => {
          if (q.qid === qid) {
            return { ...q, value: value };
          }
          return q;
        }),
      };
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className={classes.layout}>
          {this.props.questions.map((q) => {
            return <Question {...q} onClick={this.handleClick} />;
          })}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Quiz);
