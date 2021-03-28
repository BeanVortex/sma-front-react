import { Redirect } from "react-router-dom";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorageItem = (key) => {
  return localStorage.getItem(key);
};

// HTTP HEADERS ARE CASE INSENSITIVE
export const requestHeader = () => {
  const access_token = getStorageItem("access_token");
  const refresh_token = getStorageItem("refresh_token");
  return {
    access_token,
    refresh_token,
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
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("user_id");
    localStorage.removeItem("expiration");
  }
};

export const getAuthLocalData = () => {
  return {
    refreshToken: localStorage.getItem("refresh_token"),
    accessToken: localStorage.getItem("access_token"),
    userId: localStorage.getItem("user_id"),
  };
};

export const isAuthenticated = () => {
  return getStorageItem("refresh_token") &&
    getStorageItem("access_token") &&
    getStorageItem("user_id")
    ? true
    : false;
};

const isTokenExpired = () => {
  let expireDate = new Date(getStorageItem("expiration"));
  console.log(new Date(),"\n", expireDate);
  console.log(new Date() > expireDate);
  if (new Date() < expireDate) {
    clearLocalStorage();
    return true;
  }
  return false;
};
