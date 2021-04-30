import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";

export default class Header extends Component {
  render() {
    return (
      <Fragment>
        <nav
          className="navbar navbar-expand-lg navbar-dark shadow-sm fixed-top"
          style={{ backgroundColor: "#FFFFFF" }}
        >
          <Link
            className="navbar-brand text-dark d-flex align-items-center justify-content-center font-weight-bold"
            style={{ letterSpacing: "2px" }}
            to="/"
          >
            {" "}
            <i
              className="fas fa-play text-success mr-2"
              style={{ fontSize: "28px" }}
            ></i>{" "}
            Data Streamer
          </Link>

          <button
            className="navbar-toggler "
            type="button"
            data-toggle="collapse"
            data-target="#basicExampleNav"
            aria-controls="basicExampleNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon text-success bg-success rounded"></span>
          </button>

          <div className="collapse navbar-collapse " id="basicExampleNav">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item ">
                <Link className="nav-link text-dark " to="/upload">
                  <i
                    className="fas fa-upload text-success"
                    style={{ fontSize: "20px" }}
                  ></i>
                </Link>
              </li>
              <li className="nav-item ml-md-4">
                <Link className="nav-link text-dark " to="/download">
                  <i
                    className="fas fa-download text-success"
                    style={{ fontSize: "20px" }}
                  ></i>
                </Link>
              </li>
              <li className="nav-item dropdown ml-md-4">
                <span
                  className="nav-link dropdown-toggle text-success"
                  id="navbarDropdownMenuLink"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                  style={{ cursor: "pointer" }}
                >
                  <i
                    className="far fa-user text-success"
                    style={{ fontSize: "20px" }}
                  ></i>
                </span>
                <div
                  className="dropdown-menu dropdown-primary dropdown-menu-right"
                  aria-labelledby="navbarDropdownMenuLink"
                >
                  <Link className="dropdown-item" to="/upload">
                    Action
                  </Link>
                  <Link className="dropdown-item" to="/upload">
                    Another action
                  </Link>
                  <Link className="dropdown-item" to="/upload">
                    Something else here
                  </Link>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </Fragment>
    );
  }
}
