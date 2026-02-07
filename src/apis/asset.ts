import { axiosConfig } from "@/lib/axiosInstance";

export const getAllAssets = async (page?: number, limit?: number) => {
  return await axiosConfig({
    method: "GET",
    url: `/assets`,
    params: {
      page,
      limit,
    },
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

export const importFile = async (data: FormData) => {
  return await axiosConfig({
    method: "POST",
    url: "/assets/import-file",
    data,
  });
};

export const deleteAsset = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/assets/${id}`,
  });
};
