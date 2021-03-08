import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Sma from "./Sma";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';

axios.defaults.baseURL = "http://localhost:8080";
//axios.defaults.headers.common["Authorization"] = "token";
//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(
  (request) => {
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Sma />
      </BrowserRouter>
    );
  }
}

export default App;
