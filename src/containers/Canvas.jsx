import React, { Component } from "react";
import Navigation from './Navigation';
const LC = require('literallycanvas');

import styles from '../styles/components/literallycanvas.css';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prompts: []
    };
  };

  render () {
    return (
      <div className="container">
        <Navigation />
        <h2>Canvas Component</h2>
        <div>
          <LC.LiterallyCanvasReactComponent imageURLPrefix="../assets" />
          <br />
        </div>
      </div>
    );
  }
}

export default Canvas;
