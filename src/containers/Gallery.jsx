import React from "react";
import Navigation from "./Navigation";
import { push } from "react-router-redux";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  getGalleryImages
} from "./../actions/actions";
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


  render() {



    return (
      <div>
        <Navigation />
        <h1 className="page-title">Gallery</h1>

        <div className="row">
          <div className="columns small-centered small-12 medium-12 large-10">

            <div className="room-container">

              <h1>Gallery</h1>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getGalleryImages
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Gallery);
