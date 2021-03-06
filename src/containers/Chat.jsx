import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { sendAuthorizationCheck } from "./../actions/actions";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
    this.props.socket.on("message_received", message => {
      var node = document.createElement("p");
      var textNode = document.createTextNode(message);
      node.appendChild(textNode);
      document.getElementById("messageContainer").appendChild(node);
    });

    this.props.socket.on("user_join", user => {
      var node = document.createElement("p");
      var textNode = document.createTextNode(`${user} joined the room`);
      node.appendChild(textNode);
      document.getElementById("messageContainer").appendChild(node);
    });
    this.props.socket.on("user_leave", user => {
      var node = document.createElement("p");
      var textNode = document.createTextNode(`${user} left the room`);
      node.appendChild(textNode);
      document.getElementById("messageContainer").appendChild(node);
    });
  }

  componentDidMount() {
    document.getElementById("textToSend").addEventListener("keyup", (event) =>{
      event.preventDefault();
      if (event.keyCode == 13 && event.target.value != "") {
        this.onSend();
      }
    });
  }

  componentWillUnmount() {
    this.props.socket.removeListener("message_received");
  }

  onSend(e) {
    var user = this.props.user.displayName;
    var messageText = document.getElementById("textToSend").value;
    if (messageText.length === 0) {
      return 0;
    }
    var fullMessage = user + ": " + messageText;
    this.props.socket.emit("message_sent", { message: fullMessage, roomId: this.props.roomId });
    document.getElementById("textToSend").value = "";
  }

  render() {
    return (
      <div>
        <div className="chat-container">
          <h3>Chat</h3>
          <div id="messageContainer" className="message-container" />

          <div className="input-container">

            <input id="textToSend" type="text" />
            <button className="button" onClick={this.onSend}>Send</button>

          </div>
        </div>
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
      sendAuthorizationCheck
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
