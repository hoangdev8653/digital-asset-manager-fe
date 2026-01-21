import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport, deleteReport, getAllReports, getReport, getReportByUser, updateReport } from "@/apis/report"

export const useGetAllReports = () => {
    return useQuery({
        queryKey: ["reports"],
        queryFn: async () => {
            const response = await getAllReports();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetReport = (id: string) => {
    return useQuery({
        queryKey: ["report", id],
        queryFn: async () => {
            const response = await getReport(id);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetReportByUser = () => {
    return useQuery({
        queryKey: ["report"],
        queryFn: async () => {
            const response = await getReportByUser();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};

export const useUpdateReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};

export const useDeleteReport = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteReport,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
        },
    });
};