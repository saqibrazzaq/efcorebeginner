import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    console.log("Log inside axiosconfig.js")
    console.log(err);
    
    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  (config) => {
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);