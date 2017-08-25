import React, { Component } from "react";
import { Layer, Stage, Image } from "react-konva";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasEvent = this.canvasEvent.bind(this);
    this.props.socket.on("canvas_update", data => {
      const idToUpdate = data.canvasId == 1 ? "drawing2" : "drawing1";
      this.handleChangeComplete = this.handleChangeComplete.bind(this);
    });
  }

  canvasEvent(canvasJSON) {
    this.props.socket.emit("canvas_event", { roomId: this.props.roomId, canvasJSON: canvasJSON, canvasId: this.props.canvasId }, () => {});
  }

  componentWillReceiveProps(newProps) {
    if (newProps.canvasShouldClear) {
      const clearButton = document.getElementById("clear");
      clearButton.dispatchEvent("click");
    }
  }
  colorPicker() {
    return (
      <div>
        <ul className="picker">
          <li id="black" />
          <li id="blue" />
          <li id="red" />
          <li id="green" />
          <li id="orange" />
        </ul><br />
        <ul className="picker">
          <li id="brown" />
          <li id="purple" />
          <li id="yellow" />
          <li id="pink" />
          <li id="silver" />
        </ul>
      </div>
    );
  }

  renderKonva(container) {
    const that = this;
    const width = 400; // window.innerWidth;
    const height = 400; // window.innerHeight - 25;
    // first we need Konva core things: stage and layer
    const stage = new Konva.Stage({
      container: `drawing${this.props.canvasId}`,
      width: width,
      height: height
    });
    const layer = new Konva.Layer({});
    stage.add(layer);
    // then we are going to draw into special canvas element
    const canvas = document.createElement("canvas");
    canvas.width = stage.width() / 1.5;
    canvas.height = stage.height() / 1.5;
    // created canvas we can add to layer as 'Konva.Image' element
    let image = new Konva.Image({
      image: canvas,
      x: stage.width() / 6,
      y: stage.height() / 6,
      stroke: "#05AFF2",
      shadowBlur: 5
    });
    layer.add(image);
    stage.draw();
    // Now we need to get access to context element
    const context = canvas.getContext("2d");
    // context.strokeStyle = this.state.background;
    context.lineJoin = "round";
    context.lineWidth = 5;
    let isPaint = false;
    let lastPointerPosition;
    let mode = "brush";
    let sizes = "small";
    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    stage.on("contentMousedown.proto contentTouchstart.proto", () => {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();
    });
    stage.on("contentMouseup.proto contentTouchend.proto", () => {
      isPaint = false;
    });
    // and core function - drawing
    stage.on("contentMousemove.proto contentTouchmove.proto", () => {
      if (!isPaint) {
        return;
      }
      if (mode === "brush") {
        context.globalCompositeOperation = "source-over";
        if (sizes === "small") {
          context.lineWidth = 5;
        } else if (sizes === "medium") {
          context.lineWidth = 12;
        } else if (sizes === "large") {
          context.lineWidth = 20;
        }
      }
      if (mode === "eraser") {
        context.lineWidth = 15;
        context.globalCompositeOperation = "destination-out";
      }
      context.beginPath();
      let localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y()
      };
      context.moveTo(localPos.x, localPos.y);
      const pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y()
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      lastPointerPosition = pos;
      layer.draw();
      context.strokeStyle = newColor;
      const dataURL = stage.toDataURL();

      that.canvasEvent(dataURL);
    });

    const select = document.getElementById("tool");
    select.addEventListener("change", () => {
      mode = select.value;
    });
    const clearButton = document.getElementById("clear");
    clearButton.addEventListener("click", () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      layer.draw();
    });
    const smallSize = document.getElementById("small");
    smallSize.addEventListener("click", () => {
      sizes = "small";
    });
    const mediumSize = document.getElementById("medium");
    mediumSize.addEventListener("click", () => {
      sizes = "medium";
    });
    const largeSize = document.getElementById("large");
    largeSize.addEventListener("click", () => {
      sizes = "large";
    });
    const black = document.getElementById("black");
    black.addEventListener("click", () => {
      newColor = "#000000";
    });
    const blue = document.getElementById("blue");
    blue.addEventListener("click", () => {
      newColor = "#0000ff";
    });
    const red = document.getElementById("red");
    red.addEventListener("click", () => {
      newColor = "#ff0000";
    });
    const green = document.getElementById("green");
    green.addEventListener("click", () => {
      newColor = "#00ff00";
    });
    const orange = document.getElementById("orange");
    orange.addEventListener("click", () => {
      newColor = "#FFA500";
    });
    const brown = document.getElementById("brown");
    brown.addEventListener("click", () => {
      newColor = "#654321";
    });
    const purple = document.getElementById("purple");
    purple.addEventListener("click", () => {
      newColor = "#800080";
    });
    const yellow = document.getElementById("yellow");
    yellow.addEventListener("click", () => {
      newColor = "#ffff00";
    });
    const pink = document.getElementById("pink");
    pink.addEventListener("click", () => {
      newColor = "#FFC0CB";
    });
    const silver = document.getElementById("silver");
    silver.addEventListener("click", () => {
      newColor = "#C0C0C0";
    });
  }

  render() {
    return (
      <div className="container">
        {this.clearIt}
        <div id={"drawing" + this.props.canvasId} ref={ref => this.renderKonva(ref)} />
        <div className="row">
          <div className="small-2 large-2 columns" id="small">
            <img src={require(`./../assets/brush-small.png`)} />
          </div>
          <div className="small-2 large-2 columns" id="medium">
            <img src={require(`./../assets/brush-medium.png`)} />
          </div>
          <div className="small-2 large-2 columns" id="large">
            <img src={require(`./../assets/brush-large.png`)} />
          </div>
          <div className="large-6 small-6 columns">
            {this.colorPicker()}
          </div>
        </div><br />
        <div className="row">
          <div className="large-10 small-10 columns">
            <div className="large-7 small-7 columns">
              <select id="tool">
                <option value="brush">Brush</option>
                <option value="eraser">Eraser</option>
              </select>
            </div>
            <div className="large-2 small-2 columns">
              <button className="alert button" id="clear">Clear</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

let newColor = "#000000";

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom,
  canvasShouldClear: state.roomReducer.canvasShouldClear
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
