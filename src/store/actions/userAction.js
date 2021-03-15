import axios from "axios";
import * as actionTypes from "./actionTypes";
import Cookies from 'universal-cookie';

const cookie = new Cookies();


const extractDate = (date) => {
  return new Date(date);
}


export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        cookie.set("accessToken", response.headers.accesstoken);
        cookie.set("refreshToken", response.headers.refreshtoken, {expires: extractDate(response.headers.expiration)});
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
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

export const signup = (email, username, password) => {
  const data = new FormData();
  data.append("email", email);
  data.append("userName", username);
  data.append("password", password);
  return (dispatch) => {
    axios({
        url: "/api/user/signup/",
        method: "POST",
        data: data
      })
      .then((response) => {
        cookie.set("accessToken", response.headers.accesstoken, {expires: extractDate(response.headers.expiration)});
        cookie.set("refreshToken", response.headers.refreshtoken, {expires: extractDate(response.headers.expiration)});
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
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
