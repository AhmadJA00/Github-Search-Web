import axios from "axios";

const baseURL = import.meta.env.VITE_BASE_API;
const token = import.meta.env.VITE_GITHUB_API_TOKEN;

export const HTTP = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/vnd.github+json",
    "Content-Type": "application/json",
    "X-GitHub-Api-Version": "2022-11-28",
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
