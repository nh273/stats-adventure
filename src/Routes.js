import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import Lesson1 from "./components/Lesson1";

export default (props) => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/lesson1" component={Lesson1} />
    </Switch>
  </HashRouter>
);
