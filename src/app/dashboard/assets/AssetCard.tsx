"use client";

import { FileImage, Eye, MoreVertical, Edit, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDate } from "@/utils/format";
import { AssetCardProps } from "@/types/asset";

export default function AssetCard({ asset, onViewDetail }: AssetCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300">
      <div className="h-44 bg-slate-100 flex items-center justify-center relative overflow-hidden">
        <FileImage className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-300" />

        <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <Button
            onClick={() => onViewDetail(asset)}
            className="bg-white text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
          >
            <Eye className="w-5 h-5" />
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="bg-white text-slate-700 hover:bg-blue-50 p-2 rounded-lg ring-0 outline-none">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2"
            >
              <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer">
                <Edit className="w-4 h-4" /> Sửa tài sản
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                <Trash className="w-4 h-4" /> Xóa tài sản
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-600 px-2 py-0.5 rounded shadow-sm uppercase">
          {asset.assetType?.name || "FILE"}
        </span>
      </div>

      {/* Info Area */}
      <div className="p-4 bg-white">
        <h3
          className="text-slate-900 font-bold text-sm truncate group-hover:text-blue-600 transition-colors"
          title={asset.title}
        >
          {asset.title}
        </h3>
        <div className="flex items-center gap-2 mt-1">
          <span
            className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${
              asset.status === "available"
                ? "bg-emerald-100 text-emerald-700"
                : "bg-slate-100 text-slate-500"
            }`}
          >
            {asset.status === "available" ? "Có sẵn" : "Đã cấp"}
          </span>
          <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
          <span className="text-slate-400 text-xs font-medium italic">
            {formatDate(asset.expired_at)}
          </span>
        </div>
      </div>
    </div>
  );
}
