import React, { Component, Fragment} from 'react';
import Spinner from './Spinner'
import VideoThumb from './VideoThumb'
import { toast } from 'react-toastify';

class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {isLoading: true}
  }

  componentDidMount() {
    this.setState({isLoading: false})
    setTimeout(function() {
      toast.success('upload success')
    }, 1000)
    
  }

  render() {
    return (
      this.state.isLoading ? <Spinner /> : 
      <Fragment>
        <div className="container-fluid p-5 mt-4" >
            <div className="row">
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
               <VideoThumb />
            </div>
        </div>
      </Fragment>
    );
  }
}


export default Home;
