import React, { Component } from 'react';
import Canvas from './Canvas';
import Chat from './Chat';
import Footer from './Footer';
import ImagePrompt from './ImagePrompt';

class Home extends Component {
  render() {
    return (
      <div className="container">
        <h1>Home</h1>
        <Canvas />
        <Chat />
        <ImagePrompt />
        <Footer />
      </div>
    );
  }
}

export default Home;
