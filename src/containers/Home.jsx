import React from "react";
import CanvasContainer from "./CanvasContainer";
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
