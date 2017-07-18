import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { sendAuthorizationCheck } from "./../actions/actions";

class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.onSend = this.onSend.bind(this);
  }

  onSend(e){
    var user = this.props.user.displayName;
    var textToSend = document.getElementById("textToSend").value;
    var node = document.createElement("p");
    var textNode = document.createTextNode(user+": "+textToSend);
    node.appendChild(textNode);
    document.getElementById('messageContainer').appendChild(node);
    console.log(textToSend);
  }

  render() {
    return (
      <div>
        <div className="chat-container">
          <h1>Dummy Chat - Socket not hooked up</h1>
          <div id = "messageContainer" className = "message-container">

          </div>


          <div className="input-container">

              <input id = 'textToSend' type="text" />
              <button className = 'button' onClick={this.onSend}>Send</button>

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
