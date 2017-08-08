import React, { Component } from "react";
import Navigation from "./Navigation";
import { Layer, Stage, Image } from "react-konva";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { saveCanvas, setCanvasToSave, setCanvasShouldClear } from "./../actions/actions";

class CanvasImage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageSent: false
    }
    this.props.socket.on("image_update", data => {
      var image;
      var idToUpdate = data.canvasId == 1 ? (image = document.getElementById("image1")) : (image = document.getElementById("image2"));

      image.src = data.canvasJSON;
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.canvasToSave !== undefined) {
      //set back to undefined so it should only be saved once
      this.props.setCanvasToSave(undefined);
      var image = nextProps.canvasToSave == 1 ? document.getElementById("image1") : document.getElementById("image2");
      if (image && !this.state.imageSent) {
        this.setState({imageSent: true})
        this.saveCanvasToDB(image.src);

      }
    }
  }
  saveCanvasToDB(imageToSave) {
    this.props.saveCanvas({
      image: imageToSave,
      displayName: this.props.user.displayName,
      title: this.props.title
    });
  }


  render() {
    return (
      <div className="container">
        <img id={"image" + this.props.canvasId} src={require(`./../assets/blank-canvas.jpeg`)} />
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
  canvasToSave: state.roomReducer.canvasToSave,
  title: state.gameReducer.imagePromptToSave
});

const mapDispatchToProps = dispatch => bindActionCreators({ saveCanvas, setCanvasToSave, setCanvasShouldClear }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CanvasImage);
