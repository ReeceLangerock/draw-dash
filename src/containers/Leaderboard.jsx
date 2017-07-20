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
          <h1>{leaderboardItem.displayName}</h1>
          <h1>{leaderboardItem.score}</h1>

        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navigation />
        <h1 className="page-title">Gallery</h1>

        <div className="row">
          <div className="columns small-centered small-12 medium-12 large-10">

            <div>

              <h1>Leaderboard</h1>
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
