import React from "react";
import * as Redux from "react-redux";
import {push} from 'react-router-redux'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as actions from "./../actions/actions";
import {startLoginProcess, logout} from "./../actions/actions";

export class LandingPage extends React.Component {
  constructor(props) {
    super(props);
    this.onLogin = this.onLogin.bind(this);
    this.onLogout = this.onLogout.bind(this);
  }


    componentWillMount() {
    this.checkAuth();

    }
    componentWillReceiveProps(nextProps) {
       if (nextProps.isAuthenticated) {
         //this.checkAuth()
         this.props.changePage()
         //this.props.dispatch(push('/lobby'));

       }
     }

    checkAuth() {

      if (this.props.isAuthenticated) {
        var dispatch = require('react-redux')
        console.log(true)
        this.dispatch(push("/lobby"));
      }
    }

  onLogin() {
    console.log('onlogin')
    this.props.startLoginProcess()
  }

  onLogout(){
  console.log('logging out')
  this.props.logout()
  }

render() {
  return (
    <div>
      <div className="row landing-page">
        <div className="columns small-centered small-10 medium-6 large-4">

          <h1 className = "page-title">Draw Dash!</h1>
          <div className="auth-button-container">

          <form action="/api/authenticate">
              <input className="button" type="submit" value="TESTTT Me Draw!" />
            </form>

              <button className="button" type="submit" onClick={this.onLogin}>Let Me Draw!</button>


              <button className="button" type="submit" onClick={this.onLogout}>Let Me Watch!</button>

              </div>
          <h1>TEST{this.props.isAuthenticated}</h1>

        </div>
      </div>

    </div>
  );
}
};

const mapStateToProps = state => ({isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer.user})

const mapDispatchToProps = dispatch => bindActionCreators({
startLoginProcess, logout, changePage: () => push('lobby')
}, dispatch)



export default connect (
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)
