import React, { useState, createContext } from "react";
import {
  clearLocalStorage,
  getAuthLocalData,
  saveTokens,
  setLocalStorage,
} from "../Utils/AuthUtil";
import axios from "axios";

const initialState = {
  userId: null,
  username: "",
  email: "",
  profile: "",
  accessToken: "",
  refreshToken: "",
  authenticated: false,
};

export const AuthContext = createContext({
  userAuth: initialState,
  setUserAuth: () => {},
  login: () => {},
  signup: () => {},
  mapAuthToContext: () => {},
  logout: () => {},
});

export default (props) => {
  const [userAuth, setUserAuth] = useState(initialState);

  const login = (username, password) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((response) => {
        saveTokens(response.headers);
        setUserAuth({
          userId: response.data.id,
          username: response.data.userName,
          email: response.data.email,
          profile: response.data.profile,
          accessToken: response.headers.access_token,
          refreshToken: response.headers.refresh_token,
          authenticated: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const signup = (email, username, password, passwordRepeat) => {
    const data = new FormData();
    data.append("email", email);
    data.append("userName", username);
    data.append("password", password);
    data.append("passwordRepeat", passwordRepeat);
    axios({
      url: "/api/user/signup/",
      method: "POST",
      data: data,
    })
      .then((response) => {
        saveTokens(response.headers, response.data);
        setUserAuth({
          userId: response.data.id,
          username: response.data.userName,
          email: response.data.email,
          profile: response.data.profile,
          accessToken: response.headers.access_token,
          refreshToken: response.headers.refresh_token,
          authenticated: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };

  const mapAuthToContext = () => {
    const payload = getAuthLocalData();
    setUserAuth({
      userId: payload.userId,
      accessToken: payload.accessToken,
      refreshToken: payload.refreshToken,
      authenticated: true,
    });
  };

  const logout = () => {
    clearLocalStorage();
    setUserAuth(initialState);
  };

  return (
    <AuthContext.Provider
      value={{ userAuth, setUserAuth, login, signup, mapAuthToContext, logout }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};
