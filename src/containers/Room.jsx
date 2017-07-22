import React from "react";
import Navigation from "./Navigation";
import CanvasContainer from "./CanvasContainer";
import Chat from "./Chat";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.emitOnUnload = this.emitOnUnload.bind(this);
    // this.props.socket.on("user_join", payload => {
    //   console.log(payload.displayName + " joined");
    // });
  }

  handleUserLeavingPage(ev) {
    ev.preventDefault();
    return (ev.returnValue = "Are you sure you want to close?");
  }  

  emitOnUnload(ev) {
    ev.preventDefault();
    this.props.socket.emit("leave_room", { roomId: this.props.roomId, user: this.props.user }, function(data) {});
  }

  componentWillMount() {
    this.props.socket.emit("join_room", { roomId: this.props.roomId, user: this.props.user }, function(data) {});
  }

  componentDidMount() {
    window.addEventListener("unload", this.emitOnUnload);

    window.addEventListener("beforeunload", this.handleUserLeavingPage);
  }

  componentWillUnmount() {
    //this needs some work, page redirects regardless of confirm result
    //confirm("you sure?");
    this.props.socket.emit("leave_room", { roomId: this.props.roomId, user: this.props.user }, function(data) {});
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
        <div className="clearfix">
          <p className="float-right">Viewers: {this.props.rooms[this.props.roomId].occupants.watchers.length}</p>
        </div>
        <h1 className="page-title">{this.props.rooms[this.props.roomId].roomName} Room</h1>
        <div className="row">
          <div className="columns small-centered small-12 medium-10 large-8">

            <h1>Timer Placeholder</h1>

            <h5>Image Prompt: {this.props.imagePrompt}</h5>

            <div className="canvas-items-container">

              <CanvasContainer canvasNumber="1" socket={this.props.socket} />
              <CanvasContainer canvasNumber="2" socket={this.props.socket} />
            </div>
            <Chat socket={this.props.socket} />
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
  rooms: state.roomReducer.rooms,
  imagePrompt: state.imageReducer.prompt
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Room);
