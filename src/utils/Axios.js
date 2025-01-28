import axios from "axios";
import { BASE_URL } from 'config/config';

const baseurl = BASE_URL


export const Axios = axios.create({
  baseURL: baseurl,
});

Axios.interceptors.request.use((config) => {
  const token = JSON.parse(localStorage.getItem('token'));

  if (token) {
    config.headers.Authorization =`Bearer ${token}`;
  }

  return config;
});

Axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (401 === error?.response?.status) {
      // window.location = "/";
    } else if ("Request failed with status code 500" === error.message || error?.response?.status >= 500) {
      return Promise.reject({
        ...error,
        message: "It's not you, it's us. Try again later.",
      });
    } else {
      return Promise.reject(error);
    }
  }
);