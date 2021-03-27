import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Sma from "./Sma";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import {
  setLocalStorage,
  requestHeader,
  isAuthenticated,
} from "../Utils/AuthUtil";
import { mapAuthToState } from "../store/actions/userAction";
//axios.defaults.baseURL = "https://sma-app-back.herokuapp.com";
axios.defaults.baseURL = "http://localhost:8080";
//axios.defaults.headers.common["Authorization"] = "token";

axios.interceptors.request.use(
  (request) => {
    if (isAuthenticated()) {
      let authHeaders = requestHeader();
      for (let header in authHeaders){
        request.headers[header] = authHeaders[header];
      }
    }
    console.log("[REQ]: ", request);
    return request;
  },
  (error) => {
    console.log("[REQ](ERR): ",error);
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    setLocalStorage("access_token", response.headers.access_token); 
    console.log("[RES]: ", response);
    return response;
  },
  (error) => {
    console.log("[RES](ERR): ", error);
    return Promise.reject(error);
  }
);

class App extends Component {
  checkStateAuth = () => {
    if (!this.props.user.userId && isAuthenticated()) {
      this.props.mapAuthToState();
    }
  };

  componentDidMount () {
    this.checkStateAuth();
  }

  render() {
    return (
      <BrowserRouter>
        <Sma />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    mapAuthToState: () => dispatch(mapAuthToState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
