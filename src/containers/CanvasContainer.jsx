import React from "react";
import { bindActionCreators } from "redux";
import Canvas from "./Canvas";
import CanvasImage from "./CanvasImage";
import { connect } from "react-redux";

import { sendAuthorizationCheck, updateLeaderboard } from "./../actions/actions";

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onUserReady = this.onUserReady.bind(this);

  }

  onUserReady() {
    this.props.socket.emit("ready", { roomId: this.props.roomId }, function() {});
    this.props.updateLeaderboard(this.props.user)
  }

  renderUserToCanvasContainer() {
    var roomId = this.props.roomId;
    var occupants = this.props.rooms[roomId].occupants;

    var buttonId = `button${this.props.canvasNumber}`;
    if (occupants.drawers.length === 2) {
      //using loose equality check because canvasSeatNumber is stored as string on backend
      if (occupants.drawers[0].canvasSeatNumber == this.props.canvasNumber) {
        var displayName = occupants.drawers[0].displayName;
        var buttonClass = occupants.drawers[0].isReady ? "button success" : "button primary";
        var disabled = occupants.drawers[0].UID == this.props.user.UID ? "" : "disabled";


        var userMatch = occupants.drawers[0].UID == this.props.user.UID;
        if (userMatch) {
          console.log("usermatch true2");
          return (
            <div className="canvas-container">
              <h5>{displayName}'s Canvas</h5>
              <Canvas socket={this.props.socket} canvasId={this.props.canvasNumber}/>
              <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
                Ready
              </button>
            </div>
          );
        } else {
          return (
            <div className="canvas-container">
              <h5>{displayName}'s Canvas</h5>
              <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
            </div>
          );
        }
      } else if (occupants.drawers[1].canvasSeatNumber == this.props.canvasNumber) {
        var buttonClass = occupants.drawers[1].isReady ? "button success" : "button primary";
        var displayName = occupants.drawers[1].displayName;

        var disabled = occupants.drawers[1].UID == this.props.user.UID ? "" : "disabled";

        var userMatch = occupants.drawers[1].UID == this.props.user.UID;
        if (userMatch) {
          console.log("usermatch true2");
          return (
            <div className="canvas-container">
              <h5>{displayName}'s Canvas</h5>
              <Canvas socket={this.props.socket} canvasId={this.props.canvasNumber} />
              <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
                Ready
              </button>
            </div>
          );
        } else {
          return (
            <div className="canvas-container">
              <h5>{displayName}'s Canvas</h5>
              <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
            </div>
          );
        }
      } else {
        return (
          <div className="canvas-container">
            <h5>Empty Canvas</h5>
            <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
            <button id={buttonId} className="button">Join</button>
          </div>
        );
      }
    } else if (occupants.drawers.length === 1) {
      if (occupants.drawers[0].canvasSeatNumber == this.props.canvasNumber) {
        var buttonClass = occupants.drawers[0].isReady ? "button success" : "button primary";
        var disabled = occupants.drawers[0].UID == this.props.user.UID ? "" : "disabled";
        var displayName = occupants.drawers[0].displayName;

        return (
          <div className="canvas-container">
            <h5>{displayName}'s Canvas</h5>
            <Canvas socket={this.props.socket} canvasId={this.props.canvasNumber} />
            <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
              Ready
            </button>
          </div>
        );
      } else {
        return (
          <div className="canvas-container">
            <h5>Empty Canvas</h5>
            <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
            <button id={buttonId} className="button">Join</button>
          </div>
        );
      }
    } else {
      var disabled = this.props.user.isAuthenticated ? "" : "disabled";
      return (
        <div className="canvas-container">
          <h5>Empty Canvas</h5>
          <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
          <button id={buttonId} className="button" disabled={disabled}>Join</button>
        </div>
      );
    }
  }
  render() {
    return (
      <div>

        {this.renderUserToCanvasContainer()}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  rooms: state.roomReducer.rooms,
  roomId: state.roomReducer.currentUserRoom,

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendAuthorizationCheck, updateLeaderboard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
