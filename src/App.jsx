import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { bindActionCreators } from "redux";
import * as Redux from "react-redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as actions from "./actions/actions";
import {login} from "./actions/actions";
import store from "./store/store.js";
import Home from "./containers/Home";
import About from "./containers/About";
import Lobby from "./containers/Lobby";
import Canvas from "./containers/Canvas";
import LandingPage from "./containers/LandingPage";
import Room from "./containers/Room";

import Footer from "./containers/Footer";

require("../src/styles/app.scss");

class App extends React.Component {


  render() {

    return (
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/lobby" component={Lobby} />
            <Route exact path="/leaderboard" component={About} />
            <Route exact path="/gallery" component={About} />
            <Route path="/room/:number" component={Room} />

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
