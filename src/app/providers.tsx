"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/lib/react-query";
import { ReactNode } from "react";
import { useAuthInit } from "@/hooks/useAuth";

// Component con để xử lý logic khởi tạo Auth
function AuthInitializer({ children }: { children: ReactNode }) {
  // Gọi hook này để tự động lấy lại token khi F5
  useAuthInit();
  return <>{children}</>;
}

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthInitializer>{children}</AuthInitializer>
    </QueryClientProvider>
  );
}
