"use strict";
import React from "react";
import Navigation from "./Navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class VotingModal extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.winner === false) {
      d1 = d2 = "It's a tie!";
      style1 = style2 = "vote-result tie"
    } else {
      var d1 = this.props.winner === 1 ? "You Win!" : "You Lose!";
      var style1 = this.props.winner === 1 ? "vote-result win" : "vote-result lose";
      var d2 = this.props.winner === 2 ? "You Win!" : "You Lose!";
      var style2 = this.props.winner === 2 ? "vote-result win" : "vote-result lose";
    }
    return (
      <div className="vote-container">

        <span className={style1}>{d1}</span>

        <span className={style2}>{d2}</span>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  winner: state.votingTimerReducer.winner
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VotingModal);
