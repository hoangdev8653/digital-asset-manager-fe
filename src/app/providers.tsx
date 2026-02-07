"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ReactNode, useEffect, useState } from "react";
import { useAuthInit } from "@/hooks/useAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ThemeProvider } from "@/components/theme-provider"
import { usePathname, useRouter } from "next/navigation";

function AuthInitializer({ children }: { children: ReactNode }) {
  const { data: accessToken, isLoading, isError } = useAuthInit();
  const router = useRouter();
  const pathname = usePathname();
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      // 1. Nếu đã login (có token) -> vào trang login/root thì về home
      if (accessToken && (pathname === "/login" || pathname === "/")) {
        router.push("/home");
      }
      // 2. Nếu chưa login (không có token) -> không phải login thì về login
      else if (!accessToken && pathname !== "/login") {
        router.push("/login");
      }

      setIsChecking(false);
    }
  }, [accessToken, isLoading, isError, pathname, router]);


  if (isLoading || isChecking) {
    return <div className="h-screen w-screen flex items-center justify-center bg-white">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
    </div>
  }

  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </ThemeProvider>
      </AuthInitializer>
    </QueryClientProvider>
  );
}
