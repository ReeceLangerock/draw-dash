import React from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";

const About = (props) => {

  return(
  <div>
    <Navigation />
    <div className="row">
      <div className="columns small-centered small-12 medium-10 large-10">

        <div className="room-container">
          <div className="page-title">
            <h2>About Draw Dash</h2>

          </div>

        <p>Draw Dash is a competitive canvas drawing game written in React. Once you login with your Slack account, you can either join a room to play or watch as a spectator. </p>
        <p>When a player joins, they can select any empty canvas available. When both canvases are full and the players click <em>Ready</em>, a timer counts down and that round's drawing prompt appears. Players then have 60 seconds to draw their best interpretation of the prompt. When time is up, anyone in the room has the opportunity to vote for their favorite. The person with the most votes wins that round!</p>
        <p>The winner gets three points, the loser gets one point, and if there is a tie then both players get two points. Their score is then added to the overall total, which can be found on the leaderboard.</p>
      </div>
      </div>
    </div>

  </div>
);
}

export default connect(null, null)(About);
