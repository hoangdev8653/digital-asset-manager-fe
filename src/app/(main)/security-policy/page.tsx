"use client";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle, ShieldAlert, Lock, EyeOff } from "lucide-react";
import Link from "next/link";

export default function SecurityPolicyPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border-t-8 border-red-600">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-red-100 mb-6">
            <ShieldAlert className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            QUY ĐỊNH BẢO MẬT & AN TOÀN THÔNG TIN
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Tài sản số và thông tin tài khoản là tài sản quan trọng nhất của doanh nghiệp.
            <br />
            Mọi hành vi vi phạm sẽ bị xử lý nghiêm khắc theo quy định của công ty và pháp luật.
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-r-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-700" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-red-800">NGHIÊM CẤM TUYỆT ĐỐI</h3>
                <ul className="mt-3 list-disc list-inside text-red-700 space-y-2 text-base">
                  <li><strong>Chia sẻ mật khẩu</strong> cho người khác (kể cả đồng nghiệp cùng nhóm).</li>
                  <li>Sử dụng tài khoản công ty vào mục đích cá nhân.</li>
                  <li>Lưu trữ mật khẩu trên các file không được mã hóa (Excel, Note, Zalo).</li>
                  <li>Đăng nhập tài khoản công ty trên thiết bị công cộng mà không logout.</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
             <div className="flex">
              <div className="flex-shrink-0">
                <Lock className="h-6 w-6 text-blue-700" />
              </div>
              <div className="ml-4">
                <h3 className="text-lg font-bold text-blue-800">TRÁCH NHIỆM BẮT BUỘC</h3>
                 <ul className="mt-3 list-disc list-inside text-blue-700 space-y-2 text-base">
                  <li>Luôn sử dụng tính năng "Copy Password" thay vì hiển thị pass để copy.</li>
                  <li>Báo cáo ngay lập tức nếu nghi ngờ tài khoản bị lộ hoặc có truy cập lạ.</li>
                  <li>Thay đổi mật khẩu ngay nếu nghi ngờ thiết bị cá nhân bị nhiễm virus.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-200">
             <p className="text-center text-sm text-gray-500 italic mb-6">
                Bằng việc truy cập vào hệ thống, tôi xác nhận đã đọc, hiểu và cam kết tuân thủ các quy định trên.
            </p>
            <div className="flex justify-center gap-4">
                 <Link href="/dashboard">
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 shadow-lg px-8 py-6 text-lg rounded-xl transition-all">
                        <CheckCircle className="mr-2 h-5 w-5" /> Tôi Cam Kết & Tiếp Tục
                    </Button>
                </Link>
            </div>
        </div>
      </div>
      
      <div className="mt-8 text-center text-sm text-gray-400">
        Phòng An Ninh & Bảo Mật Thông Tin - Digital Asset Manager © 2026
      </div>
    </div>
  );
}
