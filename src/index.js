import React from "react";
import ReactDOM from "react-dom";
import App from "./container/App";
import AuthProvider from "./context/AuthContext";
import axios from "axios";

axios.defaults.baseURL = "http://localhost:8080";


axios.interceptors.request.use(
  (request) => {
    if (isAuthenticated()) {
      let authHeaders = requestHeader();
      for (let header in authHeaders) {
        request.headers[header] = authHeaders[header];
      }
    }
    console.log("[REQ]: ", request);
    return request;
  },
  (error) => {
    console.log("[REQ](ERR): ", error);
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

ReactDOM.render(
  <AuthProvider>
    <App />
  </AuthProvider>,
  document.getElementById("root")
);