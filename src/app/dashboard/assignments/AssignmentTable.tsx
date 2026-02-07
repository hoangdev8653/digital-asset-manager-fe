"use client";
import { Box, Calendar, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { AssignmentTableProps, Assignment } from "@/types/assignment";

export default function AssignmentTable({
  data,
  isLoading,
  onDelete,
  isDeleting,
}: AssignmentTableProps) {
  if (isLoading) {
    return (
      <div className="px-6 py-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        Đang tải dữ liệu...
      </div>
    );
  }

  if (data?.length === 0) {
    return (
      <div className="px-6 py-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        Chưa có tài sản nào được bàn giao.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium border-b border-slate-200">
            <tr>
              <th className="px-6 py-4">Tài sản</th>
              <th className="px-6 py-4">Nhân viên</th>
              <th className="px-6 py-4">Ngày cấp</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4 text-right">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.map((item: Assignment) => (
              <tr
                key={item.id}
                className="hover:bg-slate-50/50 transition-colors"
              >
                <td className="px-6 py-4">
                  <div className="flex items-start gap-3">
                    <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                      <Box className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-semibold text-slate-900">
                        {item.asset?.title}
                      </div>
                      <div className="text-xs text-slate-500 mt-1 max-w-[200px] truncate">
                        {item.asset?.metadata?.note || "Không có ghi chú"}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs border border-slate-200">
                      {item.employee?.name?.charAt(0) || "U"}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900">
                        {item.employee?.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {item.employee?.role}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-slate-600">
                  <div className="flex flex-col gap-1">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {format(new Date(item.assigned_at), "dd/MM/yyyy")}
                    </span>
                    {item.expired_at && (
                      <span className="text-xs text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full w-fit">
                        Hết hạn:{" "}
                        {format(new Date(item.expired_at), "dd/MM/yyyy")}
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <Badge
                    variant={item.status === "active" ? "default" : "secondary"}
                    className={
                      item.status === "active"
                        ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200"
                        : ""
                    }
                  >
                    {item.status === "active" ? "Đang sử dụng" : "Đã thu hồi"}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button
                    title="Xóa giao phó"
                    variant="ghost"
                    size="icon"
                    className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onDelete(item.id)}
                    disabled={isDeleting}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
