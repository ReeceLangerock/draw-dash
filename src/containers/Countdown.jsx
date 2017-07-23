import React, { Component } from "react";
import ReactDOM from "react-dom";
import Navigation from "./Navigation";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { toggleRoundCompleted, setCanvasToSave } from "./../actions/actions";

class Countdown extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      countdownSeconds: 3,
      roundSeconds: 2
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
  }

  startTimer() {
    if (!this.countdownTimer) {
      this.countdownTimer = setInterval(this.countdown, 1000);
    }
  }

  countdown(correctThis) {
    let currentSeconds = this.state.countdownSeconds - 1;

    this.setState({
      countdownSeconds: currentSeconds
    });

    if (currentSeconds === 0) {
      this.roundTimer = setInterval(this.roundCountdown, 1000);
      clearInterval(this.countdownTimer);
      let element = <h2>GO!</h2>;
      ReactDOM.render(element, document.getElementById("go"));
    }
  }

  roundCountdown() {
    const currentSeconds = this.state.roundSeconds - 1;

    this.setState({
      roundSeconds: currentSeconds
    });

    if (currentSeconds === 0) {
      clearInterval(this.roundTimer);
      this.props.toggleRoundCompleted();
      this.props.setCanvasToSave(1);
    }
  }

  renderTimer() {
    const { countdownSeconds, roundSeconds } = this.state;

    if (countdownSeconds > 0) {
      return <div>Counting down...<br />{countdownSeconds}</div>;
    } else if (roundSeconds > 0) {
      return <div>{roundSeconds}</div>;
    } else if(roundSeconds === 0) {


    }


  }

  render() {
    const { countdownSeconds, roundSeconds } = this.state;
    return (
      <div className="container">
        <div className="row">
          <div className="column small-centered medium-6 large-4">
            <h2 id="go" />
            {this.renderTimer()}

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({ toggleRoundCompleted,setCanvasToSave  }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Countdown);
