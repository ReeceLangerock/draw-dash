import React from "react";
import * as Redux from "react-redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./../actions/actions";
import { logout, sendAuthorizationCheck,registerUserAsWatcher } from "./../actions/actions";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
    this.onWantToWatch = this.onWantToWatch.bind(this);
  }

  componentWillMount() {
    //check if user is authorized before mounting
    this.props.sendAuthorizationCheck();
  }
  componentWillReceiveProps(nextProps) {
    // if the user is authenticated, redirect to lobby page
    if (nextProps.isAuthenticated || nextProps.isGuest) {
      this.props.changePage();
    }
  }

  onWantToWatch(){
    this.props.registerUserAsWatcher()
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

              <button className="button" type="submit" onClick={this.onWantToWatch}>
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
  isGuest: state.authReducer.isGuest,

  user: state.authReducer.user

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      sendAuthorizationCheck,
      logout,
      registerUserAsWatcher,
      changePage: () => push("lobby")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
