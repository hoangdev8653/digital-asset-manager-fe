import { BarChart3, Download, Calendar } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-heading font-bold text-white">
            Reports
          </h2>
          <p className="text-slate-400 mt-2 font-body">
            System usage analytics and performance metrics.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-surface hover:bg-slate-700 text-white px-4 py-2.5 rounded-lg font-medium border border-slate-700/50 transition-all flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>Last 30 Days</span>
          </button>
          <button className="bg-primary hover:bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium transition-all shadow-lg shadow-blue-500/20 flex items-center gap-2">
            <Download className="w-5 h-5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-surface p-6 rounded-xl border border-slate-700/50 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            Storage Usage
          </h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-700/30 rounded-lg">
            <p className="text-slate-500">Chart Placeholder</p>
          </div>
        </div>
        <div className="bg-surface p-6 rounded-xl border border-slate-700/50 min-h-[300px] flex flex-col">
          <h3 className="text-lg font-heading font-semibold text-white mb-4 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-secondary" />
            Upload Activity
          </h3>
          <div className="flex-1 flex items-center justify-center border-2 border-dashed border-slate-700/30 rounded-lg">
            <p className="text-slate-500">Chart Placeholder</p>
          </div>
        </div>
      </div>
    </div>
  );
}
