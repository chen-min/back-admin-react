import axios from "axios";
import { showLoading, hideLoading } from "./loading";
import storage from "./storage";
import { message } from "./Message";
import { Result } from "@/types/api";

const env = import.meta.env;

const request = axios.create({
  timeout: 10000,
  withCredentials: true,
  baseURL: "/api",
  timeoutErrorMessage: "The request timed out. Please try again later",
  headers: {
    icode: "",
  },
});

request.interceptors.request.use(
  (config) => {
    if (config.showLoading) showLoading();
    const token = storage.get("token");
    if (token) {
      config.headers.Authorization = "Bearer " + token;
    }
    return {
      ...config,
    };
  },
  (err) => {
    return Promise.reject(err);
  }
);
request.interceptors.response.use(
  (res) => {
    const data: Result = res.data;
    // hideLoading();
    if (res.config.responseType === "blob") return res;
    if (data.code === 500001) {
      message.error(data.msg);
      storage.remove("token");
      location.href = "/login?callback=" + encodeURIComponent(location.href);
    } else if (data.code != 0) {
      if (res.config.showError === false) {
        return Promise.resolve(data);
      } else {
        message.error(data.msg);
        return Promise.reject(data);
      }
    }
    return data.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);

interface moreConfig {
  showLoading?: boolean;
  showError?: boolean;
}

export default {
  get<T>(
    url: string,
    params?: object,
    options: moreConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return request.get(url, { params, ...options });
  },
  post<T>(
    url: string,
    params?: object,
    options: moreConfig = { showLoading: true, showError: true }
  ): Promise<T> {
    return request.post(url, params, options);
  },
};
