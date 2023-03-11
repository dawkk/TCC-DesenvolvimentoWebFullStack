import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL
});

export default http;

/* http.interceptors.request.use(
  (config) => {

    const user = getUserLocalStorage()

    config.headers.Authorization = user?.jwt;

    return config;

  },
  (error) => {
    return Promise.reject(error)
  }
) */