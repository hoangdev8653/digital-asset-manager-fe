"use client";

import { useState } from "react";
import { 
    AlertCircle, 
    CheckCircle2, 
    Clock, 
    Filter, 
    MoreHorizontal, 
    Plus, 
    Search 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const MOCK_REPORTS = [
    {
        id: "R-2026-001",
        title: "Không đăng nhập được Google Gemini",
        asset: "Google Gemini Advanced",
        type: "Login Failed",
        status: "Open",
        priority: "High",
        date: "2026-01-26 10:30 AM",
        reporter: "Hoàng Dev"
    },
    {
        id: "R-2026-002",
        title: "Mật khẩu AWS hết hạn",
        asset: "AWS Production",
        type: "Expired",
        status: "In Progress",
        priority: "Medium",
        date: "2026-01-25 14:00 PM",
        reporter: "SysAdmin"
    },
    {
        id: "R-2026-003",
        title: "Cần cấp quyền truy cập Facebook Ads",
        asset: "Facebook Business",
        type: "Access Request",
        status: "Resolved",
        priority: "Low",
        date: "2026-01-24 09:15 AM",
        reporter: "Marketing Lead"
    },
     {
        id: "R-2026-004",
        title: "Tài khoản Canva Pro bị downgrade",
        asset: "Canva Enterprise",
        type: "Billing",
        status: "Open",
        priority: "High",
        date: "2026-01-26 08:00 AM",
        reporter: "Designer"
    }
];

export default function ReportListPage() {
  const [filterStatus, setFilterStatus] = useState("All");

  const getStatusColor = (status: string) => {
    switch(status) {
        case "Open": return "bg-red-100 text-red-700 border-red-200";
        case "In Progress": return "bg-amber-100 text-amber-700 border-amber-200";
        case "Resolved": return "bg-green-100 text-green-700 border-green-200";
        default: return "bg-slate-100 text-slate-700 border-slate-200";
    }
  };

  const getPriorityColor = (priority: string) => {
       switch(priority) {
        case "High": return "text-red-600 font-bold";
        case "Medium": return "text-amber-600 font-medium";
        case "Low": return "text-blue-600";
        default: return "text-slate-600";
    }
  };

  const filteredReports = filterStatus === "All" 
    ? MOCK_REPORTS 
    : MOCK_REPORTS.filter(r => r.status === filterStatus);

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl font-bold text-slate-900">Báo cáo sự cố</h1>
                <p className="text-slate-500 text-sm mt-1">Theo dõi và xử lý các vấn đề liên quan đến tài sản số.</p>
            </div>
            <div className="flex items-center gap-3">
                <Button className="bg-red-600 hover:bg-red-700 gap-2 shadow-sm rounded-lg">
                    <AlertCircle className="w-4 h-4" /> Báo lỗi mới
                </Button>
            </div>
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
             <div className="relative w-full md:w-80">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <Input 
                    placeholder="Tìm theo ID, tiêu đề..." 
                    className="pl-9 bg-slate-50 border-slate-200"
                />
            </div>
            <div className="flex gap-2 bg-slate-100 p-1 rounded-lg w-full md:w-auto">
                {["All", "Open", "In Progress", "Resolved"].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            filterStatus === status 
                            ? "bg-white text-indigo-600 shadow-sm" 
                            : "text-slate-500 hover:text-slate-700"
                        }`}
                    >
                        {status}
                    </button>
                ))}
            </div>
        </div>

        {/* Report List */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 font-semibold text-slate-600">ID & Tiêu đề</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Tài sản liên quan</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Trạng thái</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Mức độ</th>
                            <th className="px-6 py-4 font-semibold text-slate-600">Ngày báo cáo</th>
                            <th className="px-6 py-4 font-semibold text-slate-600 text-right">Hành động</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {filteredReports.map((report) => (
                            <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                                <td className="px-6 py-4">
                                     <Link href={`/report/${report.id}`} className="block">
                                        <div className="flex items-start gap-3">
                                            <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                                                <AlertCircle className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <span className="font-medium text-slate-900 block mb-0.5 hover:text-indigo-600 transition-colors">
                                                    {report.title}
                                                </span>
                                                <span className="text-xs text-slate-500 block font-mono">
                                                    {report.id} • {report.type}
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </td>
                                <td className="px-6 py-4 text-slate-600">
                                    {report.asset}
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(report.status)}`}>
                                        {report.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={getPriorityColor(report.priority)}>
                                        {report.priority}
                                    </span>
                                </td>
                                <td className="px-6 py-4 text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Clock className="w-3.5 h-3.5" /> {report.date}
                                    </div>
                                    <div className="text-xs mt-1">by {report.reporter}</div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                     <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                <MoreHorizontal className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Link href={`/report/${report.id}`} className="w-full">Xem chi tiết</Link>
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>Đánh dấu đã xong</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
             {filteredReports.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-slate-500">Không tìm thấy báo cáo nào.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}
