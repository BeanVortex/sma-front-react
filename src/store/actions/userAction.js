import axios from "axios";
import * as actionTypes from "./actionTypes";

export const login = (username, password) => {
  return (dispatch) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        return dispatch({
          type: actionTypes.SET_AUTH,
          payload: {
            id: response.data.id,
            username: response.data.username,
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
