import React from 'react';
import {
  HashRouter,
  Route,
  Link,
  Switch,
} from 'react-router-dom';

import Home from './containers/Home';
import About from './containers/About';
import Navigation from './containers/Navigation';
import Canvas from './containers/Canvas';
import Chat from './containers/Chat';
import Footer from './containers/Footer';
import ImagePrompt from './containers/ImagePrompt';

import reactLogo from './assets/React-icon.png';

/**
 * this container is defined as class so we can modify state
 */
class App extends React.Component {
  /**
   * this is our statefull render
   * @return {objects} our stateless components
   */

   componentDidMount() {
     fetch('/users')
       .then((response) => response.json())
       .then((responseJson) => {
         console.log(responseJson)
       })
       .catch((error) => {
         console.error(error);
       });


  }


  render() {
    return (
      <HashRouter>
        <main>
          <Navigation/>
          <div className="container">
            <Canvas />
            <Chat />
            <Footer />
            <ImagePrompt />
          </div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/canvas" component={Canvas} />
            <Route path="/chat" component={Chat} />
            <Route path="/footer" component={Footer} />
            <Route path="/imageprompt" component={ImagePrompt} />
          </Switch>
        </main>
      </HashRouter>
    );
  }
}

export default App;
