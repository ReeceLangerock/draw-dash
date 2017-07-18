import React from "react";
import Navigation from "./Navigation";
import Canvas from "./Canvas";
import Chat from "./Chat";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getRooms } from "./../actions/actions";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.emitOnUnload = this.emitOnUnload.bind(this);
    this.props.socket.on("user_join", payload => {
      console.log(payload.displayName + " joined");
    });
  }

  handleUserLeavingPage(ev) {
    ev.preventDefault();
    return (ev.returnValue = "Are you sure you want to close?");
  }

  emitOnUnload(ev) {
    ev.preventDefault();

    this.props.socket.emit(
      "leave_room",
      { roomId: this.props.roomId, user: this.props.user },
      function(data) {}
    );
  }

  componentWillMount() {
    this.props.socket.emit(
      "join_room",
      { roomId: this.props.roomId, user: this.props.user },
      function(data) {

      }
    );
    //  this.props.getRooms();
    //if (!this.props.isAuthenticated) {
    //    this.props.sendAuthorizationCheck();
    //  }
  }

  componentDidMount() {
    window.addEventListener("unload", this.emitOnUnload);

    window.addEventListener("beforeunload", this.handleUserLeavingPage);
  }

  componentWillUnmount() {
    //this needs some work, page redirects regardless of confirm result
    //confirm("you sure?");
    this.props.socket.emit(
      "leave_room",
      { roomId: this.props.roomId, user: this.props.user },
      function(data) {}
    );
    window.removeEventListener("beforeunload", this.handleUserLeavingPage);
  }

  // handleRoomSelection(id) {
  //   // emit to backend if user joins a room
  //   socket.emit("join", { roomId: id, user: this.props.user }, function(
  //     data
  //   ) {});
  //   //dispatch actions to add user to room and redirect to selected room
  //   this.props.addUserToRoom(id, this.props.user);
  //   this.props.changePage(`room${id}`);
  // }

  render() {
    return (
      <div>
        <Navigation />
        <h1 className="page-title">{this.props.rooms[this.props.roomId].roomName} Room</h1>
        <div className="row">
          <div className="columns small-centered small-12 medium-10 large-8">

            <h1>Timer Placeholder</h1>
            <h1>Viewers: {this.props.rooms[this.props.roomId].occupants.watchers.length}</h1>
            <div className="canvas-items-container">

              <Canvas canvasNumber = "1" socket = {this.props.socket}/>
              <Canvas canvasNumber = "2" socket = {this.props.socket}/>
            </div>
            <Chat socket = {this.props.socket}/>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom,
  rooms: state.roomReducer.rooms
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getRooms,
      changePage: room => push(room)
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Room);
