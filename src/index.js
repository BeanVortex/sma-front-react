import React from "react";
import { createRoot } from "react-dom/client";
import App from "./container/App";
import AuthProvider from "./context/AuthContext";
import axios from "axios";
import {
  isAuthenticated,
  requestHeader,
  setLocalStorage,
} from "./Utils/AuthUtil";
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

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
