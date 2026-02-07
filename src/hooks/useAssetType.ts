import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { createAssetType, deleteAssetType, getAllAssetType, getAssetType, updateAssetType } from "@/apis/assetType";

export const useGetAllAssetTypes = () => {
    return useQuery({
        queryKey: ["assetTypes"],
        queryFn: async () => {
            const response = await getAllAssetType();
            console.log(response.data);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useGetAssetType = (id: string) => {
    return useQuery({
        queryKey: ["assetType", id],
        queryFn: async () => {
            const response = await getAssetType(id);
            return response.data;
        },
        staleTime: 1000 * 60 * 5,
    });
};

export const useCreateAssetType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAssetType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assetTypes"] });
        },
    });
};

export const useUpdateAssetType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) => updateAssetType(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assetTypes"] });
        },
    });
};

export const useDeleteAssetType = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAssetType,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["assetTypes"] });
        },
    });
};

