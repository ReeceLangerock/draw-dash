import React from "react";
import * as Redux from "react-redux";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./../actions/actions";
import { logout, sendAuthorizationCheck, registerGuestAsWatcher } from "./../actions/actions";

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

  onWantToWatch() {
    this.props.registerGuestAsWatcher();
  }
  //handle logout
  onLogout() {
    this.props.logout();
  }

  render() {
    return (
      <div>
        <div className="hero-section">
          <div className="small-12 medium-10 medium-centered large-9 large-centered column">
            <div className="hero-section-text">
              <h1>Draw Dash!</h1>
              <p>Stressed out? Need a break?</p>
              <p>Grab a friend and draw!</p>
              <div className="">
                <div className="auth-button-container">
                  <form action="/api/authenticate">
                    <input className="auth-button" type="submit" value="Let Me Draw!" />
                  </form>
                  <button className="auth-button" type="submit" onClick={this.onWantToWatch}>
                    Let Me Watch!
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="landing-page-background row">
          <div className="small-12 medium-10 medium-centered large-9 large-centered column">
            <div className="landing-page-body">
              <h1>Draw Dash in Action</h1>
              <div className="gif-container">
                <div className="small-12 medium-6 large-6 column">
                <div className="gif-item">
                  <img src={require("./../assets/placeholderGif1.gif")} />
                </div>
                </div>
                <div className="small-12 medium-6 large-6 column">
                <div className="gif-item">
                  <img src={require("./../assets/placeholderGif2.gif")} />
                </div>
                </div>
              </div>
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
      registerGuestAsWatcher,
      changePage: () => push("lobby")
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(LandingPage);
