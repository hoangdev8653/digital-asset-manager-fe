"use client";

import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AddAssetModalProps, AssetType } from "@/types/asset";

export default function AddAssetModal({
  isOpen,
  onClose,
  assetTypes,
  newAsset,
  setNewAsset,
  onAddMetadata,
  onRemoveMetadata,
  onMetadataChange,
  onSubmit,
  isPending,
}: AddAssetModalProps) {
  console.log(assetTypes);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white text-slate-900 rounded-2xl h-[90vh] flex flex-col p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            Thêm tài sản mới
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-6 py-4 overflow-y-auto pr-2 custom-scrollbar flex-1 content-start">
          <div className="grid gap-2">
            <Label
              htmlFor="title"
              className="font-semibold text-slate-700 mx-2"
            >
              Tiêu đề <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={newAsset.title}
              onChange={(e) =>
                setNewAsset({ ...newAsset, title: e.target.value })
              }
              placeholder="Nhập tiêu đề tài sản..."
              className="bg-white w-[90%] mx-2"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type" className="font-semibold text-slate-700 mx-2">
              Loại tài sản <span className="text-red-500">*</span>
            </Label>
            <Select
              value={newAsset.assetTypeId}
              onValueChange={(val) =>
                setNewAsset({ ...newAsset, assetTypeId: val })
              }
            >
              <SelectTrigger className="bg-white w-[90%] mx-2">
                <SelectValue placeholder="Chọn loại tài sản" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                {assetTypes?.data?.data?.map((type: AssetType) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label
              htmlFor="expired_at"
              className="font-semibold text-slate-700 mx-2"
            >
              Ngày hết hạn <span className="text-red-500">*</span>
            </Label>
            <Input
              id="expired_at"
              type="datetime-local"
              value={newAsset.expired_at}
              onChange={(e) =>
                setNewAsset({ ...newAsset, expired_at: e.target.value })
              }
              className="bg-white w-1/2 mx-2"
            />
          </div>

          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label className="font-semibold text-slate-700 mx-2">
                Metadata (JSON)
              </Label>
              <Button
                size="sm"
                variant="ghost"
                onClick={onAddMetadata}
                className="text-xs h-7 bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200"
              >
                + Thêm trường
              </Button>
            </div>

            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
              {newAsset.metadata.length === 0 && (
                <div className="text-center text-slate-400 text-sm py-2 italic">
                  Chưa có metadata nào.
                </div>
              )}
              {newAsset.metadata.map(
                (field: { key: string; value: string }, index: number) => (
                  <div
                    key={index}
                    className="flex gap-2 items-start animate-in fade-in slide-in-from-top-1 duration-200"
                  >
                    <Input
                      placeholder="Key"
                      value={field.key}
                      onChange={(e) =>
                        onMetadataChange(index, "key", e.target.value)
                      }
                      className="bg-white flex-1 mx-2"
                    />
                    <Input
                      placeholder="Value"
                      value={field.value}
                      onChange={(e) =>
                        onMetadataChange(index, "value", e.target.value)
                      }
                      className="bg-white flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveMetadata(index)}
                      className="text-slate-400 hover:text-red-500"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
          <Button variant="outline" onClick={onClose}>
            Hủy bỏ
          </Button>
          <Button
            onClick={onSubmit}
            className="bg-blue-600 text-white font-bold"
            disabled={isPending}
          >
            {isPending ? "Đang xử lý..." : "Tạo mới"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
