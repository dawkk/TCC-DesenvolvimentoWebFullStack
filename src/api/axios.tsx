import axios from "axios";

const http = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
 /*  
 With this habilitated cors errors happen
 withCredentials: true */
});

export default http;
