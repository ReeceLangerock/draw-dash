import React, { Component } from "react";
import Navigation from './Navigation';
import CountdownForm from 'CountdownForm';
import Controls from 'Controls';

class Countdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {count: 0, countdownStatus: 'stopped'}
  }

  componentDidUpdate: (prevProps, prevState) => {
    if (this.state.countdownStatus !== prevState.countdownStatus) {
      switch (this.state.countdownStatus) {
        case 'started':
          this.startTimer();
          break;
        case 'stopped':
          this.setState({count: 0});
        case 'paused':
          clearInterval(this.timer);
          this.timer = undefined;
          break;
      }
    }
  },
  componentWillUnmount: function() {
    clearInterval(this.timer);
    this.timer = undefined;
  },
  startTimer: function() {
    this.timer = setInterval(() => {
      var newCount = this.state.count - 1;
      this.setState({
        count: newCount >= 0 ? newCount : 0
      });

      if (newCount === 0) {
        this.setState({countdownStatus: 'stopped'});
      }
    }, 1000);
  },
  handleSetCountdown: function(seconds) {
    this.setState({
      count: seconds,
      countdownStatus: 'started'
    });
  },
  handleStatusChange: function(newStatus) {
    this.setState({countdownStatus: newStatus});
  },
  render() {
    var {count, countdownStatus} = this.state;
    var renderControlArea = () => {
      if (countdownStatus !== 'stopped') {
        return <Controls countdownStatus={countdownStatus} onStatusChange={this.handleStatusChange}/>
      } else {
        return <CountdownForm onSetCountdown={this.handleSetCountdown}/>
      }
    };
    return(
      <div className="container">
        <Navigation />
        <h2>Countdown Component</h2>
        <Clock totalSeconds={count}/>
        {renderControlArea()}
      </div>

    );
  }
}

export default Countdown;
