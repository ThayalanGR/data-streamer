import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import './css/common.css';
import './css/videoplayer.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

toast.configure()


ReactDOM.render(<App />, document.getElementById("root")
);
