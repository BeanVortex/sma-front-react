import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";
import Sma from "./Sma";
import axios from "axios";
//import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from "react-redux";
import { setCookie, requestHeader, isAuthenticated } from "../Utils/AuthUtil";
import { mapAuthToState } from "../store/actions/userAction";
axios.defaults.baseURL = "https://sma-app-back.herokuapp.com";
//axios.defaults.headers.common["Authorization"] = "token";
//axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";

axios.interceptors.request.use(
  (request) => {
    if (isAuthenticated()) {
      request.headers = requestHeader;
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
    setCookie(
      "accessToken",
      response.headers.accesstoken,
      response.headers.expiration
    );
    setCookie(
      "refreshToken",
      response.headers.refreshtoken,
      response.headers.expiration
    );
    return response;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class App extends Component {
  checkStateAuth = () => {
    if (!this.props.user.id) {
      this.props.mapAuthToState();
    }
  };

  render() {
    this.checkStateAuth();
    return (
      <BrowserRouter>
        <Sma />
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    mapAuthToState: () => dispatch(mapAuthToState()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
