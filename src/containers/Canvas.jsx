import React from "react";

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      prompts: []
    };
  }
  render() {

    var { test, prompts } = this.props;

    const mapPrompts = prompts.map(prompt => <li>{prompt}</li>);

    return (
      <div>
        <h2>Canvas Component</h2>

        <h1>{test}</h1>
        <ul>{mapPrompts}</ul>
      </div>
    );
  }
}

export default Canvas;
