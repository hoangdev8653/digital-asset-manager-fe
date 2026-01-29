"use client";
import { useState } from "react";
import { useGetAllAssignments, useCreateAssignment, useDeleteAssignment } from "@/hooks/useAssignment";
import { useGetAllAssets } from "@/hooks/useAsset";
import { useGetAllUser } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Search, Calendar, User, Box, Trash2, ExternalLink } from "lucide-react";
import { format } from "date-fns";

export default function AssignmentsPage() {
  const { data: assignments, isLoading } = useGetAllAssignments();
  const { data: assets } = useGetAllAssets();
  const { data: users } = useGetAllUser();
  const { mutate: createAssignment, isPending: isCreating } = useCreateAssignment();
  const { mutate: deleteAssignment, isPending: isDeleting } = useDeleteAssignment();

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [formData, setFormData] = useState({
    assetId: "",
    employeeId: "",
    note: "",
    expiredAt: "",
  });

  const handleCreate = () => {
    if (!formData.assetId || !formData.employeeId) return;

    createAssignment({
      asset_id: formData.assetId,
      employee_id: formData.employeeId,
      note: formData.note,
      expired_at: formData.expiredAt ? new Date(formData.expiredAt).toISOString() : null,
    }, {
      onSuccess: () => {
        setIsCreateOpen(false);
        setFormData({ assetId: "", employeeId: "", note: "", expiredAt: "" });
      }
    });
  };

  const activeAssets = assets?.data?.data?.filter((a: any) => a.status === 'available') || [];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Bàn giao tài sản
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Quản lý việc cấp phát và thu hồi tài sản cho nhân viên.
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Cấp tài sản</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Cấp tài sản mới</DialogTitle>
              <DialogDescription>
                Chọn tài sản và nhân viên để thực hiện bàn giao.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label>Tài sản</Label>
                <Select
                  value={formData.assetId}
                  onValueChange={(value) => setFormData({ ...formData, assetId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn tài sản..." />
                  </SelectTrigger>
                  <SelectContent>
                    {activeAssets?.map((asset: any) => (
                      <SelectItem key={asset.id} value={asset.id}>
                        {asset.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Nhân viên</Label>
                <Select
                  value={formData.employeeId}
                  onValueChange={(value) => setFormData({ ...formData, employeeId: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Chọn nhân viên..." />
                  </SelectTrigger>
                  <SelectContent>
                    {users?.data?.data?.map((user: any) => (
                      <SelectItem key={user.id} value={user.id}>
                        {user.name} ({user.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label>Ngày hết hạn (Tùy chọn)</Label>
                <Input
                  className="w-1/3"
                  type="date"
                  value={formData.expiredAt}
                  onChange={(e) => setFormData({ ...formData, expiredAt: e.target.value })}
                />
              </div>

              <div className="grid gap-2">
                <Label>Ghi chú</Label>
                <Textarea
                  className="h-32"
                  placeholder="Ghi chú thêm về việc bàn giao..."
                  value={formData.note}
                  onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button className="cursor-pointer hover:opacity-80" variant="outline" onClick={() => setIsCreateOpen(false)}>Hủy</Button>
              <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2" onClick={handleCreate} disabled={isCreating}>
                {isCreating ? "Đang xử lý..." : "Xác nhận cấp phát"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

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
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Đang tải dữ liệu...
                  </td>
                </tr>
              ) : assignments?.data?.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                    Chưa có tài sản nào được bàn giao.
                  </td>
                </tr>
              ) : (
                assignments?.data?.map((item: any) => (
                  <tr key={item.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-50 p-2 rounded-lg text-blue-600 mt-1">
                          <Box className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="font-semibold text-slate-900">{item.asset?.title}</div>
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
                          <div className="font-medium text-slate-900">{item.employee?.name}</div>
                          <div className="text-xs text-slate-500">{item.employee?.role}</div>
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
                            Hết hạn: {format(new Date(item.expired_at), "dd/MM/yyyy")}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'} className={item.status === 'active' ? "bg-green-100 text-green-700 hover:bg-green-200 border-green-200" : ""}>
                        {item.status === 'active' ? 'Đang sử dụng' : 'Đã thu hồi'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-slate-400 hover:text-red-600 hover:bg-red-50"
                        onClick={() => deleteAssignment(item.id)}
                        disabled={isDeleting}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
