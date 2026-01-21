import { axiosConfig } from "@/lib/axiosInstance";

export const getAllAssetType = async () => {
  return await axiosConfig({
    method: "GET",
    url: "/asset-types",
  });
};

export const getAssetType = async (id: string) => {
  return await axiosConfig({
    method: "GET",
    url: `/asset-types/${id}`,
  });
};

export const createAssetType = async (data: any) => {
  return await axiosConfig({
    method: "POST",
    url: "/asset-types",
    data: data,
  });
};

export const deleteAssetType = async (id: string) => {
  return await axiosConfig({
    method: "DELETE",
    url: `/asset-types/${id}`,
  });
};
