import React, { Component } from "react";
import { Navbar } from "./Navbar";

class Home extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <div>Hello World</div>
      </React.Fragment>
    );
  }
}

export default Home;
