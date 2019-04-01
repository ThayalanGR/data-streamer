import React, { Component, Fragment } from "react";
import Spinner from "./Spinner";
import VideoThumb from "./VideoThumb";
// import { toast } from "react-toastify";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: {
        imageUrl:
          "https://resize.indiatvnews.com/en/resize/newbucket/715_-/2018/02/propose-1517999844.jpg",
        videoName: `LaLa Land Lorem asflkj ipsum dolor sit amet consectetur adipisicing
        elit. Dolorem cupiditate alias doloremque illo assumenda consectetur
        ullam eligendi et. Ad iste molestiae possimus reiciendis blanditiis
        quia recusandae vero voluptatum ratione maxime?`,
        category: "Romantic",
        videoTime: "15.24",
        views: "30",
        uploadedOn: "3 days ago"
      }
    };
  }

  componentDidMount() {
    this.setState({ isLoading: false });
    setTimeout(function() {
      // toast.success("upload success");
    }, 1000);
  }

  render() {
    return this.state.isLoading ? (
      <Spinner size={{size: "small"}} />
    ) : (
      <Fragment>
        <div className="container-fluid p-5 mt-4">
          <div className="row">
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
            <VideoThumb content={this.state.content} />
          </div>
        </div>
      </Fragment>
    );
  }
}

export default Home;
