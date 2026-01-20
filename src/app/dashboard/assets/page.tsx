import { Button } from "@/components/ui/button";
import {
  FileImage,
  Filter,
  Upload,
  MoreVertical,
  Search,
  Eye,
} from "lucide-react";

export default function AssetsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Tài sản số
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Duyệt và quản lý tất cả tệp tin đa phương tiện của hệ thống.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
            />
          </div>
          <Button className="bg-white hover:bg-slate-50 text-slate-700 px-4 py-2.5 rounded-xl font-bold border border-slate-200 transition-all flex items-center gap-2 shadow-sm">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </Button>
          <Button className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 flex items-center gap-2">
            <Upload className="w-5 h-5" />
            <span>Tải lên</span>
          </Button>
        </div>
      </div>

      {/* Grid Assets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div
            key={i}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
          >
            {/* Preview Area */}
            <div className="h-44 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <FileImage className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-300" />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                <Button className="bg-white text-blue-600 p-2 rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
                  <Eye className="w-5 h-5" />
                </Button>
                <Button className="bg-white text-slate-700 p-2 rounded-lg shadow-lg hover:bg-blue-50 transition-colors">
                  <MoreVertical className="w-5 h-5" />
                </Button>
              </div>

              {/* Tag định dạng */}
              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-600 px-2 py-0.5 rounded shadow-sm uppercase">
                JPG
              </span>
            </div>

            {/* Info Area */}
            <div className="p-4 bg-white">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <h3 className="text-slate-900 font-bold text-sm truncate group-hover:text-blue-600 transition-colors">
                    Hinh_anh_san_pham_{i}.jpg
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-slate-400 text-xs font-medium uppercase">
                      2.4 MB
                    </span>
                    <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-400 text-xs font-medium italic">
                      12/01/2026
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
