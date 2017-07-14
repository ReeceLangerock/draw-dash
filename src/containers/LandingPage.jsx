import React from "react";
import * as Redux from "react-redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./../actions/actions";
import { logout, sendAuthorizationCheck } from "./../actions/actions";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  componentWillMount() {
    //check if user is authorized before mounting
    this.props.sendAuthorizationCheck();
  }
  componentWillReceiveProps(nextProps) {
    // if the user is authenticated, redirect to lobby page
    if (nextProps.isAuthenticated) {
      this.props.changePage();
    }
  }
  //handle logout
  onLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <div className="row landing-page">
          <div className="columns small-centered small-10 medium-6 large-4">

            <h1 className="page-title">Draw Dash!</h1>
            <div className="auth-button-container">

              <form action="/api/authenticate">
                <input className="button" type="submit" value="Let Me Draw!" />
              </form>

              <button className="button" type="submit" onClick={this.onLogout}>
                Let Me Watch!
              </button>

            </div>

          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendAuthorizationCheck,
      logout,
      changePage: () => push("lobby")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
