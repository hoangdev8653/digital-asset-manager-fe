import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, refreshToken, getMe } from "@/apis/auth";
import { setAccessToken } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthStore } from "@/store/auth";

export const useLogin = () => {
  const router = useRouter();
  const { setUser } = useAuthStore();

  return useMutation({
    mutationFn: login,
    onSuccess: async (response: any) => {
      const { access_token } = response.data;

      setAccessToken(access_token);
      toast.success("Đăng nhập thành công ✅");

      try {
        const userResponse = await getMe();
        setUser(userResponse.data);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
      }

      setTimeout(() => {
        // Role check logic might need to be updated if user role comes from getMe
        // Assuming userResponse.data has role
        const role = useAuthStore.getState().user?.role;
        if (role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/home");
        }
      }, 1000);
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
        const { access_token } = response?.data;
        if (access_token) {
          setAccessToken(access_token);
          // Fetch user info immediately after restoring token
          const userResponse = await getMe();
          setUser(userResponse.data);
        }
        return access_token;
      } catch (error) {
        // Nếu lỗi (refresh token hết hạn), không làm gì cả, user sẽ ở trạng thái chưa login
        return null;
      }
    },
    // Chỉ chạy 1 lần khi mount, không tự động refetch
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retry: false,
    staleTime: Infinity,
  });
};
