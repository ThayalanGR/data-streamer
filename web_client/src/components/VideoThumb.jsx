import React, { Component } from "react";
import Spinner from "./Spinner";
import constants from './constants';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'

import { withRouter } from 'react-router-dom'
// this also works with react-router-native


// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')

class VideoThumb extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: this.props.content,
      videoSrc: this.props.content.path
    };
    this.fireVideoPlayer = this.fireVideoPlayer.bind(this);
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


  fireVideoPlayer() {
    let encodedString = new Buffer(this.state.videoSrc).toString('base64');
    if (this.state.content.subtitlePath !== null) {
      let subtitleEncodedString = new Buffer(this.state.content.subtitlePath).toString('base64');
      this.props.history.push(`/player/${encodedString}/${subtitleEncodedString}`)
    } else {
      this.props.history.push(`/player/${encodedString}/null`)
    }
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
          className="col-md-2 col-sm-12 p-2 hover-videothumb"
          style={{ minHeight: "250px", maxHeight: "250px" }}
          onClick={() => { this.fireVideoPlayer() }}
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


export default withRouter(VideoThumb);
