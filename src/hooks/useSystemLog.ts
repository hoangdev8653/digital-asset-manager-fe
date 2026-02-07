import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllSystemLogs, getSystemLogById, createSystemLog, updateSystemLog, deleteSystemLog } from "@/apis/systemLog"

import { SystemLogsResponse } from "@/types/systemLog";

export const useGetAllSystemLogs = (page?: number, limit?: number) => {
    return useQuery<SystemLogsResponse>({
        queryKey: ["system-logs", "list", page, limit],
        queryFn: async () => {
            const response = await getAllSystemLogs(page, limit);
            return response.data;
        },
        staleTime: 1000 * 6 * 5,
    });
};

export const useGetSystemLogById = (id: string) => {
    return useQuery({
        queryKey: ["system-logs", "detail", id],
        queryFn: async () => {
            const response = await getSystemLogById(id)
            return response
        },
        enabled: !!id,
    })
}

export const useCreateSystemLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: createSystemLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["system-logs"] });
        },
    });
};

export const useUpdateSystemLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: updateSystemLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["system-logs"] });
        },
    });
};

export const useDeleteSystemLog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteSystemLog,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["system-logs"] });
        },
    });
};