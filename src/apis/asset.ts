import { axiosConfig } from "@/lib/axiosInstance";


export const getAllAssets = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/assets",
  });
};

export const getAssetById = async (id: string) => {
  return await axiosConfig({
    method: "GET",
    url: `/assets/${id}`,
  });
};

export const createAsset = async (data: any) => {
  return await axiosConfig({
    method: "POST",
    url: "/assets",
    data: data,
  });
};

export const deleteAsset = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/assets/${id}`,
  });
};
