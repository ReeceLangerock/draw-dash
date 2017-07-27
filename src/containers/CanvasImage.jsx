import React, { Component } from "react";
import Navigation from "./Navigation";
import { Layer, Stage, Image } from "react-konva";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveCanvas, setCanvasToSave } from "./../actions/actions";

class CanvasImage extends React.Component {
  constructor(props) {
    super(props);
    this.props.socket.on("image_update", data => {
      var image;
      var idToUpdate = data.canvasId == 1 ? (image = document.getElementById("image1")) : (image = document.getElementById("image2"));

      image.src = data.canvasJSON;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.canvasToSave !== undefined) {
      var image = nextProps.canvasToSave == 1 ? document.getElementById("image1") : document.getElementById("image2");

      //set back to undefined so it should only be saved once
      this.props.setCanvasToSave(undefined);
      if (image) {
        this.saveCanvasToDB(image.src);
      }
    }
  }
  saveCanvasToDB(imageToSave) {
    this.props.saveCanvas({
      image: imageToSave,
      displayName: this.props.user.displayName
    });
  }

  render() {
    return (
      <div className="container">
        <img id={"image" + this.props.canvasId} src="http://www.bluemaize.net/im/arts-crafts-sewing/blank-canvas-3.jpg" />
      </div>
    );
  }
}

{
  /* <div id={"drawing" + this.props.canvasId} ref={ref => this.renderKonva(ref)} /> */
}

const mapStateToProps = state => ({
  isAuthenticated: state.authReducer.isAuthenticated,
  user: state.authReducer,
  rooms: state.roomReducer.rooms,
  roomId: state.roomReducer.currentUserRoom,
  canvasToSave: state.roomReducer.canvasToSave
});

const mapDispatchToProps = dispatch => bindActionCreators({ saveCanvas, setCanvasToSave }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CanvasImage);
