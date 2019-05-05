import React, { Component, Fragment } from "react";
import Spinner from "./Spinner";
import constants from './constants';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
import { toast } from "react-toastify";

// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)

// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')


class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      files: []
    };

    this.initialFetch = this.initialFetch.bind(this)
  }

  componentWillMount() {
    this.initialFetch()
  }

  initialFetch() {
    fetch(`${constants.baseUrl}/fetchallfiles`)
      .then(data => data.json())
      .then(data => {
        this.setState({ files: data.items })
      })
      .catch(err => {
        console.log(err)
      })
  }

  componentDidMount() {

    this.setState({ isLoading: true });

    setTimeout(
      function () {
        this.setState({ isLoading: false });
      }.bind(this),
      1000
    );
  }

  downloadFileHandler(id) {
    var popout = window.open(`${constants.baseUrl}/downloadfile/${id}`,
      "Data Streamer downloader", 'width=500,height=500');

    window.setTimeout(function () {
      popout.close();
    }, 500);
  }

  deleteFileHandler(id) {
    fetch(`${constants.baseUrl}/deletefile/${id}`)
      .then(data => data.json())
      .then(data => {
        this.initialFetch()
        toast.success("file deleted successfully", {
          position: "bottom-right",
          autoClose: 2000,
        })
      })
      .catch(err => {
        console.log(err)
        toast.error("something went wrong try again later!", {
          position: "bottom-right",
          autoClose: 2000
        })
      })
  }

  deleteAllFileHandler() {

    fetch(`${constants.baseUrl}/deleteallfiles`)
    .then(data => data.json())
    .then(data => {
      if(data.status) {
        toast.success("All files deleted successfully!", {
          position: "bottom-right",
          autoClose: 2000
        })
        this.initialFetch();
      }
    })
    .catch(err => {
      toast.error("Something went wrong!", {
        position: "bottom-right",
        autoClose: 2000
      })
    })

  }

  render() {
    return this.state.isLoading ? (
      <Spinner size={{ size: "large" }} />
    ) : (
        <div className="container-fluid mt-4 pt-5 pl-md-5 pr-md-5 text-center" style={{position: "relative"}}>
          <button onClick={() => {this.deleteAllFileHandler()}} className={`btn btn-sm btn-danger text-white m-1 mr-md-2 ${this.state.files.length > 0 ? "": "d-none"}`} style={{position: "absolute", top: "40px", right: 0}}>Delete All</button>
          <div className="row d-flex justify-content-around align-items-center text-center font-weight-bold text-success h5">
            Uploaded Files
          </div>
          <hr/>
          <ul className="">
            {
              this.state.files.length === 0 ?
                <li className="row mr-md-4 font-weight-bold d-flex justify-content-center align-items-center text-danger">
                  <div className="">No files found!</div> 
                </li>
                : this.state.files.map((item, key) => (
                  <Fragment key={key}>
                    <li key={key} className="row d-flex justify-content-around align-items-center">
                      <div className="text-success font-weight-bold">{key + 1} .</div>
                      <div className="p-1 d-flex flex-column justify-content-between">
                        <div className="text-success font-weight-bold">{item.fileName.substring(0, item.fileName.length > 25 ? 25 : item.fileName.length - 1)}</div>
                        <div className="d-flex justify-content-around align-items-center flex-row">
                          <div className=""> {item.size}</div>
                          <div className="ml-2 mr-2 font-weight-bold">.</div>
                          <div>{timeAgo.format(new Date(item.uploadedOn))}</div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-around align-items-center">
                        <button value={item._id} onClick={(e) => { this.downloadFileHandler(e.target.value) }} className="btn btn-sm btn-success text-white">download</button>
                        <button value={item._id} onClick={(e) => { this.deleteFileHandler(e.target.value) }} className="btn btn-sm btn-danger text-white">delete</button>
                      </div>
                    </li>
                    <hr />
                  </Fragment>
                ))}

          </ul>

        </div>
      );
  }
}
export default Download;
