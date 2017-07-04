import React from "react";

const LandingPage = ({ prompts }) => {
  console.log(prompts);
  return (
    <div>
      <div className="row landing-page">
        <div className="columns small-centered small-10 medium-6 large-4">

          <h1 className = "page-title">Draw Dash!</h1>
          <div className="auth-button-container">
            <form action="/api/authenticate">
              <input className="button" type="submit" value="Let Me Draw!" />
            </form>

            <form action="/">
              <input className="button" type="submit" value="Let Me Watch!" />
            </form>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LandingPage;
