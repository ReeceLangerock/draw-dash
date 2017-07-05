import React, { Component } from "react";
import Navigation from "./Navigation";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prompts: []
    };
  };

  componentWillReceiveProps() {
    var canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    ctx.strokeStyle = '#BADA55';
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 80;

    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;
    let hue = 0;
    let direction = true;

    function draw(e) {
      if (!isDrawing) return; // stops function from running when they are not moused down
      console.log(e);
      ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
      ctx.beginPath();
      // start from
      ctx.moveTo(lastX, lastY);
      // go to
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
      [lastX, lastY] = [e.offsetX, e.offsetY];

      hue++;
      if (hue >= 360) {
        hue = 0;
      }

      if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
        direction = !direction;
      }

      if (direction) {
        ctx.lineWidth++;
      } else {
        ctx.lineWidth--;
      }

    }

    canvas.addEventListener('mousedown', (e) => {
      isDrawing = true;
      [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);
  }

  render () {
    return (
      <div className="container">
        <Navigation />
        <h2>Canvas Component</h2>
        <canvas ref="canvas" id="draw" width="300" height="300"></canvas>
      </div>
    );
  }
}

export default Canvas;
