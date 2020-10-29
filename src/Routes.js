import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import { Lesson1 } from "./components/Lesson1";
import { Lesson2 } from "./components/Lesson2";
import { Lesson3 } from "./components/Lesson3";

export default (props) => (
  <HashRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/lesson-1" component={Lesson1} />
      <Route exact path="/lesson-2" component={Lesson2} />
      <Route exact path="/lesson-3" component={Lesson3} />
    </Switch>
  </HashRouter>
);
