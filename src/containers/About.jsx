import React from 'react';

const About = ({prompts}) => {
  console.log(prompts)
  return(
  <div>
    <h2>About Page</h2>
    <p>This is a drawing game. More to come later.</p>
    <h2>{prompts}</h2>

  </div>
);
}

export default About;
