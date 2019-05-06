import React, { Component } from 'react'
import io from 'socket.io-client';
import axios from 'axios';
import constants from './constants';

import { Spinner } from '../components'
import { withRouter } from 'react-router-dom'


class Player extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      toggleMinMax: 'fa-expand',
      fileName: ''
    }

    this.closePlayer = this.closePlayer.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
  }

  componentWillMount() {
    const fileName = Buffer.from(this.props.match.params.id, 'base64').toString().split("/");
    this.setState({ fileName: fileName[fileName.length - 1] })
    axios
      .get(`${constants.baseUrl}/streamcontent/${this.props.match.params.id}`)
      .then(data => {
        console.log(data);
        
      })
      .catch(err => {
        console.log(err);
        
      })
  }

  componentDidMount() {
    console.log(this.state.fileName);

    const socket = io(`${constants.baseUrl}/`);
    socket.on('connect', function(){
      console.log("connected");
      
    });
    socket.on('event', function(data){
      console.log(data)

    });
    socket.on('disconnect', function(){});
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 3000)
  }

  closePlayer() {
    this.props.history.goBack()
  }

  toggleFullScreen() {

    if ((document.webkitCurrentFullScreenElement == null)) {
      this.setState({ toggleMinMax: 'fa-compress' })
      document.documentElement.webkitRequestFullScreen();
    } else {
      this.setState({ toggleMinMax: 'fa-expand' })
      document.webkitCancelFullScreen();
    }
  }
  componentWillUnmount() {
    if (!(document.webkitCurrentFullScreenElement == null)) {
      this.setState({ toggleMinMax: 'fa-expand' })
      document.webkitCancelFullScreen();
    }
  }
  render() {
    return (
      this.state.isLoading ?
        <div className="player-wrapper d-flex justify-content-center align-items-center">
          <Spinner size={{ size: "large" }} />
        </div> :
        <div className="player-wrapper d-flex justify-content-center align-items-center">
          <div className="logo-icon">
            <i onClick={() => { this.props.history.push("/") }} className="fas fa-play text-success logo-size" ></i>
          </div>
          <div className="float-icon-top">
            <i onClick={() => { this.toggleFullScreen() }} className={`fa ${this.state.toggleMinMax} hover-green max-icon text-white`}></i>
            <span className="text-white mediator ml-2 mr-2">|</span>
            <i onClick={() => { this.closePlayer() }} className="fa fa-times close-icon hover-green text-white"></i>
          </div>
          <div className="video-title">
            {this.state.fileName}
          </div>
        </div>
    )
  }
}

export default withRouter(Player);