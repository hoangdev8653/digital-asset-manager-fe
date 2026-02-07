"use client";

import {
  FileImage,
  X,
  Clock,
  Users,
  FileType,
  Shield,
  Download,
  MoreVertical,
} from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AssetDetailModalProps } from "@/types/asset";

export default function AssetDetailModal({
  selectedAsset,
  onClose,
}: AssetDetailModalProps) {
  return (
    <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-[90vw] md:max-w-5xl w-full h-[80vh] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-2xl flex flex-col md:flex-row">
        <Button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-white/50 hover:bg-white text-slate-500 hover:text-slate-900 transition-all backdrop-blur-sm"
        >
          <X className="w-5 h-5" />
        </Button>

        {/* Left: Preview Section */}
        <div className="w-full md:w-5/12 bg-slate-900 flex flex-col items-center justify-center p-8 relative overflow-hidden group">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-500 via-slate-900 to-black"></div>
          <div className="relative z-10 p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl transition-transform duration-500 group-hover:scale-105">
            <FileImage
              className="w-32 h-32 text-blue-400 drop-shadow-[0_0_15px_rgba(96,165,250,0.5)]"
              strokeWidth={1}
            />
          </div>
          <div className="mt-8 text-center relative z-10">
            <Badge className="bg-blue-500/20 text-blue-200 border border-blue-500/30 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider">
              {selectedAsset?.format || "ASSET"}
            </Badge>
          </div>
        </div>

        {/* Right: Details Section */}
        <div className="w-full md:w-7/12 bg-white flex flex-col h-full">
          <div className="px-8 py-6 border-b border-slate-100 flex-shrink-0">
            <div className="flex items-center gap-3 text-xs text-slate-400 font-bold uppercase tracking-wider mb-3">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" /> {selectedAsset?.uploadDate}
              </span>
              <span>•</span>
              <span>ID: {selectedAsset?.id?.slice(0, 8) || "N/A"}</span>
            </div>
            <h2 className="text-2xl font-bold text-slate-900 leading-tight">
              {selectedAsset?.title}
            </h2>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
            <div>
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-blue-500 pl-3 mb-3 uppercase tracking-wide">
                Mô tả
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed bg-slate-50 p-4 rounded-xl border border-slate-100">
                {selectedAsset?.description}
              </p>
            </div>

            <div>
              <h3 className="text-sm font-bold text-slate-900 border-l-4 border-blue-500 pl-3 mb-4 uppercase tracking-wide">
                Thông tin
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-2">
                    <Users className="w-3.5 h-3.5" /> Người đăng
                  </div>
                  <div className="text-slate-900 font-semibold text-sm">
                    {selectedAsset?.uploadedBy}
                  </div>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow">
                  <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-2">
                    <FileType className="w-3.5 h-3.5" /> Định dạng
                  </div>
                  <div className="text-slate-900 font-semibold text-sm">
                    {selectedAsset?.format}
                  </div>
                </div>
                {Object.entries(selectedAsset?.metadata || {}).map(
                  ([key, value], i) => {
                    if (
                      ["note", "description", "uploadedBy", "tags"].includes(
                        key,
                      )
                    )
                      return null;
                    return (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-slate-100 bg-white hover:shadow-md transition-shadow"
                      >
                        <div className="text-xs text-slate-400 font-bold uppercase mb-1 flex items-center gap-2">
                          <Shield className="w-3.5 h-3.5" /> {key}
                        </div>
                        <div className="text-slate-900 font-semibold text-sm truncate">
                          {String(value)}
                        </div>
                      </div>
                    );
                  },
                )}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50 flex items-center gap-4 flex-shrink-0">
            <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-12 rounded-xl shadow-lg shadow-blue-200">
              <Download className="w-4 h-4 mr-2" /> Tải xuống
            </Button>
            <Button
              variant="outline"
              className="h-12 w-12 rounded-xl border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-white p-0"
            >
              <MoreVertical className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
