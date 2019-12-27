import React, { Component } from "react";
import "../css/home.css";

export default class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div className="home-wrapper">
        <div className="home-navbar">
          <div className="base-color welcome-user">
            <p>Hi {this.props.userDetails.name} !</p>
          </div>
          <div className="nav-logo">
            <i className="base-color fas fa-fire"></i>
          </div>
          <div className="nav-logout">
            <i className="fas fa-sign-out-alt danger"></i>
          </div>
        </div>
        <div className="home-content">
          <div>Your Ideas!</div>
          <div className="your-ideas-content"></div>
          <div className="your-contributions-content"></div>
        </div>
      </div>
    );
  }
}
