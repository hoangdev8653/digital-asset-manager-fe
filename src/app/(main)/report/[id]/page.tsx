"use client";
import { useParams } from "next/navigation";
import {
    AlertCircle,
    ArrowLeft,
    Clock,
    ExternalLink,
    MessageSquare,
    User,
    Paperclip,
    Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import { useGetReport } from "@/hooks/useReport";

export default function ReportDetail() {
    const params = useParams();
    const { data: response, isLoading } = useGetReport(params.id as string);
    console.log("response", response);


    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
        );
    }
    const report = response?.data?.data;
    if (!report) {
        return <div className="p-10 text-center">Không tìm thấy dữ liệu báo cáo.</div>;
    }

    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-5xl mx-auto">
                <div className="mb-6">
                    <Link href="/report" className="text-slate-500 hover:text-indigo-600 font-medium text-sm flex items-center gap-1">
                        <ArrowLeft className="w-4 h-4" /> Quay lại danh sách
                    </Link>
                </div>
                <div className="bg-white rounded-t-xl border border-slate-200 p-6 flex flex-col md:flex-row justify-between gap-4 items-start md:items-center">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="bg-slate-100 text-slate-600 px-2 py-0.5 rounded text-xs font-mono font-medium border border-slate-200">
                                #{response?.data?.data?.id?.split('-')[0]?.toUpperCase() || 'N/A'}
                            </span>
                            <span className="bg-blue-50 text-blue-700 px-2 py-0.5 rounded-full text-xs font-bold border border-blue-100 uppercase">
                                {response?.data?.data?.status}
                            </span>
                            <span className="text-slate-400 text-xs italic">
                                Loại: {response?.data?.data?.report_type}
                            </span>
                        </div>
                        <h1 className="text-2xl font-bold text-slate-900">Chi tiết báo cáo sự cố</h1>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline">Đóng Ticket</Button>
                        <Button className="bg-indigo-600 hover:bg-indigo-700">Cập nhật</Button>
                    </div>
                </div>
                <div className="grid md:grid-cols-3 gap-6 mt-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-indigo-500" /> Nội dung báo cáo
                            </h3>
                            <div className="prose prose-slate max-w-none text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-100">
                                <p>{report.description}</p>
                            </div>
                            {report.image_url && (
                                <div className="mt-4">
                                    <p className="text-xs font-semibold text-slate-500 mb-2 uppercase">Ảnh đính kèm:</p>
                                    <img
                                        src={report.image_url}
                                        alt="Evidence"
                                        className="rounded-lg border border-slate-200 max-h-96 object-contain"
                                    />
                                </div>
                            )}
                        </div>
                        {report.admin_note && (
                            <div className="bg-amber-50 rounded-xl border border-amber-200 p-6 shadow-sm">
                                <h3 className="font-semibold text-amber-900 mb-4 flex items-center gap-2">
                                    <AlertCircle className="w-5 h-5 text-amber-600" /> Ghi chú từ Quản trị viên
                                </h3>
                                <div className="prose prose-amber max-w-none text-slate-800 whitespace-pre-wrap font-medium">
                                    {report.admin_note}
                                </div>
                            </div>
                        )}
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-semibold text-slate-900 mb-6">Phản hồi</h3>
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
                    <div className="space-y-6">
                        <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                            <h3 className="font-semibold text-xs uppercase text-slate-500 tracking-wider mb-4">Thông tin chung</h3>
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center">
                                    <User className="w-4 h-4 text-slate-500" />
                                </div>
                                <div>
                                    <div className="font-medium text-slate-900 text-sm">ID Nhân viên:</div>
                                    <div className="text-xs text-slate-500 break-all">{report.employee_id}</div>
                                </div>
                            </div>
                            <div className="mt-4 pt-4 border-t border-slate-100 space-y-3">
                                <div className="flex items-center gap-2 text-sm text-slate-500">
                                    <Clock className="w-4 h-4" />
                                    <span>Tạo: {new Date(report.created_at).toLocaleString('vi-VN')}</span>
                                </div>
                                {report.resolved_at && (
                                    <div className="flex items-center gap-2 text-sm text-green-600 font-medium">
                                        <AlertCircle className="w-4 h-4" />
                                        <span>Giải quyết: {new Date(report.resolved_at).toLocaleString('vi-VN')}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                        {report.assignment_id && (
                            <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                                <h3 className="font-semibold text-xs uppercase text-slate-500 tracking-wider mb-4">Phân công</h3>
                                <div className="text-sm text-slate-600 mb-4">Mã phân công: <span className="font-mono text-xs">{report.assignment_id}</span></div>
                                <Button variant="outline" size="sm" className="w-full text-indigo-600 border-indigo-100 hover:bg-indigo-50">
                                    Chi tiết phân công <ExternalLink className="w-3 h-3 ml-2" />
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}