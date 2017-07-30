import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";

import { bindActionCreators } from "redux";
import * as Redux from "react-redux";
import { connect } from "react-redux";
import { push } from "react-router-redux";
import * as actions from "./actions/actions";
import {login} from "./actions/actions";
import store, { history } from "./store/store.js";
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
      <Provider store={store}>
        <ConnectedRouter history={history}>
      <div>
        <main>
          <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route exact path="/about" component={About} />
            <Route exact path="/lobby" render={props => <Lobby socket={socket}/>}/>
            <Route exact path="/leaderboard" component={Leaderboard} />
            <Route exact path="/gallery" component={Gallery} />
            <Route exact path="/canvas" component={Canvas} />
            <Route exact path="/countdown" component={Countdown} />
            <Route  path="/room/:number" render={props => <Room socket={socket} />}/>
          </Switch>
        </main>
        <Footer />
      </div>
    </ConnectedRouter>
  </Provider>
    );
  }
}

export default App;
