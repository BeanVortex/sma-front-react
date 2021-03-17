import Cookies from "universal-cookie";
import {Redirect} from "react-router-dom";
const cookie = new Cookies();

export const setCookie = (key, value, expire) => {
  cookie.set(key, value, { expires: extractDate(expire) });
};

export const getCookie = (key) => {
    return cookie.get(key);
};


export const requestHeader = () => {
    return {
        AccessToken: getCookie("accessToken"),
        RefreshToken: getCookie("refreshToken"),
        UserId: getCookie("id"),
      };
};

export const redirect = (auth) => {
  let r = null;
  if (!auth) {
    r = <Redirect from="/" to="/login" />;
    if (isAuthenticated()){
      r = null;
    }
  }
  return r;
};


export const clearCookies = () => {
  if (isAuthenticated()){
    cookie.remove("accessToken");
    cookie.remove("refreshToken");
    cookie.remove("id");
  }
};

export const isAuthenticated = () => {
 return getCookie("refreshToken") && getCookie("accessToken") && getCookie("id") ? true : false;
};

const extractDate = (date) => {
  return new Date(date);
};
