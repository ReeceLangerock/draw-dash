import React from "react";
import { withRouter } from 'react-router-dom';
import LandingPage from "./LandingPage";
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const io = require("socket.io-client");
const socket = io();
import store from "./../store/store.js";
import { push } from "react-router-redux";

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: []
    };
  }

  componentDidMount() {
  console.log(this.props)
    fetch("/api/lobby", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        this.setState({
          rooms: response
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
  handleRoomSelection(id) {
    var that = this;
    socket.emit("join", { roomId: id }, function(data) {
      that.setState({
        rooms: data
      });

    });
    store.dispatch(push(`room${id}`));
  }

  render() {
    var { rooms, test } = this.state;
    if (rooms) {
      var that = this;
      var renderRoomButtons = Object.keys(rooms).map(function(
        keyName,
        keyIndex
      ) {
        if (rooms[keyName].max - rooms[keyName].occupants === 0) {
          return (
            <div key={keyName}>
              <h1>{rooms[keyName].roomName}</h1>
              <p>The room is full</p>
            </div>
          );
        } else {
          return (

            <div key={keyName}>
              <h1>{rooms[keyName].roomName}</h1>
              <p>{rooms[keyName].max - rooms[keyName].occupants} Canvas Open</p>
              <button
                className="button"
                onClick={() => that.handleRoomSelection(keyName)}
              >
                Join
              </button>
            </div>
          );
        }
      });
    }

    return (
      <div>
        <Navigation/>
        Lobby
        <h1>Welcome {this.user.user}</h1>
        <h1>Join A Room!</h1>

        {renderRoomButtons}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated
  ,user: state.authReducer.user,
})

const mapDispatchToProps = dispatch => bindActionCreators({

}, dispatch)



export default connect (
  mapStateToProps,
  mapDispatchToProps
)(Lobby)
