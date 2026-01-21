import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssignment, deleteAssignment, getAllAssignments, getAssignment } from "@/apis/assignment"

export const useGetAllAssignments = () => {
    return useQuery({
        queryKey: ["assignments"],
        queryFn: async () => {
            const response = await getAllAssignments();
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetAssignment = (id: string) => {
    return useQuery({
        queryKey: ["assignment", id],
        queryFn: async () => {
            const response = await getAssignment(id);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateAssignment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
        },
    });
};

export const useDeleteAssignment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAssignment,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assignments"] });
        },
    });
};