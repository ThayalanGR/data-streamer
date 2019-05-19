import React, { Component } from 'react'
import mime from 'mime-types';
import constants from './constants';
import { Spinner } from '../components'
import { withRouter } from 'react-router-dom'
import Axios from 'axios';


class Player extends Component {

  constructor(props) {

    super(props);
    this.mounted = true;

    this.state = {
      isLoading: true,
      toggleMinMax: 'fa-expand',
      fileName: '',
      mimeType: '',
      streamPath: '',
      isPlay: true,
      volume: 0.50,
      currentTime: 0,
      curtimetext: '',
      durtimetext: '',
      majorFading: '',
      volumeMemory: 0.5,
      timeoutHandler: null,
      subtitleData: null,
      isTrackExist: false
    }

    this.closePlayer = this.closePlayer.bind(this);
    this.toggleFullScreen = this.toggleFullScreen.bind(this);
    this.togglePlay = this.togglePlay.bind(this);
    this.forwardHandler = this.forwardHandler.bind(this);
    this.backwardHandler = this.backwardHandler.bind(this);
    this.volumeHandler = this.volumeHandler.bind(this);
    this.initiateVideoInfoHandler = this.initiateVideoInfoHandler.bind(this);
    this.videoTimeUpdater = this.videoTimeUpdater.bind(this);
    this.mainProgressHandler = this.mainProgressHandler.bind(this);
    this.hideHandler = this.hideHandler.bind(this);
  }

  componentWillMount() {

    const fileName = Buffer.from(this.props.match.params.id, 'base64').toString().split("/");
    if (this.mounted)
      this.setState({
        fileName: fileName[fileName.length - 1],
        streamPath: `${constants.baseUrl}/streamcontent/${this.props.match.params.id}`,
        mimeType: mime.lookup(fileName[fileName.length - 1]),
      })

  }

  getSubtitleContent(path) {
    if (path != null) {
      Axios.get(`${constants.baseUrl}/servestaticcontent/${path}`)
        .then(res => {
          const data = res.data;
          this.setState({ subtitleData: data })
        })
        .catch(err => console.log(err))
    } else {

    }
  }

  componentDidMount() {

    setTimeout(() => {
      if (this.mounted)
        this.setState({ isLoading: false });
      let subtitlePath = this.props.match.params.subid;
      this.getSubtitleContent(subtitlePath);
    }, 1000)


  }

  hideHandler() {
    if (this.mounted)
      this.setState({ majorFading: '' })

    if (this.state.timeoutHandler !== null) {
      clearTimeout(this.state.timeoutHandler)
      this.setState({ timeoutHandler: null })
    }
    let timeOut = setTimeout(function () {
      if (this.mounted)
        this.setState({ majorFading: 'vjs-fade-out' })
    }.bind(this), 3000)
    this.setState({ timeoutHandler: timeOut });
  }

  initiateVideoInfoHandler() {
    let video = document.getElementById('videoPlayer');
    video.addEventListener("timeupdate", this.videoTimeUpdater);

    if(!this.state.isTrackExist){
      this.setState({isTrackExist: true})
      let track = document.createElement("track");
      track.kind = "captions";
      track.label = "English";
      track.srclang = "en";
      track.default = true;
      track.src = `${constants.baseUrl}/servestaticcontent/${this.props.match.params.subid}`;
      track.addEventListener("load", function () {
        this.mode = "showing";
        video.textTracks[0].mode = "showing"; // thanks Firefox
      });
      video.appendChild(track);
    }

    this.hideHandler();

    document.body.onkeydown = (e) => {
      this.hideHandler();
      if (e.keyCode === 32) {
        this.togglePlay()
      }
      if (e.keyCode === 39) {
        this.forwardHandler()
      }
      if (e.keyCode === 37) {
        this.backwardHandler()
      }
      if (e.keyCode === 38) {
        this.volumeUpHandler()
      }
      if (e.keyCode === 40) {
        this.volumeDownHandler()
      }
    }

    document.body.ondblclick = (e) => {
      this.toggleFullScreen()
    }

    document.body.onmouseout = function () {
      if (this.mounted)
        this.setState({ majorFading: 'vjs-fade-out' })
    }.bind(this)

    document.body.onmouseenter = function () {
      this.hideHandler();
    }.bind(this)

    document.body.onmousemove = function () {
      this.hideHandler();
    }.bind(this)

    document.body.onmouseover = function () {
      this.hideHandler();
    }.bind(this)

  }

  closePlayer() {
    var video = document.getElementById("videoPlayer");
    if (!video.paused) {
      video.pause();
    }
    this.props.history.goBack()
  }

  videoTimeUpdater() {
    let video = document.getElementById('videoPlayer');
    var nt = video.currentTime * (100 / video.duration);
    if (this.mounted)
      this.setState({ currentTime: nt });
    var curmins = Math.floor(video.currentTime / 60);
    var cursecs = Math.floor(video.currentTime - curmins * 60);
    var durmins = Math.floor(video.duration / 60);
    var dursecs = Math.floor(video.duration - durmins * 60);
    if (cursecs < 10) { cursecs = "0" + cursecs; }
    if (dursecs < 10) { dursecs = "0" + dursecs; }
    if (curmins < 10) { curmins = "0" + curmins; }
    if (durmins < 10) { durmins = "0" + durmins; }
    if (this.mounted)
      this.setState({ curtimetext: curmins + ":" + cursecs, durtimetext: durmins + ":" + dursecs })

  }

  mainProgressHandler(value) {
    let video = document.getElementById('videoPlayer');
    var seekto = video.duration * (value / 100);
    video.currentTime = seekto;
  }

  forwardHandler() {
    let video = document.getElementById('videoPlayer');
    video.currentTime += 10
  }

  backwardHandler() {
    let video = document.getElementById('videoPlayer');
    video.currentTime -= 10
  }

  volumeHandler(value) {
    let video = document.getElementById('videoPlayer');
    if (this.mounted) video.volume = value;

    this.setState({ volume: video.volume })
  }

  volumeMuteHandler() {
    let video = document.getElementById('videoPlayer');
    if (this.state.volume === 0) {
      video.volume = this.state.volumeMemory
      if (this.mounted)
        this.setState({ volume: this.state.volumeMemory })
    } else {
      if (this.mounted)
        this.setState({ volumeMemory: this.state.volume })
      video.volume = 0.0;
      if (this.mounted)
        this.setState({ volume: 0.0 })
    }
  }

  volumeUpHandler() {
    let video = document.getElementById('videoPlayer');
    if (this.state.volume < 0.95) {
      video.volume = this.state.volume + 0.05;
      if (this.mounted)
        this.setState({ volume: this.state.volume + 0.05 })
    } else {
      video.volume = 1.00;
      if (this.mounted)
        this.setState({ volume: 1.00 })
    }
  }

  volumeDownHandler() {
    let video = document.getElementById('videoPlayer');
    if (this.state.volume > 0.05) {
      video.volume = this.state.volume - 0.05;
      if (this.mounted)
        this.setState({ volume: this.state.volume - 0.05 })
    } else {
      video.volume = 0.0;
      if (this.mounted)
        this.setState({ volume: 0.0 })
    }

  }


  toggleFullScreen() {

    if ((document.webkitCurrentFullScreenElement == null)) {
      if (this.mounted)
        this.setState({ toggleMinMax: 'fa-compress' })
      document.documentElement.webkitRequestFullScreen();
    } else {
      if (this.mounted)
        this.setState({ toggleMinMax: 'fa-expand' })
      document.webkitCancelFullScreen();
    }
  }

  componentWillUnmount() {
    this.mounted = false;
    if (!(document.webkitCurrentFullScreenElement == null)) {
      document.webkitCancelFullScreen();
    }
  }

  togglePlay() {
    let video = document.getElementById('videoPlayer');
    if (video.paused) {
      video.play()
      if (this.mounted)
        this.setState({ isPlay: true })
    } else {
      video.pause()
      if (this.mounted)
        this.setState({ isPlay: false })
    }
  }

  render() {
    return (
      this.state.isLoading ?
        <div className="player-wrapper d-flex justify-content-center align-items-center">
          <Spinner size={{ size: "large" }} />
        </div> :
        <div id="main-body" className={`${this.state.majorFading === '' ? '' : 'hide-cursor'} player-wrapper d-flex justify-content-center align-items-center`}>
          <div className={`logo-icon ${this.state.majorFading}`}>
            <i onClick={() => { this.props.history.push("/") }} className="fas fa-play text-success logo-size" ></i>
          </div>
          <div className={`float-icon-top ${this.state.majorFading}`}>
            <i onClick={() => { this.volumeMuteHandler() }} className={`fas ${this.state.volume > 0.50 ? 'fa-volume-up' : this.state.volume === 0 ? 'fa-volume-mute' : 'fa-volume-down'} hover-green max-icon text-white`}></i>
            <span className="text-white mediator ml-2 mr-2">|</span>
            <i onClick={() => { this.toggleFullScreen() }} className={`fa ${this.state.toggleMinMax} hover-green max-icon text-white`}></i>
            <span className="text-white mediator ml-2 mr-2">|</span>
            <i onClick={() => { this.closePlayer() }} className="fa fa-times close-icon hover-green text-white"></i>
          </div>
          <div className={`video-title ${this.state.majorFading}`}>
            {this.state.fileName}
          </div>

          <div className={`float-center-controls d-flex ${this.state.majorFading} justify-content-between align-items-center`}>
            <i onClick={() => { this.backwardHandler() }} className="fas fa-undo-alt fa-2x mr-4 hover-green sec-parent"><span className="sec-child" > 10</span></i>
            <i onClick={() => { this.togglePlay() }} className={`fas ${this.state.isPlay ? 'fa-pause' : 'fa-play'} fa-2x ml-4 mr-4 ml-2 mr-2 hover-green`}></i>
            {/* <i className="fas fa-pause fa-2x ml-4 mr-4 hover-green"></i> */}
            <i onClick={() => { this.forwardHandler() }} className="fas fa-redo-alt fa-2x ml-4 hover-green sec-parent"><span className="sec-child" > 10</span></i>
          </div>

          <div className={`float-bottom-controls ${this.state.majorFading}`}>
            <input onChange={(e) => { this.mainProgressHandler(e.target.value) }} className="progress-bar" type="range" name="progress" min="0" max="100" step="1" value={this.state.currentTime} id="playback-progress" />
            <div className="progress-text">
              <span className="progress-done">{this.state.curtimetext}</span>
              <span className="progress-splitter ml-2 mr-2">|</span>
              <span className="progress-total">{this.state.durtimetext}</span>
            </div>
          </div>

          <input onChange={(e) => { this.volumeHandler(e.target.value) }} type="range" className={` ${this.state.majorFading} volume-progress`} name="volume-progress" min="0" max="1" step="0.05" value={this.state.volume} id="volume-progress" />

          <video onCanPlay={() => this.initiateVideoInfoHandler()} preload="metadata" onClick={() => this.togglePlay()} className="player" id="videoPlayer" src={this.state.streamPath} type={this.state.mimeType} autoPlay>
          </video>

        </div>
    )
  }

}

export default withRouter(Player);