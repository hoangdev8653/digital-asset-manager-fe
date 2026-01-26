
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deleteUser, getAllUser, getUser, lockAccount, unlockAccount, updateUser, createUser } from "@/apis/user"

export const useGetAllUser = () => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await getAllUser();
            return response
        },
        staleTime: 1000 * 6 * 5
    })
}

export const useGetUser = (id: string) => {
    return useQuery({
        queryKey: ["user"],
        queryFn: async () => {
            const response = await getUser(id);
            return response.data
        },
        staleTime: 1000 * 6 * 5
    })
}

export const useLockAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: lockAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}

export const useUnlockAccount = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: unlockAccount,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
        }
    })
}   