"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="flex items-center gap-3 px-3 py-2 w-full text-muted hover:text-text transition-colors rounded-lg hover:bg-slate-700/10 dark:hover:bg-slate-700/30 group"
    >
      <div className="relative w-5 h-5">
        <Sun className="absolute h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-orange-500" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-blue-400" />
      </div>
      <span className="font-body font-medium text-sm group-hover:text-primary transition-colors">
        Switch Theme
      </span>
    </button>
  );
}
