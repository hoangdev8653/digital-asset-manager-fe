import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createReport, deleteReport, getAllReports, getReport, getReportByUser, updateReport } from "@/apis/report"
import { toast } from "react-toastify";

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
        mutationFn: ({ id, data }: { id: string; data: any }) => updateReport(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["reports"] });
            toast.success("Cập nhật báo cáo thành công");
        },
        onError: (error: any) => {
            toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi cập nhật báo cáo");
        }
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