import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllAssets, createAsset, deleteAsset } from "@/apis/asset";

export const useGetAllAssets = () => {
  return useQuery({
    queryKey: ["asset"],
    queryFn: async () => {
      const response = await getAllAssets();
      return response;
    },
    staleTime: 1000 * 6 * 5,
  });
};

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
