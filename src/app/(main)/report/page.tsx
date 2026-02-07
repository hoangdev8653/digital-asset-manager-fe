"use client";

import { useState } from "react";
import {
    AlertCircle,
    CheckCircle2,
    Clock,
    Filter,
    MoreHorizontal,
    Plus,
    Search,
    Eye
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetReportByUser } from "@/hooks/useReport"
import { formatDate } from "@/utils/format";

export default function Report() {
    const [filterStatus, setFilterStatus] = useState("All");
    const { data: reports } = useGetReportByUser();


    const reportList = Array.isArray(reports?.data)
        ? reports.data
        : (Array.isArray(reports?.data?.data) ? reports.data.data : []);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "pending": return "bg-amber-100 text-amber-700 border-amber-200";
            case "processing": return "bg-blue-100 text-blue-700 border-blue-200";
            case "resolved": return "bg-green-100 text-green-700 border-green-200";
            case "rejected": return "bg-red-100 text-red-700 border-red-200";
            default: return "bg-slate-100 text-slate-700 border-slate-200";
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "High": return "text-red-600 font-bold";
            case "Medium": return "text-amber-600 font-medium";
            case "Low": return "text-blue-600";
            default: return "text-slate-600";
        }
    };

    const filteredReports = filterStatus === "All"
        ? reportList
        : reportList.filter((r: any) => r.status === filterStatus);

    /* State for Create Report Modal */
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

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
                        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                            <DialogTrigger asChild>
                                <Button className="cursor-pointer bg-red-600 hover:bg-red-700 gap-2 shadow-sm rounded-lg">
                                    <AlertCircle className="w-4 h-4" /> Báo lỗi mới
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[800px]">
                                <DialogHeader>
                                    <DialogTitle>Tạo báo cáo sự cố mới</DialogTitle>
                                    <DialogDescription>
                                        Hãy mô tả chi tiết vấn đề bạn đang gặp phải để chúng tôi hỗ trợ nhanh nhất.
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 py-4">
                                    {/* Left Column: Form Fields (3 cols) */}
                                    <div className="md:col-span-3 space-y-4">
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="title" className="text-xs font-semibold">Tiêu đề sự cố</Label>
                                            <Input id="title" className="h-9" placeholder="VD: Không đăng nhập được Gmail..." />
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="asset" className="text-xs font-semibold">Tài sản liên quan</Label>
                                            <Select>
                                                <SelectTrigger className="h-9">
                                                    <SelectValue placeholder="Chọn tài sản gặp lỗi" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="google">Google Gemini Advanced</SelectItem>
                                                    <SelectItem value="aws">AWS Production</SelectItem>
                                                    <SelectItem value="fb">Facebook Ads Manager</SelectItem>
                                                    <SelectItem value="other">Khác</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label className="text-xs font-semibold">Mức độ ưu tiên</Label>
                                            <div className="flex gap-2">
                                                <div className="flex items-center justify-center space-x-1 border p-1.5 rounded-md flex-1 hover:bg-slate-50 cursor-pointer h-9 transition-colors">
                                                    <div className="w-2 h-2 rounded-full bg-blue-500" />
                                                    <span className="text-xs text-slate-700">Low</span>
                                                </div>
                                                <div className="flex items-center justify-center space-x-1 border p-1.5 rounded-md flex-1 hover:bg-slate-50 cursor-pointer border-amber-200 bg-amber-50 h-9 transition-colors">
                                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                                    <span className="text-xs font-medium text-amber-900">Medium</span>
                                                </div>
                                                <div className="flex items-center justify-center space-x-1 border p-1.5 rounded-md flex-1 hover:bg-slate-50 cursor-pointer h-9 transition-colors">
                                                    <div className="w-2 h-2 rounded-full bg-red-500" />
                                                    <span className="text-xs text-slate-700">High</span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="grid gap-1.5">
                                            <Label htmlFor="desc" className="text-xs font-semibold">Mô tả chi tiết</Label>
                                            <Textarea id="desc" placeholder="Mô tả lỗi..." className="min-h-[100px] text-sm resize-none" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2">
                                        <Label htmlFor="image" className="text-xs font-semibold mb-1.5 block">Hình ảnh minh họa</Label>
                                        <div className="border-2 border-dashed border-slate-200 rounded-lg p-4 h-full min-h-[250px] flex flex-col items-center justify-center text-center hover:bg-slate-50 transition-colors relative bg-slate-50/50">
                                            {!previewImage ? (
                                                <>
                                                    <div className="p-3 bg-white rounded-full shadow-sm mb-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-slate-400"><rect width="18" height="18" x="3" y="3" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" /></svg>
                                                    </div>
                                                    <p className="text-sm font-medium text-slate-900">Kéo thả hoặc chọn ảnh</p>
                                                    <p className="text-xs text-slate-500 mt-1">Hỗ trợ JPG, PNG (Max 5MB)</p>
                                                </>
                                            ) : (
                                                <div className="relative w-full h-full">
                                                    <img src={previewImage} alt="Preview" className="w-full h-full object-contain rounded-md" />
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setPreviewImage(null);
                                                        }}
                                                        className="absolute top-0 right-0 bg-black/60 hover:bg-black/80 text-white rounded-full p-1.5 shadow-sm"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                                                    </button>
                                                </div>
                                            )}

                                            <Input
                                                id="image"
                                                type="file"
                                                accept="image/*"
                                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                                                onChange={(e) => {
                                                    const file = e.target.files?.[0];
                                                    if (file) {
                                                        const reader = new FileReader();
                                                        reader.onloadend = () => {
                                                            setPreviewImage(reader.result as string);
                                                        };
                                                        reader.readAsDataURL(file);
                                                    }
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <DialogFooter>
                                    <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy bỏ</Button>
                                    <Button type="submit" className="bg-red-600 hover:bg-red-700" onClick={() => setIsCreateOpen(false)}>Gửi báo cáo</Button>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
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
                        {["All", "pending", "processing", "resolved", "rejected"].map((status) => (
                            <button
                                key={status}
                                onClick={() => setFilterStatus(status)}
                                className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all capitalize ${filterStatus === status
                                    ? "bg-white text-indigo-600 shadow-sm"
                                    : "text-slate-500 hover:text-slate-700"
                                    }`}
                            >
                                {status === 'All' ? 'Tất cả' : status}
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
                                    <th className="px-6 py-4 font-semibold text-slate-600">ID & Nội dung</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">Tài sản liên quan</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">Trạng thái</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">Mức độ</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600">Ngày báo cáo</th>
                                    <th className="px-6 py-4 font-semibold text-slate-600 text-right">Hành động</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {filteredReports.map((report: any) => (
                                    <tr key={report.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-6 py-4">
                                            <Link href={`/report/${report.id}`} className="block">
                                                <div className="flex items-start gap-3">
                                                    <div className="bg-slate-100 p-2 rounded-lg text-slate-500">
                                                        <AlertCircle className="w-5 h-5" />
                                                    </div>
                                                    <div>
                                                        <span className="font-medium text-slate-900 block mb-0.5 hover:text-indigo-600 transition-colors line-clamp-1">
                                                            {report.description || report.report_type}
                                                        </span>
                                                        <span className="text-xs text-slate-500 block font-mono">
                                                            {report.id?.slice(0, 8)}... • {report.report_type}
                                                        </span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600 font-mono text-xs">
                                            {report.assignment_id ? report.assignment_id.slice(0, 8) + '...' : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border capitalize ${getStatusColor(report.status)}`}>
                                                {report.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={getPriorityColor("Medium")}>
                                                Medium
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-slate-500">
                                            <div className="flex items-center gap-1.5">
                                                <Clock className="w-3.5 h-3.5" /> {formatDate(report.created_at)}
                                            </div>
                                            <div className="text-xs mt-1"></div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" className="h-8 w-8 p-0">
                                                        <MoreHorizontal className="w-4 h-4 text-slate-400 group-hover:text-slate-600" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-48 bg-white border border-slate-200 rounded-lg">
                                                    <DropdownMenuItem className="cursor-pointer">
                                                        <Link href={`/report/${report.id}`} className="w-full flex items-center gap-2">
                                                            <Eye className="w-4 h-4 text-slate-500" />
                                                            <span>Xem chi tiết</span>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div >
    );
}

