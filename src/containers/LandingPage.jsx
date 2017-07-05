import React from "react";
import * as Redux from "react-redux";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as actions from "./../actions/actions";

class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
  }
  onLogin() {
    var { dispatch } = this.props;

    dispatch(actions.startLogin());
  }
render() {
  return (
    <div>
      <div className="row landing-page">
        <div className="columns small-centered small-10 medium-6 large-4">

          <h1 className = "page-title">Draw Dash!</h1>
          <div className="auth-button-container">

              <button className="button" type="submit" onClick={this.onLogin}>Let Me Draw!</button>


            <form action="/">
              <input className="button" type="submit" value="Let Me Watch!" />
            </form>
          </div>

        </div>
      </div>

    </div>
  );
}
};

export default Redux.connect()(LandingPage);
