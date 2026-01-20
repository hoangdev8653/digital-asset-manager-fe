"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Chỉ render sau khi mount để tránh lỗi hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button className="flex items-center gap-3 px-3 py-2 w-full text-muted hover:text-text transition-colors rounded-lg hover:bg-slate-700/10 dark:hover:bg-slate-700/30 group">
        <Sun className="w-5 h-5" />
        <span className="font-body font-medium text-sm group-hover:text-primary transition-colors">
          Loading...
        </span>
      </button>
    );
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="flex items-center gap-3 px-3 py-2 w-full text-muted hover:text-text transition-colors rounded-lg hover:bg-slate-700/10 dark:hover:bg-slate-700/30 group"
    >
      {theme === "dark" ? (
        <Moon className="w-5 h-5" />
      ) : (
        <Sun className="w-5 h-5" />
      )}
      <span className="font-body font-medium text-sm group-hover:text-primary transition-colors">
        {theme === "dark" ? "Dark Mode" : "Light Mode"}
      </span>
    </button>
  );
}
