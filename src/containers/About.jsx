import React from 'react';
import Navigation from "./Navigation";
import { connect } from "react-redux";

const About = (props) => {

  return(
  <div>
    <Navigation />
    <h2>About Page</h2>
    <h2></h2>

  </div>
);
}

export default connect(null, null)(About);
