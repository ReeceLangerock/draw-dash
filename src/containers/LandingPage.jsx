import React from 'react';

const LandingPage = ({prompts}) => {
  console.log(prompts)
  return(
  <div>
    <div className="row">
      <div className="column small-centered small-11 medium-6 large-5">
        <form action = "/api/authenticate">
<input className = "button" type="submit" value="Let Me Draw!" />
</form>

<form action = "/">
<input className = "button" type="submit" value="Let Me Watch!" />
</form>
  </div>
  </div>

  </div>
);
}

export default LandingPage;
