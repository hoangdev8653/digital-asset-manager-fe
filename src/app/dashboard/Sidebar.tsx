import Link from "next/link";
import {
  Home,
  Users,
  FileImage,
  FileType,
  BarChart3,
  Settings,
} from "lucide-react";

const navItems = [
  { name: "Overview", href: "/dashboard", icon: Home },
  { name: "Users", href: "/dashboard/users", icon: Users },
  { name: "Assets", href: "/dashboard/assets", icon: FileImage },
  { name: "Asset Types", href: "/dashboard/asset-types", icon: FileType },
  { name: "Reports", href: "/dashboard/reports", icon: BarChart3 },
];

export default function Sidebar() {
  return (
    <aside className="w-64 bg-surface border-r border-slate-700/50 min-h-screen flex flex-col fixed left-0 top-0 bottom-0 z-50">
      {/* Logo Area */}
      <div className="p-6 flex items-center gap-2">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <span className="font-heading font-bold text-white text-lg">D</span>
        </div>
        <h1 className="text-xl font-heading font-bold text-white tracking-tight">
          DAM<span className="text-primary">Pro</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 space-y-1 mt-4">
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="flex items-center gap-3 px-3 py-2.5 text-slate-400 hover:bg-slate-700/30 hover:text-white rounded-lg transition-all duration-200 group"
          >
            <item.icon className="w-5 h-5 text-slate-500 group-hover:text-secondary transition-colors" />
            <span className="font-body font-medium text-sm">{item.name}</span>
          </Link>
        ))}
      </nav>

      {/* Footer / Settings */}
      <div className="p-4 border-t border-slate-700/50">
        <button className="flex items-center gap-3 px-3 py-2 w-full text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-700/30">
          <Settings className="w-5 h-5" />
          <span className="font-body text-sm">Settings</span>
        </button>
      </div>
    </aside>
  );
}
