import React, { Component, Fragment} from 'react';
import Header from './Header';
import Spinner from './Spinner';
// import VideoPlayer from './VideoPlayer';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {isLoading: true}
  }

  componentDidMount() {
    setTimeout(function() {
      this.setState({isLoading: false})
    }.bind(this), 1000)
  }


  render() {
    return (
      this.state.isLoading ? <Spinner size={{size: "large"}} /> : 
      <Fragment >
          <Header />
          {/* <VideoPlayer /> */}
      </Fragment>
    );
  }
}

export default App;
