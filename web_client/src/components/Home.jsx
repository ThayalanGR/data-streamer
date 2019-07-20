import React, { Component, Fragment } from "react";
import Spinner from "./Spinner";
import VideoThumb from "./VideoThumb";
import constants from './constants';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      content: []
    }

    this.initialFetch = this.initialFetch.bind(this);

  }

  componentWillMount() {
    this.initialFetch();
  }

  initialFetch() {
    fetch(`${constants.baseUrl}/fetchallvideos`)
      .then(data => data.json())
      .then(data => {
        this.setState({ content: data })
      })
  }

  componentDidMount() {
    this.setState({ isLoading: false });
  }

  render() {
    return this.state.isLoading ? (
      <Spinner size={{ size: "small" }} />
    ) : (
        <Fragment>
          <div className="container-fluid p-5 mt-4">
            <div className="row">
              {this.state.content.map((item, index) => (
                <VideoThumb key={index} content={item} />
              ))}
            </div>
          </div>
        </Fragment>
      );
  }
}

export default Home;
