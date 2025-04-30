import Axios, { InternalAxiosRequestConfig } from "axios";

export const api = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

function authRequestInterceptor(config: InternalAxiosRequestConfig) {
  if (config.headers) {
    config.headers.Accept = "application/json";
    const token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
  }
  return config;
}

api.interceptors.request.use(authRequestInterceptor);
