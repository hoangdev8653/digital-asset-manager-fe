"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";
import {
  CreateAssignmentModalProps,
  AssetForSelection,
  UserForSelection,
} from "@/types/assignment";
import { useGetAllUser } from "@/hooks/useUser"

export default function CreateAssignmentModal({
  assets,
  users,
  onCreate,
  isCreating,
}: CreateAssignmentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { data: usersData } = useGetAllUser()
  const [formData, setFormData] = useState({
    assetId: "",
    employeeId: "",
    note: "",
    expiredAt: "",
  });


  const activeAssets =
    (Array.isArray(assets) ? assets : []).filter(
      (a: AssetForSelection) => a.status === "available",
    ) || [];

  const handleConfirm = () => {
    onCreate(formData, () => {
      setIsOpen(false);
      setFormData({ assetId: "", employeeId: "", note: "", expiredAt: "" });
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold shadow-lg shadow-blue-100 flex items-center gap-2 border-none">
          <Plus className="w-5 h-5" />
          <span>Cấp tài sản</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-white">
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
              onValueChange={(val) =>
                setFormData({ ...formData, assetId: val })
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Chọn tài sản..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {activeAssets.map((asset: AssetForSelection) => (
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
              onValueChange={(val) =>
                setFormData({ ...formData, employeeId: val })
              }
            >
              <SelectTrigger className="bg-white">
                <SelectValue placeholder="Chọn nhân viên..." />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {usersData?.data?.data.map(
                  (user: UserForSelection) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ),
                )}
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Ngày hết hạn (Tùy chọn)</Label>
            <Input
              className="w-1/2 bg-white"
              type="date"
              value={formData.expiredAt}
              onChange={(e) =>
                setFormData({ ...formData, expiredAt: e.target.value })
              }
            />
          </div>
          <div className="grid gap-2">
            <Label>Ghi chú</Label>
            <Textarea
              className="h-24 bg-white"
              placeholder="Ghi chú thêm..."
              value={formData.note}
              onChange={(e) =>
                setFormData({ ...formData, note: e.target.value })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Hủy
          </Button>
          <Button
            className="bg-blue-600 text-white"
            onClick={handleConfirm}
            disabled={isCreating}
          >
            {isCreating ? "Đang xử lý..." : "Xác nhận cấp phát"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
