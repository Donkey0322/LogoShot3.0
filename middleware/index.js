import axios from "axios";
import Constants from "expo-constants";
import DELETE from "./simpleDelete";
import GET from "./simpleGet";
import POST from "./simplePost";
import Put from "./simplePut";

const baseURL = `${
  Constants.expoConfig.extra.REACT_APP_SERVER_USE_HTTPS === "true"
    ? "https"
    : "http"
}://${Constants.expoConfig.extra.REACT_APP_SERVER_DOMAIN}:${
  Constants.expoConfig.extra.REACT_APP_SERVER_PORT
}`;


const instance = axios.create({
  baseURL,
  withCredentials: true,
});

export default {
  ...POST(instance),
  ...DELETE(instance),
  ...GET(instance),
  ...Put(instance),
};
