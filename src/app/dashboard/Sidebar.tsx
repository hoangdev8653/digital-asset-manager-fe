"use client";

import Link from "next/link";
import {
  Home,
  Users,
  FileImage,
  FileType,
  BarChart3,
  Settings,
  ArrowUp,
  LogOut,
  Layers,
} from "lucide-react";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "../ThemeToggle";
import { useLogout } from "@/hooks/useAuth";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Assets", href: "/dashboard/assets", icon: FileImage },
  { name: "Asset Types", href: "/dashboard/asset-types", icon: FileType },
  { name: "Asset Assignments", href: "/dashboard/assignments", icon: ArrowUp },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export default function Sidebar() {
  const { mutate: logout } = useLogout();
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-surface border-r border-border min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/30">
          <Layers className="w-5 h-5 text-white" />
        </div>
        <h1 className="text-xl font-heading font-bold text-primary tracking-tight">
          DAM<span className="text-primary">Pro</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 group ${isActive
                ? "bg-blue-600 text-white shadow-md shadow-blue-900/20"
                : "text-slate-400 hover:bg-slate-700/30 hover:text-white"
                }`}
            >
              <item.icon
                className={`w-5 h-5 transition-colors ${isActive
                  ? "text-white"
                  : "text-slate-500 group-hover:text-secondary"
                  }`}
              />
              <span className="font-body font-medium text-sm">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-border space-y-2">
        {/* User Profile */}

        <ThemeToggle />
        <button className="flex items-center gap-3 px-3 py-2 w-full text-muted hover:text-text transition-colors rounded-lg hover:bg-slate-700/10 dark:hover:bg-slate-700/30 group cursor-pointer">
          <Settings className="w-5 h-5" />
          <span className="font-body font-medium text-sm group-hover:text-primary transition-colors">
            Settings
          </span>
        </button>
        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-3 py-2 w-full text-muted hover:text-red-500 transition-colors rounded-lg hover:bg-red-500/10 dark:hover:bg-red-500/10 group cursor-pointer"
        >
          <LogOut className="w-5 h-5 group-hover:text-red-500 transition-colors" />
          <span className="font-body font-medium text-sm">Logout</span>
        </button>
      </div>
    </aside>
  );
}
