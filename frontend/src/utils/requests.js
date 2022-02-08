import qs from "qs";
import axios from "axios";

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
      console.log(err);
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
      console.log(err);
    }
  });
};
