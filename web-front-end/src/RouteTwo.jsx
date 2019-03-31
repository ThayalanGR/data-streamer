import React, { Component } from 'react';
import Spinner from './Spinner'

class RouteTwo extends Component {
  constructor(props) {
    super(props)

    this.state = {isLoading: true}

  }

  componentDidMount() {
    this.setState({isLoading: true})

    setTimeout(function() {

      this.setState({isLoading: false})
    }.bind(this), 3000)
  }


  render() {
    return (
      this.state.isLoading ? <Spinner /> : <h1> i am route two </h1>
    );
  }
}
export default RouteTwo;
