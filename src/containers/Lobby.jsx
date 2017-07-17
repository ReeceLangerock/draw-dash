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
    this.props.socket.on('room_update', (payload) => {
      console.log('room update', payload)
       this.props.updateRooms(payload)
    });

  }
  //
  componentWillMount() {

    if (!this.props.isAuthenticated) {
      this.props.sendAuthorizationCheck();
    }
    this.props.getRooms();
  }

  componentDidMount() {

  }

  handleRoomSelection(id, joinAs) {
    // emit to backend if user joins a room
    this.props.socket.emit(
      "join",
      { roomId: id, user: this.props.user, joiningAs: joinAs },
      function(data) {}
    );
    //dispatch actions to add user to room and redirect to selected room
    this.props.addUserToRoom(id, this.props.user);
    this.props.changePage(`room/${id}`);

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
            <div key={keyName} className = "room-item">
              <h1>{rooms[keyName].roomName}</h1>
              <p>The room is full</p>
              <button
                className="button"
                onClick={() => that.handleRoomSelection(keyName, 'watcher')}
              >
                Watch
              </button>
            </div>
          );
        } else {
          //if room is NOT full, render option to join -- NEED TO ADD OPTION TO ENTER AS WATCHER
          return (
            <div key={keyName} className = "room-item">
              <h1>{rooms[keyName].roomName}</h1>
              <p>
                {rooms[keyName].max - rooms[keyName].occupants.drawers.length}
                {" "}
                Canvas Open
              </p>
              <div className = 'room-item-button-container'>
              <button
                className="button"
                onClick={() => that.handleRoomSelection(keyName, "drawer")}
              >
                Join
              </button>
              <button
                className="button"
                onClick={() => that.handleRoomSelection(keyName, 'watcher')}
              >
                Watch
              </button>
            </div>
            </div>
          );
        }
      });
    }

    return (
      <div>
        <Navigation />
        <h1 className="page-title">Welcome {this.props.user.displayName}!</h1>

        <div className="row">
          <div className="columns small-centered small-12 medium-12 large-10">
<h2>Select a room to join</h2>
        <div className = "room-container">

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
