import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRooms, sendAuthorizationCheck, updateRooms, addUserToRoom } from "./../actions/actions";
// const io = require("socket.io-client");
// const socket = io();

class Lobby extends React.Component {
  constructor(props) {
    super(props);
    this.renderRoomButtons = this.renderRoomButtons.bind(this);
    //receive list of rooms
    this.props.socket.on("room_update", rooms => {
      this.props.updateRooms(rooms);
    });
  }
  //
  componentWillMount() {
    if (!this.props.isAuthenticated) {
      this.props.sendAuthorizationCheck();
    }
    this.props.getRooms();
  }

  handleRoomSelection(id, joinAs) {
    // emit to backend if user joins a room
    this.props.socket.emit("join", { roomId: id, user: this.props.user, joiningAs: joinAs }, canvasSeatNumber => {
      //dispatch actions to add user to room and redirect to selected room
      this.props.addUserToRoom(id, this.props.user, canvasSeatNumber);
      this.props.changePage(`room/${id}`);
    });
  }

  renderRoomButtons() {
    var rooms = this.props.rooms; //shorten the name

    if (rooms) {
      var that = this;
      return Object.keys(rooms).map(function(keyName, keyIndex) {
        var spotsOpen = rooms[keyName].max - rooms[keyName].occupants.drawers.length;
        var roomName = rooms[keyName].roomName;
        var buttonClass, disabled;
        //conditionally display button based on room avaiability
        switch (spotsOpen) {
          case 1:
            buttonClass = "button warning button-item";
            break;
          case 0:
            buttonClass = "button disabled button-item";
            disabled = true;
            break;
          default:
            buttonClass = "button primary button-item";
        }
        //disable join button is user is guest
        if (that.props.user.isGuest) {
          disabled = true;
        }
        var spotsOpenText = spotsOpen !== 0 ? `${spotsOpen} Canvas open` : "All canvas taken";
        // render available rooms
        return (
          <div key={keyName} className="room-item">
            <div className="room-image">
              <img src={require(`./../assets/room-images/${roomName}.jpg`)} />

              <p>
                {spotsOpenText}
              </p>
            </div>
            <div className="room-item-button-container">

              <button className={buttonClass} onClick={() => that.handleRoomSelection(keyName, "drawer")} disabled={disabled}>
                Join
              </button>

              <button className="button primary button-item" onClick={() => that.handleRoomSelection(keyName, "watcher")}>
                Watch
              </button>

            </div>
          </div>
        );
      });
    }
  }

  render() {
    return (
      <div>
        <Navigation />

        <div className="row">
          <div className="columns small-centered small-12 medium-12 large-10">
            <div className="lobby-container">
              <div className="page-title">
                <h1 className="columns small-centered small-12 medium-11 large-10">Room Select</h1>

              </div>

              <div className="room-selection-container">

                {this.renderRoomButtons()}
              </div>
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
