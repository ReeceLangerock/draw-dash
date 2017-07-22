import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Navigation from './Navigation';

class LongCountdown extends React.Component {
  constructor(props) {
    super(props);

    // still need to hide start button

    this.state = { time: {}, seconds: 60 };
    this.timer = 0;
    this.startTimer = this.startTimer.bind(this);
    this.countdown = this.countdown.bind(this);
  }

  formatSeconds (totalSeconds) {
    let seconds = totalSeconds;
    let minutes = Math.floor(totalSeconds / 60);

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    let obj = {
      "minutes": minutes,
      "seconds": seconds
    };

    return obj;
  }

  componentDidMount() {
    let timeLeft = this.formatSeconds(this.state.seconds);
    this.setState({ time: timeLeft });
  }

  startTimer() {
    if (this.timer === 0) {
      this.timer = setInterval(this.countdown, 1000);
    }
  }

  countdown() {
    let seconds = this.state.seconds - 1;
    this.setState({
      time: this.formatSeconds(seconds),
      seconds: seconds
    });

    if (seconds === 0) {
      clearInterval(this.timer);
    }
  }

  render() {
    return(
      <div className="container">
        <Navigation />
        <div className="row">
          <div className="column small-centered medium-6 large-4">
            {this.state.time.seconds}<br />
            <button className="button" onClick={this.startTimer}>Start</button>
          </div>
        </div>
      </div>
    );
  }
}

export default LongCountdown;
