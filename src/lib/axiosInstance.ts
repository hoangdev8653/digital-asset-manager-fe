import axios from "axios";
import { BASE_URL_LOCAL } from "@/utils/constant";

// Biến lưu Access Token trong bộ nhớ (RAM)
// Sẽ bị mất khi reload trang, cần cơ chế lấy lại (Silent Refresh) khi app khởi động
let accessToken: string | null = null;
let isRefreshing = false;
let failedQueue: any[] = [];

// Hàm để cập nhật accessToken từ bên ngoài (ví dụ: sau khi login)
export const setAccessToken = (token: string | null) => {
  accessToken = token;
};

// Hàm xử lý hàng đợi các request bị lỗi 401 trong khi đang refresh token
const processQueue = (error: string, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

export const axiosConfig = axios.create({
  baseURL: BASE_URL_LOCAL,
  withCredentials: true,
});

axiosConfig.interceptors.request.use(
  function (config) {
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    console.log(error.message);
    return Promise.reject(error);
  },
);

axiosConfig.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // Nếu đang refresh, đẩy request vào hàng đợi
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosConfig(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Gọi API refresh token
        // Không cần gửi refreshToken trong body vì nó đã nằm trong HttpOnly Cookie
        // withCredentials: true là bắt buộc để cookie được gửi đi
        const response = await axios.post(
          "http://localhost:3007/user/refreshToken",
          {},
          { withCredentials: true },
        );

        if (response.status !== 200) {
          throw new Error("Refresh token failed");
        }

        const newAccessToken = response.data?.newToken?.accessToken;

        if (!newAccessToken) {
          throw new Error("No access token returned");
        }

        // Cập nhật token vào bộ nhớ
        setAccessToken(newAccessToken);

        // Xử lý các request đang chờ
        processQueue(null, newAccessToken);
        isRefreshing = false;

        // Thử lại request ban đầu
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axios(originalRequest);
      } catch (error: any) {
        processQueue(error, null);
        isRefreshing = false;
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
