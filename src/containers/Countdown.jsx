import React, { Component } from "react";
import ReactCountdownClock from 'react-countdown-clock';
import Navigation from './Navigation';

class Countdown extends React.Component {
  render() {
    return(
      <div className="container">
        <Navigation />
        <h2>Countdown Component</h2>
        <ReactCountdownClock seconds={60}
                     color="#000"
                     alpha={0.9}
                     size={100}
        />
        <br />
        <br />
      </div>

    );
  }
}

export default Countdown;
