import React, { Component } from "react";
import Spinner from "./Spinner";
import axios from "axios";
import "./common.css";
import { toast } from "react-toastify";
import axiosCancel from "axios-cancel";

axiosCancel(axios, {
  debug: false // default
});

class Upload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.uploadHandler = this.uploadHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ isLoading: true });

    setTimeout(
      function() {
        this.setState({ isLoading: false });
      }.bind(this),
      1000
    );
  }

  async uploadHandler(file, fileName) {
    const data = new FormData();
    data.append("file", file);

    const requestId = fileName.trim();
    let toastId = null;

    await axios
      .post("http://localhost:4000/api/upload", data, {
        requestId: requestId,
        onUploadProgress: p => {
          const progress = p.loaded / p.total;

          // check if we already displayed a toast
          if (toastId === null) {
            toastId = toast(
              `uploading ${fileName.substring(0, 18)}... ${Math.round(progress * 100,2)}%`,
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
          setTimeout(function() {
            toast.dismiss(toastId);
          }, 2000);
        } else {
          toast.dismiss(toastId);
          toast.error(
            `something went wrong on uploading ${fileName.substring(
              0,
              15
            )}, try again!`,
            {
              position: "bottom-left",
              autoClose: 2000
            }
          );
        }
      })
      .catch(thrown => {
        if (axios.isCancel(thrown)) {
          toast(`upload cancelled - ${fileName}`, {
            type: toast.TYPE.INFO,
            hideProgressBar: true,
            autoClose: 2000,
            position: "bottom-left"
          });
        } else {
          toast.dismiss(toastId);
          toast.error(
            `something went wrong on uploading ${fileName.substring(
              0,
              15
            )}, try again!`,
            {
              position: "bottom-left",
              autoClose: 2000
            }
          );
        }
      });
  }

  onChangeHandler = async event => {
    if (event.target.files.length > 0) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        await this.uploadHandler(files[i], files[i].name);
      }
    }
  };

  render() {
    return this.state.isLoading ? (
      <Spinner size={{ size: "large" }} />
    ) : (
      <div className="container-fluid text-center">
        <div className="row">
          <div className="col">
            <form method="post" action="#" id="#">
              <div className="form-group files">
                <label className="font-weight-bold filesbefore">
                  <i
                    className="fas fa-upload text-success mr-3"
                    style={{ fontSize: "20px" }}
                  />{" "}
                  Upload Files or Drag &amp; Drop Here
                </label>
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={this.onChangeHandler}
                  className="form-control"
                  title=""
                  multiple
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
export default Upload;
