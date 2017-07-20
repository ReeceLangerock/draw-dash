import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { sendAuthorizationCheck, setImagePrompt } from "./../actions/actions";

class CanvasContainer extends React.Component {
  constructor(props) {
    super(props);
    this.onUserReady = this.onUserReady.bind(this);
    this.props.socket.on("all_ready", data => {
      this.props.setImagePrompt(data.prompt)
      console.log('data',data.prompt);
    });
  }

  onUserReady() {

    this.props.socket.emit(
      "ready",
      { roomId: this.props.roomId },
      function() {}
    );
  }

  renderUserToCanvasContainer() {
    var roomId = this.props.roomId;
    var occupants = this.props.rooms[roomId].occupants;
    var displayName = this.props.user.displayName;
    var buttonId = `button${this.props.canvasNumber}`;
    if (occupants.drawers.length === 2) {
      //using loose equality check because canvasSeatNumber is stored as string on backend
      if (occupants.drawers[0].canvasSeatNumber == this.props.canvasNumber) {
        var buttonClass = occupants.drawers[0].isReady ? "button success" : "button primary";
        var disabled = occupants.drawers[0].UID == this.props.user.UID ? '' : 'disabled';
        return (
          <div className="canvas-container">
            <h1>{displayName}'s Canvas</h1>
            <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
              Ready
            </button>
          </div>
        );
      } else if (
        occupants.drawers[1].canvasSeatNumber == this.props.canvasNumber
      ) {
        var buttonClass = occupants.drawers[1].isReady ? "button success" : "button primary";
        var disabled = occupants.drawers[1].UID == this.props.user.UID ? '' : 'disabled';
        return (
          <div className="canvas-container">
            <h1>{displayName}'s Canvas</h1>
            <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
              Ready
            </button>
          </div>
        );
      } else {
        return (
          <div className="canvas-container">
            <h1>Empty Canvas</h1>
            <button id={buttonId} className="button">Join</button>
          </div>
        );
      }
    } else if (occupants.drawers.length === 1) {
      if (occupants.drawers[0].canvasSeatNumber == this.props.canvasNumber) {
        var buttonClass = occupants.drawers[0].isReady ? "button success" : "button primary";
        var disabled = occupants.drawers[0].UID == this.props.user.UID ? '' : 'disabled';
        return (
          <div className="canvas-container">
            <h1>{displayName}'s Canvas</h1>
            <button id={buttonId} className={buttonClass} onClick={this.onUserReady} disabled={disabled}>
              Ready
            </button>
          </div>
        );
      } else {
        return (
          <div className="canvas-container">
            <h1>Empty Canvas</h1>
            <button id={buttonId} className="button">Join</button>
          </div>
        );
      }
    } else {
      var disabled = this.props.user.isAuthenticated ? '' : 'disabled';
      return (
        <div className="canvas-container">
          <h1>Empty Canvas</h1>
          <button id={buttonId} className="button" disabled ={disabled}>Join</button>
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
  roomId: state.roomReducer.currentUserRoom
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendAuthorizationCheck, setImagePrompt
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(CanvasContainer);
