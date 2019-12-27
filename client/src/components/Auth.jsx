import React, { Component } from "react";
import "../css/auth.css";

export default class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      userpassword: ""
    };
  }

  render() {
    return (
      <div className="auth-body">
        <div className="auth-content-holder">
          <div className="auth-content-logo">IdeaLog</div>
          <div className="auth-content-input-holder">
            <div className="auth-username-input">
              <input
                onChange={e => this.setState({ userName: e.target.value })}
                placeholder="Username"
                type="text"
              />
            </div>
            <div className="auth-username-input">
              <input
                onChange={e => this.setState({ userPassword: e.target.value })}
                placeholder="Password"
                type="password"
              />
            </div>
          </div>
          <div className="auth-content-login-button-holder">
            <button
              onClick={() => {
                this.props.authLoginHandler(
                  this.state.userName,
                  this.state.userPassword
                );
              }}
              className="auth-content-login-button"
            >
              LOGIN
            </button>
          </div>
          <div className="auth-content-forgot-password-holder">
            Forgot Password?
          </div>
          <div className="auth-content-not-register-holder">
            Not registered? <a href="http://">Sign Up</a>
          </div>
        </div>
      </div>
    );
  }
}
