"use strict";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import ImagePrompt from "./ImagePrompt";
import VotingModal from "./VotingModal";
import VoteResult from "./VoteResult";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleRoundCompleted, setAllUsersReady,setCanvasShouldClear, setCanvasToSave, setImagePrompt, setVoteInProgress, setVoteCompleted, setRoundStarted, setRoundCompleted } from "./../actions/actions";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdownSeconds: 0,
      roundSeconds: 0
    };

    this.roundCountdown = this.roundCountdown.bind(this);
    this.countdown = this.countdown.bind(this);
    this.startTimer = this.startTimer.bind(this);
    this.countdownTimer = null;
    this.roundTimer = null;
  }

  componentDidMount() {
    if (this.props.startSignal) {
      this.startTimer();
    }
  }
  componentWillReceiveProps(newProps) {
    if (newProps.startSignal) {
      this.startTimer();

    }
    if (newProps.voteCompleted === true && newProps.voteInProgress === false) {
      this.props.socket.emit("complete_vote", { roomId: this.props.roomId }, data => {
        if (data) {
          this.props.setCanvasToSave(data);
        }
        this.props.setRoundCompleted(false);
      });
      if (document.getElementById("canvas-item-container")) {
        document.getElementById("canvas-item-container").classList.remove("canvas-disabled");
      }
    }
  }

  startTheRound() {
    this.setState({
      countdownSeconds: 4,
      roundSeconds: 60
    });
    this.props.setRoundStarted(true);
    this.props.setRoundCompleted(false);
    this.props.setVoteInProgress(false);
  }

  endTheRound() {
    this.props.setAllUsersReady(false);
    this.props.setRoundStarted(false);
    this.props.setRoundCompleted(true);
    this.props.setImagePrompt(undefined);
    this.props.setVoteInProgress(true);

    this.countdownTimer = null;
    this.roundTimer = null;

    document.getElementById("canvas-item-container").classList.add("canvas-disabled");
  }

  startTimer() {
    if (!this.countdownTimer) {
      this.startTheRound();
      this.countdownTimer = setInterval(this.countdown, 1000);
    }
  }

  countdown() {
    let currentSeconds = this.state.countdownSeconds - 1;
    if (currentSeconds === 3) {
      document.getElementById("circle1").classList.toggle("red-active");
    } else if (currentSeconds === 2) {
      document.getElementById("circle1").classList.toggle("red-active");
      document.getElementById("circle2").classList.toggle("yellow-active");
    } else if (currentSeconds === 1) {
      document.getElementById("circle2").classList.toggle("yellow-active");
      document.getElementById("circle3").classList.toggle("green-active");
    }

    this.setState({
      countdownSeconds: currentSeconds
    });

    if (currentSeconds === 0) {
      this.roundTimer = setInterval(this.roundCountdown, 1000);
      clearInterval(this.countdownTimer);
    }
  }

  roundCountdown() {
    const currentSeconds = this.state.roundSeconds - 1;

    this.setState({
      roundSeconds: currentSeconds
    });

    if (currentSeconds === 0) {
      clearInterval(this.roundTimer);
      this.endTheRound();
    }
  }

  renderTimer() {
    const { countdownSeconds, roundSeconds } = this.state;
    if (this.props.voteInProgress === false && this.props.voteResult === false) {
      if (document.getElementById("canvas-item-container")) {
        document.getElementById("canvas-item-container").classList.remove("canvas-disabled");
      }
      if (countdownSeconds > 0) {
        return (
          <div className="countdown-circle-container">
            <div id="circle1" className="circle red"><h3>3</h3></div>
            <div id="circle2" className="circle yellow"><h3>2</h3></div>
            <div id="circle3" className="circle green"><h3>1</h3></div>
          </div>
        );
      } else if (roundSeconds > 0) {
        var formattedSeconds = roundSeconds;
        if (roundSeconds < 10) {
          var formattedSeconds = "0" + formattedSeconds;
        }
        return <div><h2>0:{formattedSeconds}</h2></div>;
      } else if (roundSeconds === 0) {
        return <p>Click <strong>Ready</strong> to start. Round will begin when both users are ready! Feel free to draw while you wait but the canvas will clear when the round begins.</p>;
      } else {
      }
    }
  }

  renderImagePrompt(countdownSeconds) {
    if (this.props.imagePrompt && countdownSeconds === 0 && this.props.voteInProgress === false) {
      return (
        <div id="prompt" className="image-prompt-container">

          <h2>Draw This: {this.props.imagePrompt}</h2>
        </div>
      );
    }
  }

  renderVotingModal(countdownSeconds) {
    if (this.props.voteInProgress === true && this.props.voteCompleted === false) {
      return <VotingModal socket={this.props.socket} />;
    }
  }

  renderVoteResult() {
    if (this.props.voteResult === true) {
      return <VoteResult />;
    }
  }

  render() {
    const { countdownSeconds, roundSeconds } = this.state;

    return (
      <div className="info-container">

        {this.renderImagePrompt(countdownSeconds)}
        {this.renderVoteResult()}
        {this.renderTimer()}
        {this.renderVotingModal(countdownSeconds)}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomId: state.roomReducer.currentUserRoom,
  voteCompleted: state.gameReducer.voteCompleted,
  voteInProgress: state.gameReducer.voteInProgress,
  imagePrompt: state.imageReducer.prompt,
  voteResult: state.votingTimerReducer.voteResult,

  votingTime: state.votingTimerReducer.seconds
});

const mapDispatchToProps = dispatch => bindActionCreators({ setRoundCompleted, setImagePrompt, setCanvasShouldClear, setAllUsersReady, setVoteCompleted, setVoteInProgress, setRoundStarted, setCanvasToSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
