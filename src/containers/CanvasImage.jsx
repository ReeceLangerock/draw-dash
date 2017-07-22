import React, { Component } from "react";
import Navigation from "./Navigation";
import { Layer, Stage, Image } from "react-konva";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

class CanvasImage extends React.Component {
  constructor(props) {
    super(props);
    this.props.socket.on("image_update", data => {
      var image;
      var idToUpdate = data.canvasId == 1 ? image = document.getElementById('image1') : image = document.getElementById('image2');
    
      image.src = data.canvasJSON;
    });
  }

  render() {
    return (
      <div className="container">
        <h1>{this.props.canvasId}</h1>
        <img id={"image" + this.props.canvasId} src="https://facebook.github.io/react/img/logo.svg" />
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
  roomId: state.roomReducer.currentUserRoom
});

const mapDispatchToProps = dispatch => bindActionCreators({}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(CanvasImage);
