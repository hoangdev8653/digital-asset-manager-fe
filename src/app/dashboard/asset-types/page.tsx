"use client"
import { Button } from "@/components/ui/button";
import { FileType, Plus, Settings2, Hash } from "lucide-react";
import { useGetAllAssetTypes } from "@/hooks/useAssetType";

export default function AssetTypesPage() {
  const {data: assetType, isLoading, error} = useGetAllAssetTypes()
  const assetTypes = [
    { name: "Images", count: 12, extensions: [".jpg", ".png", ".webp"] },
    { name: "Videos", count: 5, extensions: [".mp4", ".mov"] },
    { name: "Documents", count: 8, extensions: [".pdf", ".docx"] },
    { name: "Audio", count: 3, extensions: [".mp3", ".wav"] },
    { name: "3D Models", count: 2, extensions: [".obj", ".fbx"] },
    { name: "Archives", count: 4, extensions: [".zip", ".rar"] },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Định dạng tài sản
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Cấu hình các định dạng tệp tin được hỗ trợ và quy tắc xử lý
            metadata.
          </p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
          <Plus className="w-5 h-5" />
          <span>Thêm định dạng</span>
        </button>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(assetType?.data || []).map((type: any) => (
          <div
            key={type.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 text-slate-50 group-hover:text-blue-50 transition-colors">
              <FileType className="w-24 h-24" />
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600 border border-blue-100">
                <FileType className="w-6 h-6" />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {type.name}
                  </h3>
                  {/* <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-medium uppercase tracking-wider">
                    <Hash className="w-3 h-3" />
                    {type.count || 0} Assets
                  </div> */}
                </div>
                <Button className="text-slate-400 hover:text-slate-600 p-1">
                  <Settings2 className="w-4 h-4" />
                </Button>
              </div>

              <p className="text-slate-500 text-sm mt-3 font-medium line-clamp-3">
                {type.description || "Chưa có mô tả cho loại tài sản này."}
              </p>

              {/* Extensions Tags - Placeholder if needed, or removed if not in data */}
               {/* <div className="mt-5 flex flex-wrap gap-2">
                 <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-200">
                    OPEN
                 </span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
