"use client";

import React, { useState } from "react";
import {
  FileImage,
  Filter,
  Upload,
  MoreVertical,
  Search,
  Eye,
  Calendar,
  Shield,
  Clock,
  Download,
  Users,
  FileType,
  X,
  Edit,
  Trash,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useGetAllAssets, useCreateAsset } from "../../../hooks/useAsset";
import { useGetAllAssetTypes } from "../../../hooks/useAssetType";
import { formatDate } from "@/utils/format";
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
import { toast } from "react-toastify";

export default function AssetsPage() {
  const { data: assets, isLoading, error } = useGetAllAssets();
  const { data: assetTypes } = useGetAllAssetTypes();
  const createAssetMutation = useCreateAsset();

  const [selectedAsset, setSelectedAsset] = useState<any | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const [newAsset, setNewAsset] = useState<{
    title: string;
    assetTypeId: string;
    expired_at: string;
    metadata: { key: string; value: string }[];
  }>({
    title: "",
    assetTypeId: "",
    expired_at: "",
    metadata: [],
  });

  const addMetadataField = () => {
    setNewAsset({
      ...newAsset,
      metadata: [...newAsset.metadata, { key: "", value: "" }]
    });
  };

  const removeMetadataField = (index: number) => {
    const updatedMetadata = [...newAsset.metadata];
    updatedMetadata.splice(index, 1);
    setNewAsset({ ...newAsset, metadata: updatedMetadata });
  };

  const handleMetadataChange = (index: number, field: "key" | "value", value: string) => {
    const updatedMetadata = [...newAsset.metadata];
    updatedMetadata[index][field] = value;
    setNewAsset({ ...newAsset, metadata: updatedMetadata });
  };

  const handleCreateAsset = () => {
    if (!newAsset.title || !newAsset.assetTypeId || !newAsset.expired_at) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }

    const metadataObject: Record<string, string> = {};
    for (const item of newAsset.metadata) {
      if (item.key.trim()) {
        metadataObject[item.key] = item.value;
      }
    }

    const payload = {
      title: newAsset.title,
      asset_type_id: newAsset.assetTypeId,
      expired_at: new Date(newAsset.expired_at).toISOString(),
      metadata: metadataObject
    };

    createAssetMutation.mutate(payload, {
      onSuccess: () => {
        toast.success("Thêm tài sản thành công");
        setIsAddModalOpen(false);
        setNewAsset({ title: "", assetTypeId: "", expired_at: "", metadata: [] });
      },
      onError: (error: any) => {
        toast.error(error?.response?.data?.message || "Có lỗi xảy ra");
      }
    })
  };

  const getDetailData = (asset: any) => ({
    ...asset,
    description:
      asset.metadata?.note || asset.metadata?.description || "Chưa có mô tả chi tiết cho tài sản này.",
    uploadedBy: asset.metadata?.uploadedBy || "Admin",
    uploadDate: formatDate(asset.created_at || new Date().toISOString()),
    fileSize: asset.metadata?.fileSize || "---",
    dimensions: asset.metadata?.dimensions || "---",
    format: asset.assetType?.name || "FILE",
    tags: asset.metadata?.tags ? (Array.isArray(asset.metadata.tags) ? asset.metadata.tags : [asset.metadata.tags]) : [],
  });

  const handleViewDetail = (asset: any) => {
    console.log(asset);

    setSelectedAsset(getDetailData(asset));
  };

  if (isLoading) return <div className="p-8 text-center font-bold">Đang tải tài sản...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">

      {/* --- HEADER SECTION --- */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Tài sản số</h2>
          <p className="text-slate-500 mt-1 font-medium">
            Duyệt và quản lý tất cả tệp tin đa phương tiện của hệ thống.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64 transition-all"
            />
          </div>
          <Button variant="outline" className="rounded-xl font-bold flex items-center gap-2 shadow-sm py-5">
            <Filter className="w-4 h-4" />
            <span>Lọc</span>
          </Button>
          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="bg-[#ff6b00] hover:bg-[#e66000] text-white px-5 py-5 rounded-xl font-bold transition-all shadow-lg shadow-orange-200 flex items-center gap-2 border-none"
          >
            <Upload className="w-5 h-5" />
            <span>Thêm tài sản</span>
          </Button>
        </div>
      </div>

      {/* --- GRID ASSETS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {(assets?.data?.data || []).map((asset: any) => (
          <div
            key={asset.id}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:border-blue-400 hover:shadow-xl hover:shadow-blue-900/5 transition-all duration-300"
          >
            {/* Preview Area */}
            <div className="h-44 bg-slate-100 flex items-center justify-center relative overflow-hidden">
              <FileImage className="w-12 h-12 text-slate-300 group-hover:scale-110 transition-transform duration-300" />

              {/* Overlay Hover */}
              <div className="absolute inset-0 bg-blue-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-[2px]">
                <Button
                  onClick={() => handleViewDetail(asset)}
                  className="bg-white text-blue-600 hover:bg-blue-50 p-2 rounded-lg"
                >
                  <Eye className="w-5 h-5" />
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button className="bg-white text-slate-700 hover:bg-blue-50 p-2 rounded-lg">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-2">
                    <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm font-medium text-slate-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg cursor-pointer">
                      <Edit className="w-4 h-4" />
                      Sửa tài sản
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 p-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg cursor-pointer">
                      <Trash className="w-4 h-4" />
                      Xóa tài sản
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-[10px] font-black text-slate-600 px-2 py-0.5 rounded shadow-sm uppercase">
                {asset.assetType?.name || 'FILE'}
              </span>
            </div>

            {/* Info Area */}
            <div className="p-4 bg-white">
              <h3 className="text-slate-900 font-bold text-sm truncate group-hover:text-blue-600 transition-colors" title={asset.title}>
                {asset.title}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded ${asset.status === 'available' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                  {asset.status === 'available' ? 'Có sẵn' : 'Đã cấp'}
                </span>
                <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                <span className="text-slate-400 text-xs font-medium italic">
                  {formatDate(asset.expired_at)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Dialog open={!!selectedAsset} onOpenChange={(open) => !open && setSelectedAsset(null)}>
        <DialogContent className="max-w-[95vw] md:max-w-6xl w-full h-[85vh] p-0 overflow-hidden bg-white border-none shadow-2xl rounded-[2.5rem] fixed top-[50%] left-[50%] !translate-x-[-50%] !translate-y-[-50%]">


          <div className="grid grid-cols-1 md:grid-cols-5 h-full">
            <button
              onClick={() => setSelectedAsset(null)}
              className="absolute top-6 right-6 z-[70] p-2 rounded-full bg-white/90 hover:bg-slate-100 text-slate-500 hover:text-slate-900 transition-all border border-slate-200 shadow-sm backdrop-blur-sm"
              title="Đóng"
            >
              <X className="w-5 h-5 cursor-pointer" />
            </button>
            <div className="md:col-span-3 bg-slate-50 p-12 flex items-center justify-center relative border-r border-slate-100 h-full">
              <div className="absolute inset-0 opacity-40 pointer-events-none cursor-pointer"
                style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
              </div>

              <div className="w-full max-w-sm aspect-square bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 flex items-center justify-center relative z-10 p-12 group">
                <FileImage className="w-32 h-32 text-blue-100 transition-transform duration-500 group-hover:scale-110" strokeWidth={1} />
                <div className="absolute top-8 left-8">
                  <Badge className="bg-blue-600 text-white px-5 py-2 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg shadow-blue-100 border-none">
                    {selectedAsset?.format || 'PNG'}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 flex flex-col h-full bg-white overflow-hidden">

              <DialogHeader className="p-10 pb-6 border-b border-slate-50 flex-shrink-0">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-blue-600 font-bold text-[11px] uppercase tracking-widest">
                    <span className="bg-blue-50 px-2.5 py-1 rounded-lg">ID: {selectedAsset?.id?.slice(0, 8) || '2EDB6E29'}</span>
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <Clock className="w-4 h-4" /> {selectedAsset?.uploadDate}
                    </span>
                  </div>
                  <DialogTitle className="text-3xl font-black text-slate-900 leading-tight">
                    {selectedAsset?.title}
                  </DialogTitle>
                </div>
              </DialogHeader>

              {/* Nội dung cuộn linh hoạt */}
              <div className="flex-1 overflow-y-auto p-10 space-y-10 custom-scrollbar">
                <section>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-blue-500 rounded-full"></div> Mô tả chi tiết
                  </h4>
                  <p className="text-sm text-slate-600 leading-relaxed font-medium">
                    {selectedAsset?.description}
                  </p>
                </section>

                <section>
                  <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-5 flex items-center gap-3">
                    <div className="w-6 h-[2px] bg-blue-500 rounded-full"></div> Thông tin chi tiết
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    {/* Render Basic Info */}
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group/item">
                      <div className="flex items-center gap-2.5 text-slate-400 mb-2">
                        <Users className="w-4 h-4 group-hover/item:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Người sở hữu</span>
                      </div>
                      <div className="text-sm font-black text-slate-800">{selectedAsset?.uploadedBy}</div>
                    </div>
                    <div className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group/item">
                      <div className="flex items-center gap-2.5 text-slate-400 mb-2">
                        <FileType className="w-4 h-4 group-hover/item:text-blue-500 transition-colors" />
                        <span className="text-[10px] font-bold uppercase tracking-wider">Định dạng</span>
                      </div>
                      <div className="text-sm font-black text-slate-800">{selectedAsset?.format}</div>
                    </div>

                    {Object.entries(selectedAsset?.metadata || {}).map(([key, value], i) => {
                      if (key === 'note' || key === 'description' || key === 'uploadedBy' || key === 'tags') return null;
                      return (
                        <div key={i} className="p-5 rounded-3xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group/item">
                          <div className="flex items-center gap-2.5 text-slate-400 mb-2">
                            <Shield className="w-4 h-4 group-hover/item:text-blue-500 transition-colors" />
                            <span className="text-[10px] font-bold uppercase tracking-wider">{key}</span>
                          </div>
                          <div className="text-sm font-black text-slate-800 break-words">{String(value)}</div>
                        </div>
                      );
                    })}
                  </div>
                </section>
              </div>

              <div className="p-8 border-t border-slate-100 bg-white flex gap-3 flex-shrink-0">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold h-16 rounded-3xl text-lg shadow-xl shadow-blue-100 border-none">
                  <Download className="w-5 h-5 mr-3" /> Tải xuống ngay
                </Button>
                <Button variant="outline" className="h-16 w-16 rounded-3xl border-2 border-slate-100 hover:border-slate-300 flex items-center justify-center p-0 transition-all">
                  <MoreVertical className="w-6 h-6 text-slate-400" />
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="sm:max-w-[600px] bg-white text-slate-900 rounded-2xl h-[90vh] flex flex-col p-6">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-center">Thêm tài sản mới</DialogTitle>
          </DialogHeader>

          <div className="grid gap-6 py-4 overflow-y-auto pr-2 custom-scrollbar flex-1 content-start">

            <div className="grid gap-2">
              <Label htmlFor="title" className="font-semibold text-slate-700 mx-2">Tiêu đề <span className="text-red-500">*</span></Label>
              <Input
                id="title"
                value={newAsset.title}
                onChange={(e) => setNewAsset({ ...newAsset, title: e.target.value })}
                placeholder="Nhập tiêu đề tài sản..."
                className="bg-white w-[90%] mx-2"
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="type" className="font-semibold text-slate-700 mx-2">Loại tài sản <span className="text-red-500">*</span></Label>
              <Select
                value={newAsset.assetTypeId}
                onValueChange={(val) => setNewAsset({ ...newAsset, assetTypeId: val })}
              >
                <SelectTrigger className="bg-white w-[90%] mx-2">
                  <SelectValue placeholder="Chọn loại tài sản" />
                </SelectTrigger>
                <SelectContent className="bg-white">
                  {assetTypes?.data?.map((type: any) => (
                    <SelectItem key={type.id} value={type.id}>{type.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="expired_at" className="font-semibold text-slate-700 mx-2">Ngày hết hạn <span className="text-red-500">*</span></Label>
              <Input
                id="expired_at"
                type="datetime-local"
                value={newAsset.expired_at}
                onChange={(e) => setNewAsset({ ...newAsset, expired_at: e.target.value })}
                className="bg-white w-1/2 mx-2"
              />
            </div>

            <div className="grid gap-3">
              <div className="flex items-center justify-between">
                <Label className="font-semibold text-slate-700 mx-2">Metadata (JSON)</Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={addMetadataField}
                  className="text-xs h-7 bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 border border-blue-200"
                >
                  + Thêm trường
                </Button>
              </div>

              <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                {newAsset.metadata.length === 0 && (
                  <div className="text-center text-slate-400 text-sm py-2 italic">
                    Chưa có metadata nào. Nhấn "Thêm trường" để bắt đầu.
                  </div>
                )}
                {newAsset.metadata.map((field, index) => (
                  <div key={index} className="flex gap-2 items-start animate-in fade-in slide-in-from-top-1 duration-200">
                    <Input
                      placeholder="Tên trường (Key)"
                      value={field.key}
                      onChange={(e) => handleMetadataChange(index, 'key', e.target.value)}
                      className="bg-white flex-1 mx-2"
                    />
                    <Input
                      placeholder="Giá trị (Value)"
                      value={field.value}
                      onChange={(e) => handleMetadataChange(index, 'value', e.target.value)}
                      className="bg-white flex-1"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeMetadataField(index)}
                      className="text-slate-400 hover:text-red-500 hover:bg-red-50 shrink-0"
                      tabIndex={-1}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2 border-t border-slate-100 mt-2">
            <Button variant="outline" onClick={() => setIsAddModalOpen(false)}>Hủy bỏ</Button>
            <Button
              onClick={handleCreateAsset}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              disabled={createAssetMutation.isPending}
            >
              {createAssetMutation.isPending ? "Đang xử lý..." : "Tạo mới"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}