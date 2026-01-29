import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAssets, getAssetById, createAsset, deleteAsset } from "@/apis/asset";

export const useGetAllAssets = () => {
  return useQuery({
    queryKey: ["assets", "list"],
    queryFn: async () => {
      const response = await getAllAssets();
      return response;
    },
    staleTime: 1000 * 6 * 5,
  });
};

export const useGetAssetById = (id: string) => {
  return useQuery({
    queryKey: ["assets", "detail", id],
    queryFn: async () => {
      const response = await getAssetById(id)
      return response
    },
    enabled: !!id,
  })
}

export const useCreateAsset = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};

export const useDeleteAsset = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteAsset,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["assets"] });
    },
  });
};
