import React, { Component } from "react";
import "./common.css";
import Spinner from "./Spinner";

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
    }, 3000);
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
            src={content.imageUrl}
            alt=""
          />
          <div className="time-float">
            <p>{content.videoTime}</p>
          </div>
        </div>
        <div className="" style={{ lineHeight: 0, fontSize: "14px" }}>
          <h6 className="wrap-me">{content.videoName}</h6>
          <p className="mb-4">
            <span className="text-default">{content.category}</span>
          </p>
          <p className="">
            <span className="text-default dot-after">
              {content.views} views
            </span>
            <span className="text-default">{content.uploadedOn}</span>
          </p>
        </div>
      </div>
    );
  }
}
