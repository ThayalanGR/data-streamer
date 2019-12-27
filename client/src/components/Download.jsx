import React, { Component, Fragment } from "react";
import Spinner from "./Spinner";
import constants from './constants';
import { toast } from "react-toastify";
import axios from 'axios'
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
// Add locale-specific relative date/time formatting rules.
TimeAgo.addLocale(en)
// Create relative date/time formatter.
const timeAgo = new TimeAgo('en-US')


class Download extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      files: [],
    };

    this.initialFetch = this.initialFetch.bind(this)
  }

  componentWillMount() {
    this.initialFetch()
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
        if (data.status) {
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

  async uploadSubtitleHandlerRequest(event, id) {
    // upload a new subtitle file and set path in the db
    let file = event.target.files[0];

    let fileName = file.name.trim();

    const data = new FormData();
    data.append("file", file);
    const requestId = fileName;
    let toastId = null;
    await axios
      .post(`${constants.baseUrl}/upload/${id}`, data, {
        requestId: requestId,
        onUploadProgress: p => {
          const progress = p.loaded / p.total;
          // check if we already displayed a toast
          if (toastId === null) {
            toastId = toast(
              `uploading ${fileName.substring(0, 18)}... ${Math.round(
                progress * 100,
                2
              )}%`,
              {
                progress: progress,
                position: "bottom-right",
                pauseOnFocusLoss: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                closeButton: true,
                onClose: () => {
                  axios.cancel(requestId);
                }
              }
            );
          } else {
            toast.update(toastId, {
              progress: progress,
              render: `uploading ${fileName.substring(0, 18)}... ${Math.round(
                progress * 100,
                2
              )}%`
            });
          }
        }
      })
      .then(res => {
        if (res.statusText === "OK") {
          toast.update(toastId, {
            type: toast.TYPE.SUCCESS,
            render: `${fileName.substring(0, 15)}... uploaded successfully`
          });
          this.initialFetch()
          setTimeout(function () {
            toast.dismiss(toastId);
          }, 2000);
        } else {
          toast.dismiss(toastId);
          toast(
            <div className="text-danger p-2">
              something went wrong on uploading {fileName.substring(0, 15)},
              try again!
            </div>
          );
        }
      })
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          toast(
            <div className="text-success p-2">
              upload cancelled -{fileName}
            </div>,
            {
              type: toast.TYPE.DEFAULT,
              hideProgressBar: true,
              autoClose: 2000,
              position: "bottom-center"
            }
          );
        } else {
          toast.dismiss(toastId);
          toast(
            <div className="text-danger p-2">
              something went wrong on uploading {fileName.substring(0, 15)},
              try again!
            </div>,
            {
              position: "bottom-center",
              autoClose: 2000
            }
          );
        }
      });

  }

  uploadSubtitleHandler(id, fileName) {
    if (this.state.subtitle !== null) {
      let newToastId = toast.success(
        <div className="container-fluid">
          <div className="row mb-2">
            <div className="col font-weight-bold">
              Upload a subtitle file for<br />
              {fileName}
            </div>
          </div>
          <div className="row mb-2">
            <div className="col">
              <div className="custom-file">
                <input type="file" className="custom-file-input form-control-sm" id="validatedCustomFile" onChange={(event) => {
                  const files = event.target.files;
                  const fileName = files[0].name.split(".")
                  const fileExtension = fileName[fileName.length - 1]
                  if (fileExtension.toLowerCase() === 'srt' || fileExtension.toLowerCase() === 'vtt') {
                    this.uploadSubtitleHandlerRequest(event, id)
                    toast.dismiss(newToastId);
                  } else {
                    toast.error("unsupported file format detected select only srt or vtt file format", {
                      position: "bottom-left",
                    })
                  }
                }
                } required />
                <label className="custom-file-label" htmlFor="validatedCustomFile">Choose subtitle file</label>
              </div>
            </div>
          </div>
        </div>, {
          position: "bottom-center",
          autoClose: false,
          progress: false,
          closeOnClick: false,
        })
    }
  }

  deleteSubtitleHandler(id) {
    // delete a subtile srt vtt file from server and update the subtitle path to null in db
    fetch(`${constants.baseUrl}/deletesubtitle/${id}`)
      .then(data => data.json())
      .then(data => {
        this.initialFetch()
        toast.success("Subtitle deleted successfully", {
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

  render() {
    return this.state.isLoading ? (
      <Spinner size={{ size: "large" }} />
    ) : (
        <div className="container-fluid mt-4 pt-5 pl-md-5 pr-md-5 text-center" style={{ position: "relative" }}>
          <div className="d-flex align-items-center justify-content-between">
            <div></div>
            <div className="row font-weight-bold text-success h5">
              Uploaded Files
            </div>
            <button onClick={() => { this.deleteAllFileHandler() }} className={`btn btn-sm btn-white text-danger rounded font-weight-bold m-1 mr-md-2 ${this.state.files.length > 0 ? "" : "d-none"}`} >Delete All</button>
          </div>
          <hr />
          <ul className="">
            {
              this.state.files.length === 0 ?
                <li className="row mr-md-4 font-weight-bold d-flex justify-content-center align-items-center text-danger">
                  <div className="">No files found!</div>
                </li>
                : this.state.files.map((item, key) => (
                  <Fragment key={key}>
                    <li key={key} className="row d-flex justify-content-between align-items-center">
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
                        {item.class === "video" ? item.subtitlePath != null ?
                          <button onClick={(e) => {
                            this.deleteSubtitleHandler(item._id)
                          }}
                            title="delete subtitle"
                            className="btn btn-link btn-transparent btn-sm"><i className="fas fa-closed-captioning text-danger fa-2x"></i></button>
                          :
                          <button onClick={async (e) => {
                            await this.setState({ subtitle: "hello" });
                            const fileName = item.fileName.substring(0, item.fileName.length > 25 ? 25 : item.fileName.length - 1)
                            this.uploadSubtitleHandler(item._id, fileName)
                          }}
                            title="add subtitle"
                            className="btn btn-link btn-transparent btn-sm"><i className="fas fa-closed-captioning text-success fa-2x"></i></button>
                          : null}
                        <a href={`${constants.baseUrl}/downloadfile/${item._id}`} onClick={(e) => { }} className="text-success"><i className="fas fa-download fa-1x"></i></a>
                        <button onClick={(e) => { this.deleteFileHandler(item._id) }} className="btn btn-sm btn-link btn-transparent"><i className="far fa-trash-alt text-danger fa-2x"></i></button>
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
