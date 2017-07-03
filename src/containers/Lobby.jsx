import React from "react";
import Canvas from "./Canvas";
import About from "./About";
import LandingPage from "./LandingPage";
import Navigation from "./Navigation";
const io = require("socket.io-client");
const socket = io();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
    fetch("/api/lobby", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        console.log(response);
        this.setState({
          rooms: response
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    var { rooms, test } = this.state;
    var roomRender;
    if (rooms && rooms.length > 0) {
      roomRender = rooms.map(room => (
        <div>

        <button className="button">{room.roomName}</button>
      </div>
      ));
    }
    return (
      <div>

        Lobby
        <h1>Join A Room!</h1>
        {roomRender}

      </div>
    );
  }
}

export default Lobby;
