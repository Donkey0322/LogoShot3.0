import axios from "axios";
import Constants from "expo-constants";

const baseURL = `${
  Constants.expoConfig?.extra?.REACT_APP_SERVER_USE_HTTPS === "true"
    ? "https"
    : "http"
}://${Constants.expoConfig?.extra?.REACT_APP_SERVER_DOMAIN}:${
  Constants.expoConfig?.extra?.REACT_APP_SERVER_PORT
}`;

const instance = axios.create({
  baseURL,
  withCredentials: true,
});

instance.interceptors.request.use(
  function (config) {
    console.log("REQ", config.method, config.url, config.data);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
instance.interceptors.response.use(
  function (response) {
    console.log("RES", response.status, response.config.url, response.data);
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export default instance;
