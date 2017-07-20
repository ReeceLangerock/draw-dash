import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { getGalleryImages } from "./../actions/actions";
// const io = require("socket.io-client");
// const socket = io();

class Gallery extends React.Component {
  constructor(props) {
    super(props);
  }
  //
  componentWillMount() {
    this.props.getGalleryImages();
  }

  componentDidMount() {}

  renderGalleryImages() {
    console.log("render", this.props);

    return this.props.gallery.map(galleryItem => {
      return (
        <div key={galleryItem["_id"]} className="gallery-item">

          <img src="#" />
          <h5>Artwork by: {galleryItem.displayName}</h5>
          <h5>Created on: {galleryItem.date}</h5>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navigation />
        <h1 className="page-title">Gallery</h1>

        <div className="row">
          <div className="columns small-centered small-12 medium-12 large-10">

            <div className="room-container">

              <div className="gallery-container">
                {this.renderGalleryImages()}
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  gallery: state.galleryReducer.gallery
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGalleryImages
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
