import {
  ArrowUpRight,
  HardDrive,
  Users,
  Activity,
  Plus,
  Search,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 bg-slate-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Tổng quan hệ thống
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Chào mừng trở lại! Đây là dữ liệu tài sản số của bạn hôm nay.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Tải lên tài sản</span>
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Tổng tài sản",
            value: "12,450",
            icon: HardDrive,
            color: "blue",
          },
          {
            label: "Người dùng",
            value: "1,203",
            icon: Users,
            color: "emerald",
          },
          {
            label: "Dung lượng dùng",
            value: "85%",
            icon: Activity,
            color: "indigo",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-2">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-sm">
              <span className="text-emerald-600 font-bold flex items-center">
                <ArrowUpRight className="w-4 h-4 mr-1" /> +12%
              </span>
              <span className="ml-2 text-slate-400 font-medium italic">
                tăng so với tháng trước
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">
            Hoạt động gần đây
          </h3>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm file..."
              className="pl-9 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            />
          </div>
        </div>

        <div className="flex flex-col items-center justify-center h-64">
          <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4 border border-dashed border-slate-300">
            <HardDrive className="w-8 h-8 text-slate-300" />
          </div>
          <p className="text-slate-500 font-bold">Chưa có dữ liệu hiển thị</p>
          <p className="text-slate-400 text-sm mt-1">
            Các file bạn tải lên sẽ xuất hiện tại đây.
          </p>
        </div>
      </div>
    </div>
  );
}
