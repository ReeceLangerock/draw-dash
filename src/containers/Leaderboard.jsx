import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getLeaderboard } from "./../actions/actions";
// const io = require("socket.io-client");
// const socket = io();

class Leaderboard extends React.Component {
  constructor(props) {
    super(props);
  }
  //
  componentWillMount() {
    this.props.getLeaderboard();
  }

  componentDidMount() {}

  renderLeaderboard() {
    return this.props.leaderboard.map(leaderboardItem => {
      return (
        <div key={leaderboardItem.UID} className="leaderboard-item">
          <h4>{leaderboardItem.displayName}</h4>
          <h4>{leaderboardItem.score} points</h4>

        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="row">

          <div className="columns small-centered small-12 medium-10 large-10">
            <div className="room-container">
              <div className="page-title">
                <h1>Leaderboard</h1>
                </div>
              <div className="leaderboard-container">
                {this.renderLeaderboard()}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  leaderboard: state.leaderboardReducer.leaderboard
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getLeaderboard
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Leaderboard);
