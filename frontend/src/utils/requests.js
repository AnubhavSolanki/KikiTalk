import qs from "qs";
import axios from "axios";
import { errorToast } from "./toaster";
import { removeDataFromLocalStorage } from "./manageLocalStorage";
import { getEnvironment } from "./getEnvironment";

const extractError = (err) => {
  if (
    typeof err?.response?.data === "string" ||
    err?.response?.data instanceof String
  ) {
    return err?.response?.data;
  } else if (err?.response?.data?.message) {
    if (err?.response?.data?.message === "Invalid Token") {
      removeDataFromLocalStorage(["token"]);
    } else {
      return err?.response?.data?.message;
    }
  } else {
    return err.message;
  }
};

export const getUrl = (url) => {
  if (getEnvironment() !== "production") {
    url = url.replace(
      process.env.REACT_APP_BASE_URL,
      process.env.REACT_APP_BASE_URL_DEV
    );
  }
  return url;
};

export const post = async (url, data = {}, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      url = getUrl(url);
      const token = await localStorage.getItem("token");
      options = {
        ...options,
        headers: { Authentication: token },
      };
      const response = await axios.post(url, qs.stringify(data), options);
      if (response.status === 200) {
        resolve(response);
      }
    } catch (err) {
      errorToast(extractError(err));
      reject(err);
    }
  });
};

export const get = async (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
      url = getUrl(url);
      const token = await localStorage.getItem("token");
      options = {
        ...options,
        headers: { Authentication: token },
      };
      const response = await axios.get(url, options);
      if (response.status === 200) {
        resolve(response);
      }
    } catch (err) {
      errorToast(extractError(err));
      reject(err);
    }
  });
};
