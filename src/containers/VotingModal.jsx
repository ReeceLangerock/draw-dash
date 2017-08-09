import React from "react";
import Navigation from "./Navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVoteInProgress, startVoteTimer } from "./../actions/actions";

class VotingModal extends React.Component {
  constructor(props) {
    super(props);
    this.registerVote = this.registerVote.bind(this);
    this.state = {
      voted: false
    };
  }
  componentDidMount() {
    this.setState({ voted: false });

    this.props.startVoteTimer();
  }

  registerVote(e) {
    var vote = e.target.value;
    this.props.socket.emit("register_vote", { roomId: this.props.roomId, user: this.props.user, vote: vote }, function(data) {
      console.log("data", data);
    });
    this.setState({ voted: true });
    //this.props.setVoteInProgress(false);
  }

  render() {
    return (
      <div className="modal-container">

        <button disabled={this.state.voted} className="button voting-button" value="1" onClick={this.registerVote}>Drawing #1</button>
        <h1>Vote: {this.props.seconds}</h1>
        <button disabled={this.state.voted} className="button voting-button" value="2" onClick={this.registerVote}>Drawing #2</button>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom,
  seconds: state.votingTimerReducer.seconds
});

const mapDispatchToProps = dispatch => bindActionCreators({ setVoteInProgress, startVoteTimer }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VotingModal);
