"use client";
import React, { useState, useRef } from "react";
import { Search, Filter, Upload, FileSpreadsheet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "react-toastify";
import {
  useGetAllAssets,
  useCreateAsset,
  useImportFile,
} from "@/hooks/useAsset";
import { useGetAllAssetTypes } from "@/hooks/useAssetType";
import { formatDate } from "@/utils/format";
import AssetCard from "./AssetCard";
import AssetDetailModal from "./AssetDetailModal";
import AddAssetModal from "./AddAssetModal";
import { Asset, newAsset, AssetDetail, AssetType } from "@/types/asset";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";

export default function Assets() {
  const [page, setPage] = useState(1);
  const { data: assets, isLoading } = useGetAllAssets(page, 8);
  const { data: assetTypes } = useGetAllAssetTypes();
  const createAssetMutation = useCreateAsset();
  const importFileMutation = useImportFile();
  const [selectedAsset, setSelectedAsset] = useState<AssetDetail | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [filterType, setFilterType] = useState<string>("ALL");
  const [newAsset, setNewAsset] = useState<newAsset>({
    title: "",
    assetTypeId: "",
    expired_at: "",
    metadata: [],
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const filteredAssets = (
    Array.isArray(assets?.data)
      ? assets.data
      : Array.isArray(assets?.data?.data)
        ? assets.data.data
        : []
  ).filter((asset: Asset) => {
    if (filterType === "ALL") return true;
    return asset.assetType.id === filterType;
  });

  const handleExcelUpload = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      try {
        await importFileMutation.mutateAsync(formData);
        toast.success(`Đã import file: ${file.name}`);
      } catch (error: unknown) {
        toast.error("Có lỗi xảy ra khi import file");
      }
    }
  };

  const handleCreateAsset = () => {
    if (!newAsset.title || !newAsset.assetTypeId || !newAsset.expired_at) {
      toast.error("Vui lòng điền đầy đủ các trường bắt buộc");
      return;
    }
    const metadataObject: Record<string, string> = {};
    newAsset.metadata.forEach((item: { key: string; value: string }) => {
      if (item.key.trim()) metadataObject[item.key] = item.value;
    });

    createAssetMutation.mutate(
      {
        title: newAsset.title,
        asset_type_id: newAsset.assetTypeId,
        expired_at: new Date(newAsset.expired_at).toISOString(),
        metadata: metadataObject,
      },
      {
        onSuccess: () => {
          toast.success("Thành công");
          setIsAddModalOpen(false);
          setNewAsset({
            title: "",
            assetTypeId: "",
            expired_at: "",
            metadata: [],
          });
        },
      },
    );
  };

  const handleViewDetail = (asset: Asset) => {
    setSelectedAsset({
      ...asset,
      description:
        asset.metadata?.note || asset.metadata?.description || "Chưa có mô tả.",
      uploadedBy: asset.metadata?.uploadedBy || "Admin",
      uploadDate: formatDate(asset.created_at),
      format: asset.assetType?.name || "FILE",
    });
  };

  if (isLoading)
    return <div className="p-8 text-center font-bold">Đang tải...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Tài sản số
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Quản lý tệp tin đa phương tiện.
          </p>
        </div>
        <div className="flex gap-3">
          <div className="relative hidden lg:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="pl-9 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm w-64 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="cursor-pointer rounded-xl font-bold flex items-center gap-2 shadow-sm py-5 px-4 bg-white hover:bg-slate-50 border-slate-200"
              >
                <Filter className="w-4 h-4 text-slate-500" />
                <span>
                  {filterType === "ALL"
                    ? "Tất cả loại"
                    : (Array.isArray(assetTypes?.data)
                      ? assetTypes.data
                      : Array.isArray(assetTypes?.data?.data)
                        ? assetTypes.data.data
                        : []
                    )?.find((t: AssetType) => t.id === filterType)?.name}
                </span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 p-2 bg-white rounded-xl shadow-xl border border-slate-100"
            >
              <DropdownMenuItem
                onClick={() => setFilterType("ALL")}
                className="cursor-pointer p-3 rounded-lg"
              >
                Tất cả
              </DropdownMenuItem>
              {(Array.isArray(assetTypes?.data)
                ? assetTypes.data
                : Array.isArray(assetTypes?.data?.data)
                  ? assetTypes.data.data
                  : []
              ).map((type: AssetType) => (
                <DropdownMenuItem
                  key={type.id}
                  onClick={() => setFilterType(type.id)}
                  className="cursor-pointer p-2 hover:text-blue-500 border-b border-slate-200 hover:opacity-75"
                >
                  {type.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            onClick={() => fileInputRef.current?.click()}
            className="cursor-pointer bg-emerald-600 text-white px-5 py-5 rounded-xl font-bold flex items-center gap-2 border-none"
          >
            <FileSpreadsheet className="w-5 h-5" />
            <span>Upload Excel</span>
          </Button>
          <Input
            type="file"
            ref={fileInputRef}
            onChange={handleExcelUpload}
            accept=".xlsx, .xls"
            className="hidden"
          />

          <Button
            onClick={() => setIsAddModalOpen(true)}
            className="cursor-pointer bg-[#ff6b00] text-white px-5 py-5 rounded-xl font-bold flex items-center gap-2 border-none"
          >
            <Upload className="w-5 h-5" />
            <span>Thêm tài sản</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredAssets.map((asset: Asset, key: number) => (
          <AssetCard
            key={`${asset.id}-${key}`}
            asset={asset}
            onViewDetail={handleViewDetail}
          />
        ))}
      </div>
      {assets?.data?.totalPages > 1 && (
        <div className="mt-12 flex justify-center border-t border-slate-100 pt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page > 1) setPage(page - 1);
                  }}
                />
              </PaginationItem>
              {Array.from({ length: assets.data.totalPages }, (_, i) => (
                <PaginationItem key={i + 1}>
                  <PaginationLink
                    href="#"
                    isActive={page === i + 1}
                    onClick={(e) => {
                      e.preventDefault();
                      setPage(i + 1);
                    }}
                  >
                    {i + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    if (page < assets.data.totalPages) setPage(page + 1);
                  }}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      {/* Modals */}
      <AssetDetailModal
        selectedAsset={selectedAsset}
        onClose={() => setSelectedAsset(null)}
      />

      <AddAssetModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        assetTypes={assetTypes}
        newAsset={newAsset}
        setNewAsset={setNewAsset}
        onAddMetadata={() =>
          setNewAsset({
            ...newAsset,
            metadata: [...newAsset.metadata, { key: "", value: "" }],
          })
        }
        onRemoveMetadata={(i) => {
          const m = [...newAsset.metadata];
          m.splice(i, 1);
          setNewAsset({ ...newAsset, metadata: m });
        }}
        onMetadataChange={(i: number, f: "key" | "value", v: string) => {
          const m = [...newAsset.metadata];
          m[i][f] = v;
          setNewAsset({ ...newAsset, metadata: m });
        }}
        onSubmit={handleCreateAsset}
        isPending={createAssetMutation.isPending}
      />
    </div>
  );
}
