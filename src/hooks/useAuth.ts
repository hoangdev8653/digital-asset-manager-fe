import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, refreshToken, getMe } from "@/apis/auth";
import { setAccessToken } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response: any) => {
      const access_token = response.data?.access_token || response.data?.data?.access_token;

      setAccessToken(access_token);
      queryClient.setQueryData(["auth-init"], access_token);

      toast.success("Đăng nhập thành công ✅");

      try {
        const userResponse = await getMe();
        setUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }
      const role = useAuthStore.getState().user?.data?.data?.role;
      if (role === "ADMIN") {
        router.push("/dashboard");
      } else if (role === "USER") {
        router.push("/home");
      } else {
        router.push("/login");
      }
    },

    onError: (error: any) => {
      console.error("Login failed:", error);
      const message = error?.response?.data?.message || "Đăng nhập thất bại ❌";
      toast.error(message);
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { logout: logoutStore } = useAuthStore();

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. Xóa token trong RAM
      setAccessToken(null);
      logoutStore();

      // 2. Xóa cache dữ liệu cũ của user
      queryClient.clear();

      // 3. Chuyển về trang login
      router.push("/login");
    },
  });
};

export const useGetMe = () => {
  return useQuery({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await getMe();
      return response.data;
    },
    retry: false,
  });
}

// Hook này dùng để khôi phục phiên đăng nhập khi F5
export const useAuthInit = () => {
  const { setUser } = useAuthStore();

  return useQuery({
    queryKey: ["auth-init"],
    queryFn: async () => {
      try {
        const response = await refreshToken();
        const access_token = response?.data?.access_token || response?.data?.data?.access_token;
        if (access_token) {
          setAccessToken(access_token);
          // Fetch user info immediately after restoring token
          try {
            const userResponse = await getMe();
            setUser(userResponse?.data);
          } catch (e) {
            console.error("Error fetching user detail", e);
          }
        }
        return access_token || null;
      } catch (error: any) {
        // Nếu lỗi 401 (refresh token hết hạn/không có), coi như là khách (Guest) -> return null
        if (error.response?.status === 401) {
          return null;
        }
        // Nếu lỗi khác (mạng, server 500), throw để React Query retry
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: 1,
    staleTime: Infinity,
  });
};
