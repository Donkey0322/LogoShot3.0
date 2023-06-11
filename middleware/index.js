import POST from "./simplePost";
import GET from "./simpleGet";
import Put from "./simplePut";
import DELETE from "./simpleDelete";
import axios from "axios";
import Constants from "expo-constants";

const baseURL = `${
  Constants.expoConfig.extra.REACT_APP_SERVER_USE_HTTPS === "true"
    ? "https"
    : "http"
}://${Constants.expoConfig.extra.REACT_APP_SERVER_DOMAIN}:${
  Constants.expoConfig.extra.REACT_APP_SERVER_PORT
}`;

export default function middleware(token) {
  const instance = axios.create({
    baseURL,
    withCredentials: true,
  });
  return {
    ...POST(instance),
    ...DELETE(instance),
    ...GET(instance),
    ...Put(instance),
  };
}
