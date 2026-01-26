import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, CheckCircle2, Key, Lock, Shield, UserCheck, Search } from "lucide-react";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-20 pb-32 md:pt-32 md:pb-48">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-blue-50 -z-10" />
        <div className="absolute top-0 right-0 -translate-y-12 translate-x-12 w-96 h-96 bg-indigo-400/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-12 -translate-x-12 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-sm font-semibold mb-6 animate-fade-in-up">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Bảo mật & Tập trung
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-slate-900 mb-6 drop-shadow-sm">
            Kho Lưu Trữ <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-blue-600">Tài Khoản</span> <br />
            & Tài Sản Số Doanh Nghiệp
          </h1>
          
          <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-600 mb-10 leading-relaxed">
            Quản lý tập trung Gmail, ChatGPT, Hosting, API Keys. Chia sẻ an toàn cho nhân viên mà không cần tiết lộ mật khẩu gốc.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/dashboard">
              <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 shadow-xl shadow-indigo-500/30 ring-offset-2 focus:ring-2">
                Truy cập Kho Dữ Liệu <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>

          <div className="mt-16 relative mx-auto max-w-3xl rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
              <div className="bg-slate-50 border-b border-slate-100 p-4 flex items-center gap-3">
                 <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-400"/>
                    <div className="w-3 h-3 rounded-full bg-amber-400"/>
                    <div className="w-3 h-3 rounded-full bg-green-400"/>
                 </div>
                 <div className="flex-1 bg-white border border-slate-200 rounded-md px-3 py-1.5 text-sm text-slate-400 flex items-center">
                    <Search className="w-3.5 h-3.5 mr-2" /> Tìm kiếm tài khoản marketing...
                 </div>
              </div>
              <div className="p-6 grid gap-4">
                  {[
                      { name: "Google Gemini Advanced", user: "marketing@company.com", type: "AI Tool" },
                      { name: "AWS Production", user: "admin-root", type: "Cloud Server" },
                      { name: "Facebook Business", user: "ads-manager", type: "Social" },
                  ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-blue-50 transition-colors cursor-default">
                          <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center text-slate-500">
                                  <Key className="w-5 h-5" />
                              </div>
                              <div className="text-left">
                                  <div className="font-bold text-slate-700">{item.name}</div>
                                  <div className="text-xs text-slate-400">{item.user}</div>
                              </div>
                          </div>
                          <div className="text-xs font-semibold px-2 py-1 rounded bg-white border border-slate-200 text-slate-500">
                              {item.type}
                          </div>
                      </div>
                  ))}
              </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white relative">
        <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Giải pháp bảo mật toàn diện</h2>
                <p className="text-lg text-slate-500">
                    Thay thế file Excel rủi ro bằng hệ thống quản lý định danh chuyên nghiệp.
                </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {[
                    {
                        icon: Shield,
                        title: "Mã hóa cấp cao",
                        desc: "Dữ liệu nhạy cảm được mã hóa 2 lớp. Chỉ người được cấp quyền mới có thể giải mã xem mật khẩu.",
                        color: "text-indigo-500",
                        bg: "bg-indigo-50"
                    },
                    {
                        icon: UserCheck,
                        title: "Phân quyền chi tiết",
                        desc: "Cấp quyền xem/sửa cho từng nhân viên hoặc phòng ban. Tự động thu hồi quyền khi nhân viên nghỉ việc.",
                        color: "text-blue-500",
                        bg: "bg-blue-50"
                    },
                    {
                        icon: Lock,
                        title: "Audit Log",
                        desc: "Ghi lại mọi hành động: Ai đã xem mật khẩu? Ai đã copy? Lịch sử truy cập minh bạch.",
                        color: "text-emerald-500",
                        bg: "bg-emerald-50"
                    }
                ].map((feature, i) => (
                    <div key={i} className="p-8 rounded-2xl border border-slate-100 bg-white hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                        <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-xl flex items-center justify-center mb-6`}>
                            <feature.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                        <p className="text-slate-500 leading-relaxed">
                            {feature.desc}
                        </p>
                    </div>
                ))}
            </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-slate-900 text-white">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">
                Bảo vệ tài sản số của bạn ngay hôm nay
            </h2>
            <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto">
                Đừng để mất quyền truy cập vào các tài khoản quan trọng chỉ vì quản lý lỏng lẻo.
            </p>
             <Link href="/dashboard">
              <Button size="lg" className="h-14 px-10 text-lg rounded-full bg-indigo-600 hover:bg-indigo-500 shadow-xl shadow-indigo-900/50 ring-offset-2 focus:ring-2 ring-offset-slate-900">
                Truy cập ngay
              </Button>
            </Link>
            
            <div className="mt-12 flex items-center justify-center gap-6 text-sm text-slate-500">
                <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> Secure Storage
                </div>
                 <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-500" /> End-to-End Encryption
                </div>
                 <Link href="/security-policy" className="flex items-center gap-2 text-indigo-400 hover:text-indigo-300 underline underline-offset-4 transition-colors">
                    <Shield className="w-4 h-4" /> Quy định bảo mật
                </Link>
            </div>
        </div>
      </section>
    </div>
  );
}
