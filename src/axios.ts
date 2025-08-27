import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;
const token = import.meta.env.VITE_GITHUB_API_TOKEN;
console.log(token);

export const HTTP = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/vnd.github.v3+json",
    "Content-Type": "application/json",
  },
});

if (token) {
  HTTP.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

HTTP.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
