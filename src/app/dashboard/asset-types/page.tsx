"use client";
import { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { useGetAllAssetTypes, useCreateAssetType, useUpdateAssetType, useDeleteAssetType } from "@/hooks/useAssetType";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import AssetTypeCard from "./AssetTypeCard";
import AssetTypeModal from "./AssetTypeModal";
import DeleteConfirmModal from "./DeleteConfirmModal";

export default function AssetTypes() {
  const { data: assetType, isLoading } = useGetAllAssetTypes();
  const { mutate: createAssetType, isPending: isCreating } = useCreateAssetType();
  const { mutate: updateAssetType, isPending: isUpdating } = useUpdateAssetType();
  const { mutate: deleteAssetType, isPending: isDeleting } = useDeleteAssetType();
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const allAssetTypes = Array.isArray(assetType?.data) ? assetType.data : (Array.isArray(assetType?.data?.data) ? assetType.data.data : []);
  const totalPages = Math.ceil(allAssetTypes.length / itemsPerPage);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return allAssetTypes.slice(start, start + itemsPerPage);
  }, [allAssetTypes, currentPage]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFormData({ name: "", description: "" });
      setEditingId(null);
    }
  };


  const handleSubmit = () => {
    if (!formData.name) return;
    const action = editingId ? updateAssetType : createAssetType;
    const payload = editingId ? { id: editingId, data: formData } : formData;

    action(payload as any, {
      onSuccess: () => {
        setIsOpen(false);
        setFormData({ name: "", description: "" });
        setEditingId(null);
      }
    });
  };

  const handleEdit = (type: any) => {
    setEditingId(type.id);
    setFormData({ name: type.name, description: type.description });
    setIsOpen(true);
  };

  if (isLoading) return <div className="p-8 text-center font-bold">Đang tải dữ liệu...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Định dạng tài sản</h2>
          <p className="text-slate-500 mt-1 font-medium">Cấu hình định dạng tệp tin và quy tắc metadata.</p>
        </div>
        <button onClick={() => setIsOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 shadow-lg shadow-blue-100">
          <Plus className="w-5 h-5" />
          <span>Thêm định dạng</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentData.map((type: any) => (
          <AssetTypeCard
            key={type.id}
            type={type}
            onEdit={handleEdit}
            onDelete={(id) => { setDeletingId(id); setIsDeleteOpen(true); }}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="mt-8 flex flex-col items-center gap-4 border-t border-slate-100 pt-8">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage > 1) setCurrentPage(currentPage - 1); }}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                <PaginationItem key={p}>
                  <PaginationLink
                    href="#"
                    isActive={currentPage === p}
                    onClick={(e) => { e.preventDefault(); setCurrentPage(p); }}
                    className="cursor-pointer"
                  >
                    {p}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) setCurrentPage(currentPage + 1); }}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      )}

      <AssetTypeModal
        isOpen={isOpen}
        onOpenChange={handleOpenChange}
        editingId={editingId}
        formData={formData}
        setFormData={setFormData}
        onSubmit={handleSubmit}
        isPending={isCreating || isUpdating}
      />
      <DeleteConfirmModal
        isOpen={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        isDeleting={isDeleting}
        onConfirm={() => deleteAssetType(deletingId!, { onSuccess: () => setIsDeleteOpen(false) })}
      />
    </div>
  );
}