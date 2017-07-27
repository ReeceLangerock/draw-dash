import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Redux from "react-redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as actions from "./actions/actions";
import {login} from "./actions/actions";
import store from "./store/store.js";
import Gallery from "./containers/Gallery";
import About from "./containers/About";
import Leaderboard from "./containers/Leaderboard";
import Lobby from "./containers/Lobby";
import LandingPage from "./containers/LandingPage";
import Room from "./containers/Room";
import Canvas from "./containers/Canvas";
import Countdown from './containers/Countdown';
import Footer from "./containers/Footer";

const io = require("socket.io-client");
const socket = io();

require("../src/styles/app.scss");

class App extends React.Component {
  render() {
    return (
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/lobby" render = {props => <Lobby socket = {socket}/>}/>
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/canvas" component={Canvas} />
            <Route exact path="/countdown" component={Countdown} />
            <Route  path="/room/:number" render = {props => <Room socket = {socket} />}/>
          </Switch>
        </main>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
  isAuthenticated: state.authReducer.isAuthenticated
}};

const mapDispatchToProps = dispatch => bindActionCreators({
}, dispatch)

export default connect (
  mapStateToProps,
  mapDispatchToProps
)(App)
