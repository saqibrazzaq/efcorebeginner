import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

api.interceptors.response.use(
  (res) => {
    // Calculate response time
    const currentTime = new Date().getTime();
    const startTime = res.config.headers["request-startTime"];
    res.headers["request-duration"] = currentTime - startTime;

    console.log(
      millisToMinutesAndSeconds(res.headers["request-duration"]) +
        " - " +
        res.request.responseURL
    );
    return res;
  },
  async (err) => {
    console.log("Log inside axiosconfig.js");
    console.log(err);

    return Promise.reject(err);
  }
);

api.interceptors.request.use(
  (config) => {
    config.headers["request-startTime"] = new Date().getTime();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);

  return seconds == 60
    ? minutes + 1 + ":00"
    : minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
}
