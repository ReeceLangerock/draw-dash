import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);

// With ES6 classes properties of the class do not automatically bind to the
// React class instance. The below changes the context of this.handleLogin
    this.handleLogin = this.handleLogin.bind(this);

  }
  handleLogin(){
    this.props.onLogin();
  }
  render() {

    console.log(this.props);
    return (
      <div>
        <h2>Canvas Component</h2>

        <h1>Login</h1>

      <button onClick = {this.handleLogin}>Click me</button>
      </div>
    );
  }
}

export default Login;
