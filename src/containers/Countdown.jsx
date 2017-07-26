import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import ImagePrompt from "./ImagePrompt";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleRoundCompleted, setAllUsersReady, setCanvasToSave, setVoteInProgress, setVoteCompleted, setRoundStarted, setRoundCompleted } from "./../actions/actions";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdownSeconds: 4,
      roundSeconds: 5
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
    console.log(newProps);
    if (newProps.voteCompleted === true && newProps.voteInProgress === false) {
      this.props.socket.emit("complete_vote", { roomId: this.props.roomId }, data => {
        if (data) {
          this.props.setCanvasToSave(data);
        }
        this.props.setRoundCompleted(false);
      });
    }
  }

  startTheRound() {
    this.props.setVoteCompleted(false);
    this.props.setRoundStarted(true);
    this.props.setRoundCompleted(false);
    this.props.setVoteInProgress(false);
  }

  endTheRound() {
    this.props.setAllUsersReady(false);
    this.props.setRoundStarted(false);
    this.props.setRoundCompleted(true);
    this.props.setVoteInProgress(true);
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

    if (countdownSeconds > 0 &&) {
      //console.log(document.getElementById('circle1'));
      return (
        <div className="countdown-circle-container">
          <div id="circle1" className="circle red" />
          <div id="circle2" className="circle yellow" />
          <div id="circle3" className="circle green" />
        </div>
      );
    } else if (roundSeconds > 0) {
      return <div><h2>0:{roundSeconds}</h2></div>;
    } else if (roundSeconds === 0) {
    }
  }

  renderImagePrompt(countdownSeconds) {
    if (this.props.imagePrompt && countdownSeconds === 0) {
      return (
        <div id="prompt" className="image-prompt-container">

          <h2>Draw This: {this.props.imagePrompt}</h2>
        </div>
      );
    }
  }

  render() {
    const { countdownSeconds, roundSeconds } = this.state;
    return (
      <div className="info-container">

        {this.renderImagePrompt(countdownSeconds)}

        {this.renderTimer()}

      </div>
    );
  }
}

const mapStateToProps = state => ({
  roomId: state.roomReducer.currentUserRoom,
  voteCompleted: state.gameReducer.voteCompleted,
  voteInProgress: state.gameReducer.voteInProgress,
  imagePrompt: state.imageReducer.prompt
});

const mapDispatchToProps = dispatch => bindActionCreators({ setRoundCompleted, setAllUsersReady, setVoteCompleted, setVoteInProgress, setRoundStarted, setCanvasToSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
