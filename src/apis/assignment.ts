import { axiosConfig } from "@/lib/axiosInstance";

export const getAllAssignments = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/assignments",
  });
};

export const getAssignment = async (id: string) => {
  return await axiosConfig({
    method: "GET",
    url: `/assignments/${id}`,
  });
};

export const createAssignment = async (data: any) => {
  return await axiosConfig({
    method: "POST",
    url: "/assignments",
    data: data,
  });
};

export const deleteAssignment = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/assignments/${id}`,
  });
};
