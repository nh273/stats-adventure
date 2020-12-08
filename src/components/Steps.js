import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

export const stepStyle = {
  position: "relative",
  zIndex: 5,
  paddingBottom: 300,
  opacity: 0.9,
};
export const chartStyle = { position: "sticky", top: "30%", zIndex: 1 };

export const StepContent = (props) => {
  return (
    <Card {...props}>
      <CardContent>
        <Typography variant="body1" gutterBottom>
          {props.children}
        </Typography>
      </CardContent>
    </Card>
  );
};
