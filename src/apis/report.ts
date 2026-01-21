import { axiosConfig } from "@/lib/axiosInstance";

export const getAllReports = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/reports",
  });
};

export const getReport = async (id: string) => {
  return await axiosConfig({
    method: "GET",
    url: `/reports/${id}`,
  });
};

export const getReportByUser = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/reports/user",
  });
};

export const createReport = async (data: Record<string, any>) => {
  return await axiosConfig({
    method: "POST",
    url: "/reports",
    data,
  });
};

export const updateReport = async (id: string, data: Record<string, any>) => {
  return await axiosConfig({
    method: "PUT",
    url: `/reports/${id}`,
    data,
  });
};

export const deleteReport = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/reports/${id}`,
  });
};
