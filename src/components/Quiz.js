import React from "react";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { Navbar } from "./Navbar";

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
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  linkButton: {
    textTransform: "none",
  },
});

const Question = (props) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="title" gutterBottom>
          {props.questionContent}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          {props.value ? "Saved ✅" : ""}
        </Typography>
      </CardContent>
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

const SubmitAlert = (props) => {
  return (
    <div>
      <Dialog
        open={props.open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          Survey Submitted {props.error ? "unsuccessfully" : "successfully"}
        </DialogContent>
        <DialogActions>
          <Button onClick={props.handleClose} color="primary">
            Retry
          </Button>
          <Button
            component={Link}
            to={props.fwdLink}
            variant="contained"
            color="primary"
            autoFocus
          >
            {props.fwdText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
class Quiz extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      alertOpen: false,
      answers: this.props.questions.map((q) => ({ ...q, value: null })),
    };
  }

  handleClick = (qid, value) => {
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
  };

  handleSuccess = () => this.setState({ submitted: false, alertOpen: true });
  handleFail = () => this.setState({ submitted: true, alertOpen: true });

  handleSubmit = () => {
    var dbref = this.props.dbref;
    var newSubmissionRef = dbref.push();
    newSubmissionRef.set(this.state.answers, (error) => {
      if (error) {
        alert(
          `There had been an error ${error}. Consider contacting pnguyen320@gatech.edu`
        );
        this.handleFail();
      } else {
        this.handleSuccess();
      }
    });
  };

  handleCloseAlert = () => {
    this.setState({ alertOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <Navbar />
        <div className={classes.layout}>
          {this.state.answers.map((q) => {
            return <Question {...q} onClick={this.handleClick} />;
          })}
          <Card className={classes.controls}>
            <CardActions>
              <Button
                variant="contained"
                color="default"
                size="large"
                className={classes.button}
                startIcon={<CloudUploadIcon />}
                onClick={() => this.handleSubmit()}
              >
                Submit
              </Button>
            </CardActions>
          </Card>
        </div>
        <SubmitAlert
          open={this.state.alertOpen}
          handleClose={this.handleCloseAlert}
          fwdLink={this.props.fwdLink}
          fwdText={this.props.fwdText}
        />
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Quiz);
