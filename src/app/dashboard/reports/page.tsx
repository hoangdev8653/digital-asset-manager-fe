import {
  BarChart3,
  Download,
  Calendar,
  ArrowUpRight,
  TrendingUp,
} from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Báo cáo hệ thống
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Phân tích dữ liệu sử dụng và các chỉ số hiệu suất của tài sản số.
          </p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold border border-slate-200 transition-all flex items-center gap-2 shadow-sm">
            <Calendar className="w-4 h-4 text-blue-600" />
            <span>30 ngày qua</span>
          </button>
          <button className="bg-[#3b82f6] hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2">
            <Download className="w-5 h-5" />
            <span>Xuất file CSV</span>
          </button>
        </div>
      </div>

      {/* Summary Cards for Reports */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Băng thông đã dùng",
            value: "1.2 TB",
            trend: "+8%",
            color: "blue",
          },
          {
            label: "Tốc độ phản hồi",
            value: "124ms",
            trend: "-12%",
            color: "emerald",
          },
          {
            label: "Lượt tải về",
            value: "45.2k",
            trend: "+24%",
            color: "orange",
          },
        ].map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                {item.label}
              </p>
              <p className="text-2xl font-black text-slate-900 mt-1">
                {item.value}
              </p>
            </div>
            <div
              className={`text-${item.color}-500 bg-${item.color}-50 p-2 rounded-lg`}
            >
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Storage Usage Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-blue-600" />
                Dung lượng lưu trữ
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Thống kê theo phân loại tệp tin
              </p>
            </div>
            <span className="text-blue-600 font-bold text-xs bg-blue-50 px-2 py-1 rounded flex items-center">
              <ArrowUpRight className="w-3 h-3 mr-1" /> Chi tiết
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 group hover:bg-slate-50 transition-colors">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
              <BarChart3 className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold">
              Biểu đồ đang được khởi tạo
            </p>
            <p className="text-slate-300 text-xs mt-1 italic">
              Dữ liệu tự động cập nhật sau mỗi 5 phút
            </p>
          </div>
        </div>

        {/* Activity Activity Chart */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col min-h-[400px]">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-[#ff6b00]" />
                Hoạt động tải lên
              </h3>
              <p className="text-sm text-slate-400 font-medium">
                Tần suất tải file theo thời gian thực
              </p>
            </div>
            <span className="text-emerald-600 font-bold text-xs bg-emerald-50 px-2 py-1 rounded">
              Ổn định
            </span>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50/50 group hover:bg-slate-50 transition-colors">
            <div className="w-16 h-16 bg-white rounded-full shadow-sm flex items-center justify-center mb-4 border border-slate-100 group-hover:scale-110 transition-transform">
              <TrendingUp className="w-8 h-8 text-slate-300" />
            </div>
            <p className="text-slate-400 font-bold">Biểu đồ hoạt động</p>
            <p className="text-slate-300 text-xs mt-1 italic">
              Vui lòng đợi trong giây lát...
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
