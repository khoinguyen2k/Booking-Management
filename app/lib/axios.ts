import axios from "axios";

export const api = axios.create({
  baseURL: "/api",

  timeout: 10000,
});

api.interceptors.response.use(
  (response) => response,

  (error) => {
    const message = error.response?.data?.message || "Something went wrong";

    return Promise.reject({
      message,

      status: error.response?.status,
    });
  },
);
