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
axios.defaults.baseURL = "https://sma-app-back.herokuapp.com";
//axios.defaults.baseURL = "http://localhost:8080";
//axios.defaults.headers.common["Authorization"] = "token";

axios.interceptors.request.use(
  (request) => {
    console.log(request.headers.put);
    if (isAuthenticated()) {
      let authHeaders = requestHeader();
      for (let header in authHeaders){
        console.log(authHeaders[header]);
        request.headers[header] = authHeaders[header];
      }
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    console.log(response);
    setLocalStorage("access_token", response.headers.access_token); 
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class App extends Component {
  checkStateAuth = () => {
    if (!this.props.user.userId && isAuthenticated()) {
      this.props.mapAuthToState();
    }
  };

  render() {
    console.log(this.props.user);
    this.checkStateAuth();
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
