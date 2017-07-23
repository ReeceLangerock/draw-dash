import React from "react";
import Navigation from "./Navigation";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
//import {  } from "./../actions/actions";

class VotingModal extends React.Component {
  constructor(props) {
    super(props);
  }

  registerVote(){
    console.log('vote');
  }

  render() {
    return (
      <div>
        <div className="row">

          <div className="columns small-centered small-12 medium-10 large-10">
            <div className="modal-container">
              <h1>Voting Modal</h1>
              <div className="room-item-button-container">
                <button className="button voting-button" onClick = {this.registerVote}>Drawing #1</button>
                <button className="button voting-button" onClick = {this.registerVote}>Drawing #2</button>

              </div>
            </div>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(VotingModal);
