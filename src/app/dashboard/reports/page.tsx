"use client"
"use client"
import { useState } from "react";
import {
  FileText,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Clock,
  ExternalLink,
  Eye,
  Edit,
  Save,
  X
} from "lucide-react";
import {useGetAllReports, useUpdateReport} from "@/hooks/useReport"
import { formatDate } from "@/utils/format";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Image from "next/image";

export default function ReportsPage() {
  const {data: report, isLoading, error} = useGetAllReports()
  const updateReportMutation = useUpdateReport();
  
  // State quản lý việc xem ảnh
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // State quản lý việc cập nhật báo cáo
  const [updatingReport, setUpdatingReport] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminNote, setAdminNote] = useState<string>("");

  const handleEditClick = (item: any) => {
    setUpdatingReport(item);
    setNewStatus(item.status);
    setAdminNote(item.admin_note || "");
  };

  const handleUpdate = () => {
    if (!updatingReport) return;
    
    updateReportMutation.mutate(
      {
        id: updatingReport.id,
        data: {
          status: newStatus,
          admin_note: adminNote
        }
      },
      {
        onSuccess: () => {
          setUpdatingReport(null);
        }
      }
    );
  };

  // Assuming API response structure
  const reportsList = Array.isArray(report?.data) ? report.data : (report?.data?.data || []);

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Báo cáo hệ thống
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Danh sách các báo cáo, lỗi và yêu cầu hỗ trợ từ người dùng.
          </p>
        </div>
      </div>

      {/* Reports List */}
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
              {reportsList.map((item: any) => (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-6 py-4">
                    <div className="font-bold text-slate-900 line-clamp-1" title={item.description}>
                        {item.description}
                    </div>
                     {item.admin_note && (
                        <div className="text-xs text-slate-400 mt-1 italic">
                           Note: {item.admin_note}
                        </div>
                     )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-slate-400"/>
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
                        <Calendar className="w-4 h-4 text-slate-400"/>
                        {formatDate(item.created_at)}
                     </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {item.image_url && (
                          <button 
                              onClick={() => setSelectedImage(item.image_url)}
                              className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 px-2 py-1 rounded inline-flex items-center gap-1 transition-colors text-xs font-bold"
                              title="Xem ảnh"
                          >
                              <Eye className="w-3.5 h-3.5"/> 
                          </button>
                      )}
                      
                      <button
                        onClick={() => handleEditClick(item)}
                        className="text-slate-600 hover:text-slate-700 hover:bg-slate-100 px-2 py-1 rounded inline-flex items-center gap-1 transition-colors text-xs font-bold"
                        title="Cập nhật trạng thái"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {reportsList.length === 0 && (
                 <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                       <FileText className="w-12 h-12 mx-auto mb-3 text-slate-200" />
                       Chưa có báo cáo nào.
                    </td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Image Preview Modal */}
      <Dialog open={!!selectedImage} onOpenChange={(open) => !open && setSelectedImage(null)}>
        <DialogContent className="w-4xl p-0 overflow-hidden bg-white">
          <DialogHeader className="px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between bg-white">
            <DialogTitle className="text-lg font-bold text-slate-900 text-center mx-auto">
               Chi tiết hình ảnh báo cáo
            </DialogTitle>
          </DialogHeader>
          
           <div className="relative w-full h-[70vh] bg-slate-100/50 flex items-center justify-center p-4">
             {selectedImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={selectedImage} 
                  alt="Report Attachment" 
                  className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-slate-200 bg-white"
                />
             ) : (
                <div className="text-slate-400 flex flex-col items-center">
                    <FileText className="w-10 h-10 mb-2 opacity-20"/>
                    <p>Không có hình ảnh</p>
                </div>
             )}
           </div>
        </DialogContent>
      </Dialog>

      {/* Update Report Dialog */}
      <Dialog open={!!updatingReport} onOpenChange={(open) => !open && setUpdatingReport(null)}>
        <DialogContent className="max-w-md bg-white">
          <DialogHeader>
            <DialogTitle>Cập nhật báo cáo</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Trạng thái</label>
              <select 
                className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
              >
                <option value="pending">Chờ xử lý</option>
                <option value="resolved">Đã xử lý</option>
                <option value="rejected">Từ chối</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-700">Ghi chú của Admin</label>
              <textarea 
                className="w-full p-2 border border-slate-200 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-slate-900"
                placeholder="Nhập ghi chú xử lý..."
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button variant="outline" onClick={() => setUpdatingReport(null)}>
                Hủy bỏ
              </Button>
              <Button onClick={handleUpdate} disabled={updateReportMutation.isPending}>
                {updateReportMutation.isPending ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
