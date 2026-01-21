import { axiosConfig } from "@/lib/axiosInstance";

export const getAllAssets = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/assets",
  });
};

export const createAsset = async (formData: FormData) => {
  return await axiosConfig({
    method: "POST",
    url: "/assets",
    data: formData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const deleteAsset = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/assets/${id}`,
  });
};
