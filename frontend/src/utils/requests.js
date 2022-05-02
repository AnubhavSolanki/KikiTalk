import qs from "qs";
import axios from "axios";
import { errorToast } from "./toaster";
import { removeDataFromLocalStorage } from "./manageLocalStorage";

export const post = async (url, data = {}, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      if (err?.response?.data?.message) {
        if (err?.response?.data?.message === "Invalid Token") {
          removeDataFromLocalStorage(["token"]);
        } else {
          errorToast(err?.response?.data?.message);
        }
      } else {
        errorToast(err.message);
      }
      reject(err);
    }
  });
};

export const get = async (url, options = {}) => {
  return new Promise(async (resolve, reject) => {
    try {
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
      if (err?.response?.data?.message) {
        errorToast(err?.response?.data?.message);
      } else {
        errorToast(err.message);
      }
      reject(err);
    }
  });
};
