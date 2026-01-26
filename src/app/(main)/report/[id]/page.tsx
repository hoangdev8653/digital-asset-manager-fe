"use client";

import { useParams } from "next/navigation";
import { 
    AlertCircle, 
    ArrowLeft, 
    CheckCircle2, 
    Clock, 
    ExternalLink, 
    MessageSquare, 
    ShieldAlert, 
    User,
    Paperclip
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";

export default function ReportDetailPage() {
  const params = useParams();

  // Mock Data
  const report = {
    id: params.id,
    title: "Không đăng nhập được Google Gemini",
    description: "Tài khoản báo sai mật khẩu dù tôi đã copy từ hệ thống. Đã thử 3 lần. Cần truy cập gấp để làm content plan.",
    asset: {
        id: 1,
        name: "Google Gemini Advanced",
        username: "marketing@company.com"
    },
    status: "Open",
    priority: "High",
    createdAt: "2026-01-26 10:30 AM",
    reporter: "Hoàng Dev",
    history: [
        {
            user: "System",
            action: "created ticket",
            time: "10:30 AM"
        },
        {
            user: "Admin",
            action: "changed status to In Progress",
            time: "10:45 AM"
        }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Navigation */}
        <div className="mb-6">
            <Link href="/report" className="text-slate-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-1">
                <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
            </Link>
        </div>

        {/* Header */}
        <div className="bg-white rounded-t-xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono font-medium border border-slate-200">
                        #{report.id}
                    </span>
                    <span className="bg-red-100 text-red-700 px-2 py-0.5 rounded-full text-xs font-bold border border-red-200 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" /> {report.priority} Priority
                    </span>
                    <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold border border-blue-100">
                        {report.status}
                    </span>
                </div>
                <h1 className="text-2xl font-bold text-slate-900">{report.title}</h1>
            </div>
            <div className="flex gap-2">
                 <Button variant="outline">Đóng Ticket</Button>
                 <Button className="bg-indigo-600 hover:bg-indigo-700">Cập nhật</Button>
            </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mt-6">
            
            {/* Left Col: Main Content */}
            <div className="md:col-span-2 space-y-6">
                
                {/* Description Box */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                        <MessageSquare className="w-5 h-5 text-indigo-500" /> Nội dung báo cáo
                    </h3>
                    <div className="prose prose-slate max-w-none text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
                        <p>{report.description}</p>
                    </div>
                </div>

                {/* Activity Feed */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                     <h3 className="font-semibold text-slate-900 mb-6">Hoạt động</h3>
                     
                     <div className="relative border-l-2 border-slate-100 ml-3 space-y-8 pb-4">
                        {report.history.map((event, i) => (
                             <div key={i} className="relative pl-8">
                                <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-slate-200 ring-4 ring-white" />
                                <div className="text-sm">
                                    <span className="font-semibold text-slate-900">{event.user}</span> 
                                    <span className="text-slate-600"> {event.action}</span>
                                    <span className="text-slate-400 text-xs ml-2">{event.time}</span>
                                </div>
                            </div>
                        ))}
                     </div>

                     {/* Reply Box */}
                     <div className="mt-6 flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                            <User className="w-5 h-5 text-indigo-600" />
                        </div>
                        <div className="flex-1 space-y-3">
                            <Textarea placeholder="Nhập phản hồi hoặc cập nhật tiến độ..." className="min-h-[100px] resize-none" />
                            <div className="flex justify-between items-center">
                                <Button variant="ghost" size="sm" className="text-slate-500">
                                    <Paperclip className="w-4 h-4 mr-2" /> Đính kèm ảnh
                                </Button>
                                <Button size="sm">Gửi phản hồi</Button>
                            </div>
                        </div>
                     </div>
                </div>

            </div>

             {/* Right Col: Sidebar */}
            <div className="space-y-6">
                
                {/* Related Asset Card */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-semibold text-xs uppercase text-slate-500 tracking-wider mb-4">Tài sản liên quan</h3>
                    <div className="flex items-start gap-3 mb-4">
                         <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                            G
                        </div>
                        <div>
                            <div className="font-semibold text-slate-900">{report.asset.name}</div>
                            <div className="text-xs text-slate-500">{report.asset.username}</div>
                        </div>
                    </div>
                    <Link href={`/asset/${report.asset.id}`}>
                        <Button variant="outline" size="sm" className="w-full text-indigo-600 border-indigo-100 hover:bg-indigo-50">
                            Xem tài sản <ExternalLink className="w-3 h-3 ml-2" />
                        </Button>
                    </Link>
                </div>

                {/* Reporter Info */}
                <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                    <h3 className="font-semibold text-xs uppercase text-slate-500 tracking-wider mb-4">Người báo cáo</h3>
                     <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                            <User className="w-4 h-4 text-slate-500" />
                        </div>
                        <div>
                            <div className="font-medium text-slate-900">{report.reporter}</div>
                            <div className="text-xs text-slate-500">Sales Department</div>
                        </div>
                    </div>
                     <div className="mt-4 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-500">
                        <Clock className="w-4 h-4" /> {report.createdAt}
                    </div>
                </div>

            </div>
        </div>
      </div>
    </div>
  );
}
