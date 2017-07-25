import React from "react";
import Navigation from "./Navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { setVoteInProgress, startVoteTimer } from "./../actions/actions";

class VotingModal extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.registerVote = this.registerVote.bind(this);

  }
  componentDidMount() {
    this.props.startVoteTimer();
  }

  registerVote(e){
    var vote = e.target.value;
    this.props.socket.emit("register_vote", { roomId: this.props.roomId, user: this.props.user, vote: vote }, function(data) {});
    this.props.setVoteInProgress(false);
  }

  render() {
    return (
      <div>
        <div className="row">

          <div className="columns small-centered small-12 medium-10 large-10">
            <div className="modal-container">
              <h1>Voting Modal</h1>
              <div className="room-item-button-container">
                <h5>Seconds To Vote: {this.props.seconds}</h5>
                <button className="button voting-button" value = "1" onClick = {this.registerVote}>Drawing #1</button>
                <button className="button voting-button" value = "2" onClick = {this.registerVote}>Drawing #2</button>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom,
  seconds: state.votingTimerReducer.seconds
});

const mapDispatchToProps = dispatch => bindActionCreators({setVoteInProgress, startVoteTimer}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VotingModal);
