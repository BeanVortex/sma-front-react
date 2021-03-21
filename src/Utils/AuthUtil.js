import { Redirect } from "react-router-dom";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getStorageItem = (key) => {
  return localStorage.getItem(key);
};

// HTTP HEADERS ARE CASE INSENSITIVE
export const requestHeader = () => {
  const AccessToken = getStorageItem("accessToken");
  const RefreshToken = getStorageItem("refreshToken");
  const UserId = getStorageItem("userId");
  return {
    AccessToken,
    RefreshToken,
    UserId,
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

const isTokenExpired = () => {
  let expireDate = new Date(getStorageItem("expiration"));
  if (new Date() > expireDate) {
    clearLocalStorage();
    return true;
  }
  return false;
};
