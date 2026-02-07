"use client";
import { FileText, Calendar, Clock, CheckCircle2, AlertCircle, Eye, Edit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/utils/format";
import { ReportTableProps } from "@/types/report"

export default function ReportTable({ data, onViewImage, onEdit }: ReportTableProps) {
    return (
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-widest border-b border-slate-100">
                        <tr>
                            <th className="px-6 py-4">Vấn đề</th>
                            <th className="px-6 py-4">Loại</th>
                            <th className="px-6 py-4">Trạng thái</th>
                            <th className="px-6 py-4">Ngày tạo</th>
                            <th className="px-6 py-4 text-right">Chi tiết</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {data.map((item) => (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900 line-clamp-1" title={item.description}>
                                        {item.description}
                                    </div>
                                    {item.admin_note && (
                                        <div className="text-xs text-slate-400 mt-1 italic">Note: {item.admin_note}</div>
                                    )}
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <FileText className="w-4 h-4 text-slate-400" />
                                        <span className="font-medium text-slate-700 capitalize">{item.report_type}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    {item.status === 'pending' && (
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200 gap-1">
                                            <Clock className="w-3 h-3" /> Chờ xử lý
                                        </Badge>
                                    )}
                                    {item.status === 'resolved' && (
                                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1">
                                            <CheckCircle2 className="w-3 h-3" /> Đã xử lý
                                        </Badge>
                                    )}
                                    {item.status === 'rejected' && (
                                        <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 gap-1">
                                            <AlertCircle className="w-3 h-3" /> Từ chối
                                        </Badge>
                                    )}
                                </td>
                                <td className="px-6 py-4 text-slate-500 font-medium">
                                    <div className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-slate-400" />
                                        {formatDate(item.created_at)}
                                    </div>
                                </td>
                                <td className="px-6 py-4 text-right">
                                    <div className="flex items-center justify-end gap-2">
                                        {item.image_url && (
                                            <button
                                                title="Xem hình ảnh"
                                                onClick={() => onViewImage(item.image_url)}
                                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded transition-colors text-xs font-bold"
                                            >
                                                <Eye className="w-3.5 h-3.5" />
                                            </button>
                                        )}
                                        <button
                                            title="Cập nhật trạng thái báo cáo"
                                            onClick={() => onEdit(item)}
                                            className="text-slate-600 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded transition-colors text-xs font-bold"
                                        >
                                            <Edit className="w-3.5 h-3.5" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}