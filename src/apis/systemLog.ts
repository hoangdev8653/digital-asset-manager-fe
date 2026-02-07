import { axiosConfig } from "@/lib/axiosInstance";

export const getAllSystemLogs = async (page?: number, limit?: number) => {
    return await axiosConfig({
        method: "GET",
        url: `/system-logs?page=${page}&limit=${limit}`
    })
};

export const getSystemLogById = async (id: string) => {
    return await axiosConfig({
        method: "GET",
        url: `/system-logs/${id}`
    })
};

export const createSystemLog = async (data: any) => {
    return await axiosConfig({
        method: "POST",
        url: "/system-logs",
        data
    })
};

export const updateSystemLog = async (id: string, data: any) => {
    return await axiosConfig({
        method: "PUT",
        url: `/system-logs/${id}`,
        data
    })
};

export const deleteSystemLog = async (id: string) => {
    return await axiosConfig({
        method: "DELETE",
        url: `/system-logs/${id}`
    })
};
