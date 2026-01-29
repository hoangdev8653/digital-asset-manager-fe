import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllNotifications, getNotificationByUser, deleteNotification, updateStatusNotification } from "@/apis/notification"

export const useGetAllNotifications = () => {
    return useQuery({
        queryKey: ["notification", "all"],
        queryFn: async () => {
            const response = await getAllNotifications();
            return response;
        },
        staleTime: 1000 * 6 * 5,
    });
};

export const useGetNotificationByUser = () => {
    return useQuery({
        queryKey: ["notification", "user"],
        queryFn: async () => {
            const response = await getNotificationByUser();
            return response;
        },
        staleTime: 1000 * 6 * 5,
    });
};

export const useUpdateStatusNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id: string) => updateStatusNotification(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification", "user"] });
        },
    });
};

export const useDeleteNotification = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: deleteNotification,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["notification"] });
        },
    });
};
