import React from "react";
import Navigation from "./Navigation";
import CanvasContainer from "./CanvasContainer";
import Chat from "./Chat";
import Countdown from "./Countdown";
import VotingModal from "./VotingModal";

import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setImagePrompt, setAllUsersReady, updateLeaderboard, setVoteCompleted, removeUserFromRoom, setCanvasToSave } from "./../actions/actions";

class Room extends React.Component {
  constructor(props) {
    super(props);
    this.emitOnUnload = this.emitOnUnload.bind(this);

    this.props.socket.on("all_ready", data => {
      this.props.setImagePrompt(data.prompt);
      this.props.setAllUsersReady(true);
    });
  }

  componentWillReceiveProps(newProps) {
    if (newProps.voteCompleted === true) {
      this.props.setVoteCompleted(false);
      this.props.socket.emit("complete_vote", { roomId: this.props.roomId, user: this.props.user }, data => {
        data ? this.props.setCanvasToSave(data) : this.props.setCanvasToSave(undefined);
        if (data === false) {
          this.props.updateLeaderboard(this.props.user, 2);
        } else if (data === this.props.canvasSeatNumber) {
          this.props.updateLeaderboard(this.props.user, 3);
        } else {
          this.props.updateLeaderboard(this.props.user, 1);
        }
      });
    }
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
    this.props.removeUserFromRoom(this.props.roomId, this.props.user);

    window.removeEventListener("beforeunload", this.handleUserLeavingPage);
  }

  renderVotingModal() {
    if (this.props.voteInProgress) {
      return <VotingModal socket={this.props.socket} />;
    }
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="row">

          <div className="columns small-centered small-12 medium-10 large-10">
            <div className="room-container">
              <div className="page-title">
                <div className="clearfix">
                  <p className="float-right">Viewers: {this.props.rooms[this.props.roomId].occupants.watchers.length}</p>
                </div>
                <h1>{this.props.rooms[this.props.roomId].roomName} Room</h1>

              </div>

              <Countdown socket={this.props.socket} startSignal={this.props.allReady} />

              {this.renderVotingModal()}

              <div className="canvas-items-container">

                <CanvasContainer canvasNumber="1" socket={this.props.socket} />
                <CanvasContainer canvasNumber="2" socket={this.props.socket} />
              </div>
              <Chat socket={this.props.socket} />
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
  roomId: state.roomReducer.currentUserRoom,
  rooms: state.roomReducer.rooms,
  allReady: state.roomReducer.allReady,
  voteInProgress: state.gameReducer.voteInProgress,
  voteCompleted: state.gameReducer.voteCompleted,
  canvasSeatNumber: state.roomReducer.canvasSeatNumber
});

const mapDispatchToProps = dispatch => bindActionCreators({ setAllUsersReady, removeUserFromRoom, setVoteCompleted, setCanvasToSave, setImagePrompt, updateLeaderboard }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Room);
