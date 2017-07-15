import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

import Home from "./containers/Home";
import About from "./containers/About";
import Canvas from "./containers/Canvas";
import LandingPage from './containers/LandingPage';
import Footer from './containers/Footer';
import Countdown from './containers/Countdown';

require('../src/styles/app.scss');
/**
 * this container is defined as class so we can modify state
 */
class App extends React.Component {
  /**
   * this is our statefull render
   * @return {objects} our stateless components
   */
  constructor(props) {
    super(props);
    this.state = { imagePrompts: [], user: "Guest", isAuthenticated: undefined };

    // Toggle the state every second
  }

  componentDidMount() {
    fetch("/api/image-prompts", { credentials: "include" })
      .then(response => response.json())
      .then(response => {
        var user = response.user ? response.user : "Guest";
        var isAuthenticated = response.user ? true : false;
        this.setState({
          imagePrompts: response["image-prompts"],
          user,
          isAuthenticated
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  renderLandingPage(){
    if(!this.state.isAuthenticated){
      return ( <LandingPage/>)
    }
  }

  renderHome(){

    if(this.state.isAuthenticated){
      return ( <Home/>)
    }
  }

  render() {
    var { imagePrompts, user, isAuthenticated } = this.state;
    return (
      <HashRouter>
        <main>



          <Switch>
            <Route exact path="/">
            <div>
            {this.renderLandingPage()}
            {this.renderHome()}
          </div>
            </Route>
            <Route
              path="/about"
              render={props => <About prompts={imagePrompts} test="testing" />}
            />
            <Route
              path="/canvas"
              render={props => <Canvas prompts={imagePrompts} test="testing" />}
            />
            <Route
              path="/countdown"
              render={props => <Countdown prompts={imagePrompts} test="testing" />}
            />
            <Route
              path="/:room"
              render={props => <About test="testing" />}
            />


          </Switch>
          <Footer/>
        </main>
      </HashRouter>
    );
  }
}

export default App;
