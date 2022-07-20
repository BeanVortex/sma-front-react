import { Navigate } from "react-router-dom";

export const setLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const saveTokens = (headers, body) => {
  const data = {
    access_token: headers.access_token,
    refresh_token: headers.refresh_token,
    user_id: body.id,
  };
  setLocalStorage("auth_data", JSON.stringify(data));
};

export const getStorageItem = (key) => {
  return localStorage.getItem(key);
};

// HTTP HEADERS ARE CASE INSENSITIVE
export const requestHeader = () => {
  const data = JSON.parse(getStorageItem("auth_data"));
  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
  };
};

export const redirect = (auth) => {
  let r = null;
  if (!auth) {
    r = <Navigate from="/" to="/login" />;
    if (isAuthenticated()) r = null;
  }
  return r;
};

export const clearLocalStorage = () => {
  if (isAuthenticated()) localStorage.removeItem("auth_data");
};

export const getAuthLocalData = () => {
  const data = JSON.parse(getStorageItem("auth_data"));

  return {
    refreshToken: data.refresh_token,
    accessToken: data.access_token,
    userId: data.user_id,
  };
};

export const isAuthenticated = () => {
  return getStorageItem("auth_data") ? true : false;
};


