import { axiosConfig } from "@/lib/axiosInstance";

export const getAllUser = async (page?: number, limit?: number) => {
  return await axiosConfig({
    method: "get",
    url: "/users",
    params: {
      page,
      limit
    }
  });
};

export const getProfile = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/users/me",
  });
};

export const getUser = async (id: string) => {
  return await axiosConfig({
    method: "GET",
    url: `/users/${id}`,
  });
};

export const updateUser = async (id: string, data: Record<string, any>) => {
  return await axiosConfig({
    method: "PUT",
    url: `/users/${id}`,
    data,
  });
};

export const deleteUser = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/users/${id}`,
  });
};

export const lockAccount = async (id: string) => {
  return await axiosConfig({
    method: "PATCH",
    url: `/users/${id}/lock`,
  });
};

export const unlockAccount = async (id: string) => {
  return await axiosConfig({
    method: "PATCH",
    url: `/users/${id}/unlock`,
  });
};

export const createUser = async (data: Record<string, any>) => {
  return await axiosConfig({
    method: "POST",
    url: "/auth/register",
    data,
  });
};
