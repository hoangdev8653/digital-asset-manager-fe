import { ArrowUpRight, HardDrive, Users, Activity, Plus } from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white">
            Dashboard
          </h2>
          <p className="text-slate-400 mt-2 font-body">
            Welcome back! Here is your digital asset portfolio overview.
          </p>
        </div>
        <button className="bg-cta hover:bg-orange-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Upload Asset</span>
        </button>
      </div>

      {/* Stats Grid - Using Surface Color & Minimal Glow */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Total Assets",
            value: "12,450",
            icon: HardDrive,
            color: "text-primary",
            bg: "bg-blue-500/10",
          },
          {
            label: "Active Users",
            value: "1,203",
            icon: Users,
            color: "text-green-400",
            bg: "bg-green-500/10",
          },
          {
            label: "Storage Used",
            value: "85%",
            icon: Activity,
            color: "text-secondary",
            bg: "bg-blue-400/10",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-surface p-6 rounded-xl border border-slate-700/50 hover:border-primary/50 transition-all duration-300 group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-400 font-body text-sm font-medium">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-heading font-bold text-white mt-2">
                  {stat.value}
                </h3>
              </div>
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm text-slate-400">
              <ArrowUpRight className="w-4 h-4 text-green-400 mr-1" />
              <span className="text-green-400 font-medium">+12%</span>
              <span className="ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity Placeholder */}
      <div className="bg-surface rounded-xl border border-slate-700/50 p-6 min-h-[300px]">
        <h3 className="text-xl font-heading font-semibold text-white mb-6">
          Recent Uploads
        </h3>
        <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-700/50 rounded-lg text-slate-500">
          <p>No recent activity found</p>
        </div>
      </div>
    </div>
  );
}
