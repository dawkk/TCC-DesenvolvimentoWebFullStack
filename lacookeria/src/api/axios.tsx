import axios from "axios";
import { getUserLocalStorage } from "../context/AuthProvider/util";

const http = axios.create({
  baseURL:'http://localhost:8000'
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