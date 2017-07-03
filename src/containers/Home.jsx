import React from "react";
import Canvas from "./Canvas";
import About from "./About";

import Navigation from "./Navigation";
import Lobby from "./Lobby";

class Home extends React.Component {
  render() {
    return (
      <div>
        <Navigation />
        <Lobby />
        HOME

      </div>
    );
  }
}

export default Home;
