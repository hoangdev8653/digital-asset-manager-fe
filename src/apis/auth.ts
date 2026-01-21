import { axiosConfig } from "@/lib/axiosInstance";

export const login = async (data: any) => {
  return await axiosConfig({
    method: "POST",
    url: "/auth/login",
    data: data,
  });
};

export const logout = async () => {
  return await axiosConfig({
    method: "POST",
    url: "/auth/logout",
  });
};

export const refreshToken = async () => {
  return await axiosConfig({
    method: "POST",
    url: "/user/refreshToken",
  });
};
