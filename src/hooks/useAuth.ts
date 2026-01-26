import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { login, logout, refreshToken } from "@/apis/auth";
import { setAccessToken } from "@/lib/axiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export const useLogin = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: login,
    onSuccess: (response: any) => {
      const { accessToken, user } = response.data;
      setAccessToken(accessToken);
      toast.success("Đăng nhập thành công ✅");

      setTimeout(() => {
        if (user?.role === "ADMIN") {
          router.push("/dashboard");
        } else {
          router.push("/home");
        }
      }, 2000);
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

  return useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // 1. Xóa token trong RAM
      setAccessToken(null);

      // 2. Xóa cache dữ liệu cũ của user
      queryClient.clear();

      // 3. Chuyển về trang login
      router.push("/login");
    },
  });
};

// Hook này dùng để khôi phục phiên đăng nhập khi F5
export const useAuthInit = () => {
  return useQuery({
    queryKey: ["auth-init"],
    queryFn: async () => {
      try {
        const response = await refreshToken();
        const { accessToken } = response.data?.newToken || {};
        if (accessToken) {
          setAccessToken(accessToken);
        }
        return accessToken;
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
