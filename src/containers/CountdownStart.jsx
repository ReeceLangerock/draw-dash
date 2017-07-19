import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { sendAuthorizationCheck } from "./../actions/actions";

class CountdownStart extends React.Component {
  countdownStart() {}

  render() {
    return (
      <div>
        <div className="chat-container">

          <div className="countdown-circle-container">
            <div className="circle red" />
            <div className="circle red" />
            <div className="circle green" />

            <h1>60:00</h1>

          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CountdownStart);
