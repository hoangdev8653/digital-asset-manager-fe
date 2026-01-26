import Link from "next/link";
import { FileQuestion, AlertTriangle, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
      <div className="text-center space-y-6 max-w-lg mx-auto">
        
        {/* Icon & Error Code */}
        <div className="relative inline-block">
            <div className="absolute -inset-4 bg-blue-100 rounded-full blur-xl opacity-70 animate-pulse"></div>
            <div className="relative bg-white p-6 rounded-full shadow-xl shadow-blue-100/50 border border-slate-100">
                <FileQuestion className="w-16 h-16 text-blue-600" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-red-100 text-red-600 px-3 py-1 rounded-full text-xs font-bold border border-red-200 flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> 404 Error
            </div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Không tìm thấy trang
            </h1>
            <p className="text-slate-500 text-lg">
                Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển đến địa chỉ mới.
            </p>
        </div>

        {/* Action Button */}
        <div className="pt-4">
            <Link href="/">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 rounded-xl font-bold text-base shadow-lg shadow-blue-200 transition-all hover:scale-105 active:scale-95 flex items-center gap-2 mx-auto">
                    <ArrowLeft className="w-5 h-5" />
                    Quay lại Trang chủ
                </Button>
            </Link>
        </div>

      </div>
      
      {/* Footer Text */}
      <div className="mt-12 text-slate-400 text-sm font-medium">
        &copy; {new Date().getFullYear()} DAMPro System. All rights reserved.
      </div>
    </div>
  );
}
