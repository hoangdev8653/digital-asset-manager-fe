import { axiosConfig } from "@/lib/axiosInstance";

export const getAllNotifications = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/notifications",
  });
};

export const getNotificationByUser = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/notifications/me",
  });
};

export const updateStatusNotification = async (id: string) => {
  return await axiosConfig({
    method: "PATCH",
    url: `/notifications/${id}`,
  });
};

export const deleteNotification = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/notifications/${id}`,
  });
};
