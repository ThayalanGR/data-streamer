import React, { Component } from "react";
import Spinner from "./Spinner";

class Upload extends Component {
  constructor(props) {
    super(props);

    this.state = { isLoading: true };
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    setTimeout(
      function() {
        this.setState({ isLoading: false });
      }.bind(this),
      3000
    );
  }

  render() {
    return this.state.isLoading ? (
      <Spinner size={{ size: "large" }} />
    ) : (
      <div className="container-fluid mt-4 p-5 text-center">
        <h1> i am route one </h1>
      </div>
    );
  }
}
export default Upload;
