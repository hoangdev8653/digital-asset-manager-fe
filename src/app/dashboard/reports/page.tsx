"use client";

import { useState, useMemo } from "react";
import { FileText } from "lucide-react";
import { useGetAllReports, useUpdateReport } from "@/hooks/useReport";
import ReportTable from "./ReportTable";
import ImagePreview from "./ImagePreview";
import UpdateReport from "./UpdateReport";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function Reports() {
  const { data: report, isLoading } = useGetAllReports();
  const updateReportMutation = useUpdateReport();

  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [updatingReport, setUpdatingReport] = useState<any | null>(null);
  const [newStatus, setNewStatus] = useState<string>("");
  const [adminNote, setAdminNote] = useState<string>("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const reportsList = useMemo(() => {
    return Array.isArray(report?.data) ? report.data : (report?.data?.data || []);
  }, [report]);

  const currentData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return reportsList.slice(startIndex, startIndex + itemsPerPage);
  }, [reportsList, currentPage]);

  const totalPages = Math.ceil(reportsList.length / itemsPerPage);

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
        data: { status: newStatus, admin_note: adminNote }
      },
      {
        onSuccess: () => {
          setUpdatingReport(null);
        }
      }
    );
  };

  if (isLoading) return <div className="p-8 text-center font-bold">Đang tải báo cáo...</div>;

  return (
    <div className="p-4 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Báo cáo hệ thống</h2>
          <p className="text-slate-500 mt-1 font-medium">Danh sách các báo cáo, lỗi từ người dùng.</p>
        </div>
      </div>

      <ReportTable
        data={currentData}
        onViewImage={setSelectedImage}
        onEdit={handleEditClick}
      />

      {reportsList.length === 0 ? (
        <div className="bg-white p-12 text-center text-slate-400 rounded-2xl border border-slate-200">
          <FileText className="w-12 h-12 mx-auto mb-3 text-slate-200" />
          Chưa có báo cáo nào.
        </div>
      ) : (
        totalPages >= 1 && (
          <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-100 pt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage > 1) setCurrentPage(currentPage - 1);
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <PaginationItem key={p}>
                    <PaginationLink
                      href="#"
                      isActive={currentPage === p}
                      onClick={(e) => {
                        e.preventDefault();
                        setCurrentPage(p);
                      }}
                      className="cursor-pointer"
                    >
                      {p}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>

            <p className="text-slate-400 text-xs font-medium italic">
              Hiển thị {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, reportsList.length)} trong số {reportsList.length} báo cáo
            </p>
          </div>
        )
      )}

      <ImagePreview imageUrl={selectedImage} onClose={() => setSelectedImage(null)} />

      <UpdateReport
        report={updatingReport}
        newStatus={newStatus}
        adminNote={adminNote}
        isPending={updateReportMutation.isPending}
        onStatusChange={setNewStatus}
        onNoteChange={setAdminNote}
        onClose={() => setUpdatingReport(null)}
        onUpdate={handleUpdate}
      />
    </div>
  );
}