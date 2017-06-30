import React from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";

import Home from "./containers/Home";
import About from "./containers/About";
import Navigation from "./containers/Navigation";
import Canvas from "./containers/Canvas";


import reactLogo from "./assets/React-icon.png";

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
    this.state = { imagePrompts: [] };

    // Toggle the state every second
  }

  componentDidMount() {
    // fetch("/api")
    //   .then(response => response.json())
    //   .then(responseJson => {
    //     console.log(responseJson);
    //   })
    //   .catch(error => {
    //     console.error(error);
    //   });
    fetch("/api/image-prompts")
      .then(response => response.json())
      .then(imagePrompts => {
        //this.state = {imagePrompts: responseJson['image-prompts']};

        this.setState({
          imagePrompts: imagePrompts["image-prompts"]
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    var { imagePrompts } = this.state;
    return (
      <HashRouter>
        <main>
          <Navigation />
          <div className="container">
            <h1>hello world!</h1>
            <img
              className="container__image"
              alt="react logo"
              src={reactLogo}
            />
            <p>If you see this everything is working!</p>
            <h1>{imagePrompts}</h1>

          </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/canvas">Canvas</Link></li>

            <li><a href = "api/authenticate">Slack Sign in</a></li>
          </ul>



          <Switch>
            <Route exact path="/" component={Home} />
            <Route
              path="/about"
              render={props => <About prompts={imagePrompts} test="testing" />}
            />
            <Route
              path="/canvas"
              render={props => <Canvas prompts={imagePrompts} test="testing" />}
            />


          </Switch>
        </main>
      </HashRouter>
    );
  }
}

export default App;
