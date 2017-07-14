import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getRooms,
  sendAuthorizationCheck,
  addUserToRoom
} from "./../actions/actions";
const io = require("socket.io-client");
const socket = io();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
  }
  //
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.sendAuthorizationCheck();
    }
    this.props.getRooms();
  }

  componentDidMount() {}

  handleRoomSelection(id) {
    // emit to backend if user joins a room
    socket.emit(
      "join",
      { roomId: id, user: this.props.user.slackUID },
      function(data) {}
    );
    //dispatch actions to add user to room and redirect to selected room
    this.props.addUserToRoom(id, this.props.user);
    this.props.changePage(`room${id}`);

  }

  render() {
    var rooms = this.props.rooms; //shorten the name

    if (rooms) {
      var that = this;
      var renderRoomButtons = Object.keys(rooms).map(function(
        keyName,
        keyIndex
      ) {
        //if room is full, render that -- NEED TO ADD OPTION TO ENTER AS WATCHER
        if (rooms[keyName].max - rooms[keyName].occupants.drawers.length ===  0  ) {
          return (
            <div key={keyName}>
              <h1>{rooms[keyName].roomName}</h1>
              <p>The room is full</p>
            </div>
          );
        } else {
          //if room is NOT full, render option to join -- NEED TO ADD OPTION TO ENTER AS WATCHER
          return (
            <div key={keyName}>
              <h1>{rooms[keyName].roomName}</h1>
              <p>
                {rooms[keyName].max - rooms[keyName].occupants.drawers.length}
                {" "}
                Canvas Open
              </p>
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
        <Navigation />
        <h1>Welcome {this.props.user.displayName}</h1>
        <h1>Join A Room!</h1>
        {renderRoomButtons}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  rooms: state.roomReducer.rooms
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRooms,
      sendAuthorizationCheck,
      addUserToRoom,
      changePage: room => push(room)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
