import React from "react";
import { bindActionCreators } from "redux";
import Canvas from "./Canvas";
import CanvasImage from "./CanvasImage";
import { connect } from "react-redux";

import { sendAuthorizationCheck, addUserToRoom } from "./../actions/actions";

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onUserReady = this.onUserReady.bind(this);
    this.onUserJoin = this.onUserJoin.bind(this);
  }

  onUserReady() {
    this.props.socket.emit("ready", { roomId: this.props.roomId }, function() {});
  }

  onUserJoin(canvasToJoin) {
    if (this.props.canvasSeatNumber === -1 || this.props.canvasSeatNumber === undefined) {
      this.props.socket.emit("join", { roomId: this.props.roomId, user: this.props.user, joiningAs: "drawer" }, function() {});
      this.props.addUserToRoom(this.props.roomId, this.props.user, canvasToJoin);
    }
  }

  renderUserToCanvasContainer() {
    var roomId = this.props.roomId;
    var occupants = this.props.rooms[roomId].occupants;

    var buttonId = `button${this.props.canvasNumber}`;
    if (occupants.drawers.length === 2) {
      //using loose equality check because canvasSeatNumber is stored as string on backend
      if (occupants.drawers[0].canvasSeatNumber == this.props.canvasNumber) {
        var displayName = occupants.drawers[0].displayName;
        var buttonClass = occupants.drawers[0].isReady ? "button ready" : "button not-ready";
        var disabled = occupants.drawers[0].UID == this.props.user.UID ? "" : "disabled";

        var userMatch = occupants.drawers[0].UID == this.props.user.UID;
        if (userMatch) {
          return (
            <div className="canvas-container">
              <div className="canvas-header">
                <h5>Your Canvas</h5>
                <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
                  Ready
                </button>
              </div>
              <Canvas socket={this.props.socket} canvasId={this.props.canvasNumber} />

            </div>
          );
        } else {
          return (
            <div className="canvas-container">
              <div className="canvas-header">

                <h5>{displayName}'s Canvas</h5>
              </div>
              <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
            </div>
          );
        }
      } else if (occupants.drawers[1].canvasSeatNumber == this.props.canvasNumber) {
        var buttonClass = occupants.drawers[0].isReady ? "button ready" : "button not-ready";
        var displayName = occupants.drawers[1].displayName;

        var disabled = occupants.drawers[1].UID == this.props.user.UID ? "" : "disabled";

        var userMatch = occupants.drawers[1].UID == this.props.user.UID;
        if (userMatch) {
          return (
            <div className="canvas-container">
              <div className="canvas-header">
                <h5>Your Canvas</h5>
                <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
                  Ready
                </button>
              </div>
              <Canvas socket={this.props.socket} canvasId={this.props.canvasNumber} />

            </div>
          );
        } else {
          return (
            <div className="canvas-container">
              <div className="canvas-container">

                <h5>{displayName}'s Canvas</h5>
              </div>
              <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
            </div>
          );
        }
      } else {
        return (
          <div className="canvas-container">
            <div className="canvas-header">
              <h5>Empty Canvas</h5>
              <button id={buttonId} className="button" onClick={() => this.onUserJoin(this.props.canvasNumber)}>Join</button>

            </div>
            <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
          </div>
        );
      }
    } else if (occupants.drawers.length === 1) {
      if (occupants.drawers[0].canvasSeatNumber == this.props.canvasNumber) {
        var buttonClass = occupants.drawers[0].isReady ? "button ready" : "button not-ready";
        var disabled = occupants.drawers[0].UID == this.props.user.UID ? "" : "disabled";
        var displayName = occupants.drawers[0].displayName;

        return (
          <div className="canvas-container">
            <div className="canvas-header">
              <h5>Your Canvas</h5>
              <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
                Ready
              </button>
            </div>
            <Canvas socket={this.props.socket} canvasId={this.props.canvasNumber} />

          </div>
        );
      } else {
        return (
          <div className="canvas-container">
            <div className="canvas-header">
              <h5>Empty Canvas</h5>
              <button id={buttonId} className="button" onClick={() => this.onUserJoin(this.props.canvasNumber)}>Join</button>

            </div>
            <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
          </div>
        );
      }
    } else {
      var disabled = this.props.user.isAuthenticated ? "" : "disabled";
      return (
        <div className="canvas-container">
          <div className="canvas-header">
            <h5>Empty Canvas</h5>
            <button id={buttonId} className="button" onClick={() => this.onUserJoin(this.props.canvasNumber)} disabled={disabled}>Join</button>

          </div> <CanvasImage socket={this.props.socket} canvasId={this.props.canvasNumber} />
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
  canvasSeatNumber: state.roomReducer.canvasSeatNumber
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendAuthorizationCheck,
      addUserToRoom
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
