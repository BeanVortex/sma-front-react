import axios from "axios";
import * as actionTypes from "./actionTypes";


export const login = (username, password, push) => {
  return (dispatch) => {
    axios
      .post("/api/user/login/", {
        username,
        password,
      })
      .then((response) => {
        console.log(response);
        push("/");
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

export const signup = (email, username, password, push) => {
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
        push("/");
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
