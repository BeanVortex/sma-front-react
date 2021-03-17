import axios from "axios";
import * as actionTypes from "./actionTypes";
import { clearCookies, setCookie } from "../../Utils/AuthUtil";

export const login = (username, password, push) => {
  return (dispatch) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((response) => {
        setCookie("id", response.data.id, response.headers.expiration);
        push("/");
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
            id: response.data.id,
            username: response.data.userName,
            email: response.data.email,
            profile: response.data.profile,
            accessToken: response.headers.accesstoken,
            refreshToken: response.headers.refreshtoken,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };
};

export const signup = (email, username, password, push) => {
  const data = new FormData();
  data.append("email", email);
  data.append("userName", username);
  data.append("password", password);
  return (dispatch) => {
    axios({
      url: "/api/user/signup/",
      method: "POST",
      data: data,
    })
      .then((response) => {
        setCookie("id", response.data.id, response.headers.expiration);
        push("/");
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
            id: response.data.id,
            username: response.data.userName,
            email: response.data.email,
            profile: response.data.profile,
            accessToken: response.headers.accesstoken,
            refreshToken: response.headers.refreshtoken,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };
};

export const checkAuth = () => {};

export const logout = () => {
  return (dispatch) => {
    clearCookies();
    return dispatch({
      type: actionTypes.RESET_USER,
    });
  };
};
