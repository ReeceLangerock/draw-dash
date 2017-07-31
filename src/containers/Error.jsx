import React from "react";
import Navigation from "./Navigation";
import { connect } from "react-redux";

const Error = props => {
  return (
    <div>
      <Navigation />
      <div className="row">
        <div className="columns small-centered small-12 medium-10 large-10">
          <div className="room-container">
            <div className="page-title">
              <h2>404 Error</h2>

            </div>
            <p>Oops! Something broke.</p>
          </div>
        </div>
      </div>

    </div>
  );
};

export default connect(null, null)(Error);
