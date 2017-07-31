import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import moment from 'moment'
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

    return this.props.gallery.map(galleryItem => {

      return (
        <div key={galleryItem["_id"]} className="gallery-item">
          <div className="gallery-header">
            <h5>Artwork by: {galleryItem.displayName}</h5>
          </div>
          <img src={galleryItem.image} />
          <div className="gallery-footer">

            <h6>Created on: {moment(galleryItem.date).format("LL")}</h6>
          </div>
        </div>
      );
    });
  }

  render() {
    return (
      <div>
        <Navigation />
        <div className="row">

          <div className="columns small-centered small-12 medium-10 large-10">
            <div className="room-container">
              <div className="page-title">
                <h1>Gallery</h1>
              </div>

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
