import React from "react";
import { Route, HashRouter, Switch } from "react-router-dom";
import Home from "./components/Home";
import { Lesson1 } from "./components/Lesson1";
import { Lesson2 } from "./components/Lesson2";
import { Lesson3 } from "./components/Lesson3";
import { Lesson4 } from "./components/Lesson4";
import EntryQuiz from "./components/EntryQuiz";
import ExitQuiz from "./components/ExitQuiz";
import ScrollToTop from "./components/ScrollToTop";

export default (props) => (
  <HashRouter>
    <ScrollToTop />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/entry-quiz" component={EntryQuiz} />
      <Route exact path="/exit-quiz" component={ExitQuiz} />
      <Route exact path="/descriptive-stats" component={Lesson1} />
      <Route exact path="/histogram-distribution" component={Lesson2} />
      <Route exact path="/error-bias" component={Lesson3} />
      <Route exact path="/significance" component={Lesson4} />
    </Switch>
  </HashRouter>
);
