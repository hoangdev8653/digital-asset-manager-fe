"use client";
import {
  ArrowUpRight,
  HardDrive,
  Users,
  Activity,
  Plus,
  Search,
  ArrowDownRight,
} from "lucide-react";
import { useGetAllUser } from "@/hooks/useUser";
import { useGetAllAssets } from "@/hooks/useAsset";
import { useGetAllReports } from "@/hooks/useReport";
import { useGetAllSystemLogs } from "@/hooks/useSystemLog";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { vi } from "date-fns/locale";
import Link from "next/link";

export default function Dashboard() {
  const { data: users } = useGetAllUser();
  const { data: assets } = useGetAllAssets();
  const { data: reports } = useGetAllReports();
  const { data: systemLogs } = useGetAllSystemLogs(1, 10);

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Tổng quan hệ thống
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Chào mừng trở lại! Đây là dữ liệu tài sản số của bạn hôm nay.
          </p>
        </div>
        <Link
          href="/dashboard/assets"
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          <span>Tải lên tài sản</span>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            label: "Tổng tài sản",
            value: assets?.data?.total || assets?.data?.data?.length || 0,
            icon: HardDrive,
            color: "blue",
            growRate: assets?.data?.statistics?.growthRate || 0,
            isIncrease: assets?.data?.statistics?.isIncrease,
          },
          {
            label: "Người dùng",
            value: users?.data?.total || users?.data?.data?.length || 0,
            icon: Users,
            color: "emerald",
            growRate: users?.data?.growthRate?.growthRate + `%` || 0,
            isIncrease: users?.data?.growthRate?.isIncrease,
          },
          {
            label: "Tổng báo cáo",
            value: reports?.data?.total || reports?.data?.data?.length || 0,
            icon: Activity,
            color: "indigo",
            growRate: reports?.data?.statistics?.growthRate || 0,
            isIncrease: reports?.data?.statistics?.isIncrease,
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow group"
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-slate-500 text-xs font-bold uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black text-slate-900 mt-2">
                  {stat.value}
                </h3>
              </div>
              <div
                className={`p-3 rounded-xl bg-${stat.color}-50 text-${stat.color}-600`}
              >
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex items-center text-sm">
              <span className="text-emerald-600 font-bold flex items-center">
                {stat.isIncrease === true ? (
                  <>
                    <ArrowUpRight className="w-4 h-4 mr-1" />
                    {stat.growRate}
                  </>
                ) : (
                  <>
                    <ArrowDownRight className="w-4 h-4 mr-1 text-red-600" />
                    {stat.growRate}
                  </>
                )}
              </span>
              <span className="ml-2 text-slate-400 font-medium italic">
                tăng so với tháng trước
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Area */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-900">
            Hoạt động gần đây
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-600">
            <thead className="bg-slate-50 text-slate-900 font-bold border-b border-slate-200">
              <tr>
                <th className="px-6 py-4">Hành động</th>
                <th className="px-6 py-4">Chi tiết</th>
                <th className="px-6 py-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(Array.isArray(systemLogs?.data) ? systemLogs.data : (Array.isArray(systemLogs?.data?.data) ? systemLogs.data?.data : [])).length > 0 ? (
                (Array.isArray(systemLogs?.data) ? systemLogs.data : (Array.isArray(systemLogs?.data?.data) ? systemLogs.data?.data : [])).map((log: any, index: any) => (
                  <tr
                    key={log.id || index}
                    className="hover:bg-slate-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <Badge
                        variant={
                          log.action.includes("DELETE")
                            ? "destructive"
                            : log.action.includes("UPDATE")
                              ? "outline"
                              : "default"
                        }
                      >
                        {log.action}
                      </Badge>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-slate-900">
                        {log.targetType}
                      </div>
                      <div className="text-xs text-slate-500 truncate max-w-[200px]">
                        {log.details?.name
                          ? `Name: ${log.details.name}`
                          : JSON.stringify(log.details)}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {log.createdAt
                        ? format(new Date(log.createdAt), "dd/MM/yyyy HH:mm", {
                          locale: vi,
                        })
                        : "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-8 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 bg-slate-50 rounded-full flex items-center justify-center mb-3">
                        <HardDrive className="w-6 h-6 text-slate-300" />
                      </div>
                      <p>Chưa có dữ liệu hiển thị</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
