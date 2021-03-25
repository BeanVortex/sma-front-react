import axios from "axios";
import * as actionTypes from "./actionTypes";
import { clearLocalStorage, getAuthLocalData, setLocalStorage } from "../../Utils/AuthUtil";

export const login = (username, password) => {
  return (dispatch) => {
    
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((response) => {
        setLocalStorage("refresh_token", response.headers.refresh_token);
        setLocalStorage("expiration", response.headers.expiration);
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
            userId: response.data.id,
            username: response.data.userName,
            email: response.data.email,
            profile: response.data.profile,
            accessToken: response.headers.access_token,
            refreshToken: response.headers.refresh_token,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };
};

export const signup = (email, username, password) => {
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
        setLocalStorage("refresh_token", response.headers.refresh_token);
        setLocalStorage("expiration", response.headers.expiration);
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
            userId: response.data.id,
            username: response.data.userName,
            email: response.data.email,
            profile: response.data.profile,
            accessToken: response.headers.access_token,
            refreshToken: response.headers.refresh_token,
          },
        });
      })
      .catch((error) => {
        console.log(error);
        return null;
      });
  };
};

export const mapAuthToState = () => {
  return (dispatch) => {
    return dispatch({
      type: actionTypes.AUTHED,
      payload: {
        ...getAuthLocalData(),
      },
    });
  };
};

export const logout = () => {
  clearLocalStorage();
  return {
    type: actionTypes.RESET_USER,
  };
};
