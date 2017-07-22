import React, { Component } from "react";
import Navigation from "./Navigation";
import { Layer, Stage, Image } from "react-konva";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class Canvas extends React.Component {
  constructor(props) {
    super(props);
    this.canvasEvent = this.canvasEvent.bind(this);
    this.props.socket.on("canvas_update", data => {
      var idToUpdate = data.canvasId == 1 ? "drawing2" : "drawing1";
      var node = document.createElement("p");
      var textNode = document.createTextNode("test");
      node.appendChild(textNode);
      document.getElementById(idToUpdate).appendChild(node);
      console.log(data.canvasJSON);
      this.updateKonva(idToUpdate, data.canvasJSON);

      //this.renderDisabledKonva(undefined, data.canvasJSON, data.canvasId);
    });
  }
  canvasEvent(canvasJSON) {
    this.props.socket.emit("canvas_event", { roomId: this.props.roomId, canvasJSON: canvasJSON, canvasId: this.props.canvasId }, function() {});
  }

  renderTools() {
    if (true) {
      return (
        <div className="tool">
          Tool:
          <select id="tool">
            <option value="brush">Brush</option>
            <option value="eraser">Eraser</option>
          </select>
        </div>
      );
    }
  }

  renderKonva(container) {
    var that = this;
    var width = 400; //window.innerWidth;
    var height = 400; //window.innerHeight - 25;
    // first we need Konva core things: stage and layer
    var stage = new Konva.Stage({
      container: `drawing${this.props.canvasId}`,
      width: width,
      height: height
    });
    var layer = new Konva.Layer({});
    stage.add(layer);
    // then we are going to draw into special canvas element
    var canvas = document.createElement("canvas");
    canvas.width = stage.width() / 1.5;
    canvas.height = stage.height() / 1.5;
    // creted canvas we can add to layer as "Konva.Image" element
    var image = new Konva.Image({
      image: canvas,
      x: stage.width() / 6,
      y: stage.height() / 6,
      stroke: "green",
      shadowBlur: 5
    });
    layer.add(image);
    stage.draw();
    // Good. Now we need to get access to context element
    var context = canvas.getContext("2d");
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 5;
    var isPaint = false;
    var lastPointerPosition;
    var mode = "brush";
    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    stage.on("contentMousedown.proto", function() {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();
    });
    stage.on("contentMouseup.proto", function() {
      isPaint = false;
    });
    // and core function - drawing
    stage.on("contentMousemove.proto", function() {
      if (!isPaint) {
        return;
      }
      if (mode === "brush") {
        context.globalCompositeOperation = "source-over";
      }
      if (mode === "eraser") {
        context.globalCompositeOperation = "destination-out";
      }
      context.beginPath();
      var localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y()
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y()
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      lastPointerPosition = pos;
      layer.draw();

        var dataURL = stage.toDataURL();
        // window.open(dataURL);
        that.canvasEvent(dataURL);
        // that.canvasEvent(stage.toJSON());
        // console.log(layer);

    });
    var select = document.getElementById("tool");
    select.addEventListener("change", function() {
      mode = select.value;
    });
  }

  render() {
    return (
      <div className="container">
        {this.renderTools()}
        <div id={"drawing" + this.props.canvasId} ref={ref => this.renderKonva(ref)} />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  roomId: state.roomReducer.currentUserRoom
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Canvas);
