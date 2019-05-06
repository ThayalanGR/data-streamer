import React, { Component } from "react";
import "./common.css";
import Spinner from "./Spinner";
import constants from './constants';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

export default class VideoThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: this.props.content
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 2000);
  }

  imageUrlEncoder(url) {
    let encodedString = new Buffer(url).toString('base64')
    return `${constants.baseUrl}/servestaticcontent/${encodedString}`;
  }

  render() {
    const content = this.state.content;
    return this.state.isLoading ? (
      <div
        className="col-md-2 col-sm-12 p-2 d-flex justify-content-center align-items-center"
        style={{ minHeight: "250px", maxHeight: "250px" }}
      >
        <Spinner size={{ size: "small" }} />
      </div>
    ) : (
      <div
        className="col-md-2 col-sm-12 p-2 "
        style={{ minHeight: "250px", maxHeight: "250px" }}
      >
        <div className="thumb-parent">
          <img
            className=""
            style={{ minHeight: "150px", maxHeight: "150px", width: "100%" }}
            src={this.imageUrlEncoder(content.thumbnail)}
            alt=""
          />
          <div className="time-float">
            <p>{content.duration}</p>
          </div>
        </div>
        <div className="" style={{ lineHeight: 0, fontSize: "14px" }}>
          <h6 className="wrap-me">{content.fileName}</h6>
          <p className="mb-4">
            <span className="text-default">Favourite</span>
          </p>
          <p className="">
            <span className="text-default dot-after">
              54 views
            </span>
            <span className="text-default">{timeAgo.format(new Date(content.uploadedOn))}</span>
          </p>
        </div>
      </div>
    );
  }
}
