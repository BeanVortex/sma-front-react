import { Redirect } from "react-router-dom";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorageItem = (key) => {
  return localStorage.getItem(key);
};

export const requestHeader = () => {
  return {
    AccessToken: getStorageItem("accessToken"),
    RefreshToken: getStorageItem("refreshToken"),
    UserId: getStorageItem("userId"),
  };
};

export const redirect = (auth) => {
  let r = null;
  if (!auth) {
    r = <Redirect from="/" to="/login" />;
    if (isAuthenticated() && !isTokenExpired()) {
      r = null;
    }
  }
  return r;
};

export const clearLocalStorage = () => {
  if (isAuthenticated()) {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userId");
  }
};

export const getAuthLocalData = () => {
  return {
    refreshToken: localStorage.getItem("refreshToken"),
    accessToken: localStorage.getItem("accessToken"),
    userId: localStorage.getItem("userId"),
  };
};

export const isAuthenticated = () => {
  return getStorageItem("refreshToken") &&
    getStorageItem("accessToken") &&
    getStorageItem("userId")
    ? true
    : false;
};

const isTokenExpired = (date) => {
  let expireDate = new Date(date)
  if (new Date() > expireDate){
    clearLocalStorage();
    return true;
  }
  return false;
};
