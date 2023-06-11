import axios from "axios";

// axios.defaults.withCredentials = true
// const instance = axios.create({
//   baseURL: `http://140.112.106.82:8081/`,
//   withCredentials: true, //攜帶 cookie
// });
const instance = axios.create({
  baseURL: `http://localhost:5000`,
  withCredentials: true, //攜帶 cookie
});

instance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response)
);

export default instance;
