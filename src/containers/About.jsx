import React from 'react';

const About = ({prompts}) => {
  console.log(prompts)
  return(
  <div>
    <h2>About Page</h2>
    <h2>{prompts}</h2>

  </div>
);
}

export default About;
