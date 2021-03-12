import axios from "axios";
import * as actionTypes from "./actionTypes";

const fetchLoginData = (username, password) => {
  axios
    .post(
      "/api/user/login/",
      {
        username,
        password,
      },
      {
        headers: {
          Accept: "*/*",
        },
      }
    )
    .then((response) => {
      console.log(response);
      return response.body;
    })
    .catch((error) => {
      console.log(error);
      return null;
    });
};

export const login = (username, password) => {
  return {
    type: actionTypes.SET_AUTH,
    payload: fetchLoginData(username, password),
  };
};
