import React, { Component } from "react";
import './common.css';

export default class VideoThumb extends Component {
  render() {
    return (
      <div
        className="col-md-2 col-sm-12 p-2 "
        style={{ minHeight: "250px", maxHeight: "250px" }}
      >
      <div className="thumb-parent">
        <img
          className=""
          style={{ minHeight: "150px", maxHeight: "150px", width: "100%" }}
          src="https://resize.indiatvnews.com/en/resize/newbucket/715_-/2018/02/propose-1517999844.jpg"
          alt=""
        />
        <div className="time-float">
            <p>18.45</p>
        </div>
      </div>
      <div className="" style={{lineHeight: 0, fontSize: "14px"}}>
            <h6 className="wrap-me">LaLa Land Lorem asflkj ipsum dolor sit amet consectetur adipisicing elit. Dolorem cupiditate alias doloremque illo assumenda consectetur ullam eligendi et. Ad iste molestiae possimus reiciendis blanditiis quia recusandae vero voluptatum ratione maxime?</h6>
            <p className="mb-4"><span className="text-default">Romantic</span></p>
            <p className=""><span className="text-default dot-after">30 views </span><span className="text-default"> 3 days ago</span></p>
        </div>
      </div>
    );
  }
}
