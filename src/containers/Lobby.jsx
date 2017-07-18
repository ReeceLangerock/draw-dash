import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getRooms,
  sendAuthorizationCheck,
  updateRooms,
  addUserToRoom
} from "./../actions/actions";
// const io = require("socket.io-client");
// const socket = io();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.props.socket.on("room_update", payload => {
      console.log("room update", payload);
      this.props.updateRooms(payload);
    });
  }
  //
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.sendAuthorizationCheck();
    }
    this.props.getRooms();
  }

  componentDidMount() {}

  handleRoomSelection(id, joinAs) {
    // emit to backend if user joins a room
    var that = this;
    this.props.socket.emit(
      "join",
      { roomId: id, user: this.props.user, joiningAs: joinAs },
      function(canvasSeatNumber) {
        that.props.addUserToRoom(id, that.props.user, canvasSeatNumber);
        that.props.changePage(`room/${id}`);
      }
    );
    //dispatch actions to add user to room and redirect to selected room
  }

  render() {
    var rooms = this.props.rooms; //shorten the name

    if (rooms) {
      var that = this;
      var renderRoomButtons = Object.keys(rooms).map(function(
        keyName,
        keyIndex
      ) {
        var spotsOpen =
          rooms[keyName].max - rooms[keyName].occupants.drawers.length;
        var buttonClass, disabled;
        switch (spotsOpen) {
          case 1:
            buttonClass = "button warning";
            break;
          case 0:
            buttonClass = "button disabled";
            disabled = true;
            break;
          default:
            buttonClass = "button primary";
        }
        // if(this.props.user.isGuest) {
        //   disabled = true;
        // }

        var spotsOpenText = spotsOpen !== 0
          ? `${spotsOpen} Canvas open`
          : "All canvas taken";

        return (
          <div key={keyName} className="room-item">
            <h1>{rooms[keyName].roomName}</h1>
            <p>
              {spotsOpenText}
            </p>
            <div className="room-item-button-container">
              <button
                className={buttonClass}
                onClick={() => that.handleRoomSelection(keyName, "drawer")}
                disabled={disabled}
              >
                Join
              </button>
              <button
                className="button primary"
                onClick={() => that.handleRoomSelection(keyName, "watcher")}
              >
                Watch
              </button>
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        <Navigation />
        <h1 className="page-title">Welcome {this.props.user.displayName}!</h1>

        <div className="row">
          <div className="columns small-centered small-12 medium-12 large-10">
            <h2>Select a room to join</h2>
            <div className="room-container">

              {renderRoomButtons}
            </div>
          </div>
        </div>

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
      updateRooms,
      changePage: room => push(room)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);
