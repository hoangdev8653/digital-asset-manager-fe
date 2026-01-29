"use client"
import { Button } from "@/components/ui/button";
import { FileType, Plus, Settings2, Pencil, Trash } from "lucide-react";
import { useGetAllAssetTypes, useCreateAssetType, useUpdateAssetType, useDeleteAssetType } from "@/hooks/useAssetType";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { useState } from "react";

export default function AssetTypesPage() {
  const { data: assetType, isLoading, error } = useGetAllAssetTypes();
  const { mutate: createAssetType, isPending: isCreating } = useCreateAssetType();
  const { mutate: updateAssetType, isPending: isUpdating } = useUpdateAssetType();
  const { mutate: deleteAssetType, isPending: isDeleting } = useDeleteAssetType();

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleSubmit = () => {
    if (!formData.name) return;

    if (editingId) {
      updateAssetType(
        { id: editingId, data: formData },
        {
          onSuccess: () => {
            setIsOpen(false);
            setFormData({ name: "", description: "" });
            setEditingId(null);
          },
        }
      );
    } else {
      createAssetType(formData as any, {
        onSuccess: () => {
          setIsOpen(false);
          setFormData({ name: "", description: "" });
        },
      });
    }
  };

  const handleEdit = (type: any) => {
    setEditingId(type.id);
    setFormData({
      name: type.name,
      description: type.description,
    });
    setIsOpen(true);
  };

  const handleDelete = () => {
    if (deletingId) {
      deleteAssetType(deletingId, {
        onSuccess: () => {
          setIsDeleteOpen(false);
          setDeletingId(null);
        },
      });
    }
  };

  const confirmDelete = (id: string) => {
    setDeletingId(id);
    setIsDeleteOpen(true);
  };

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      setFormData({ name: "", description: "" });
      setEditingId(null);
    }
  };
   
  const isPending = isCreating || isUpdating;


  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Định dạng tài sản
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Cấu hình các định dạng tệp tin được hỗ trợ và quy tắc xử lý
            metadata.
          </p>
        </div>
        <Dialog open={isOpen} onOpenChange={handleOpenChange}>
          <DialogTrigger asChild>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-100 flex items-center gap-2">
              <Plus className="w-5 h-5" />
              <span>Thêm định dạng</span>
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingId ? "Cập nhật định dạng tài sản" : "Thêm định dạng tài sản mới"}</DialogTitle>
              <DialogDescription>
                {editingId ? "Chỉnh sửa thông tin định dạng tài sản." : "Tạo mới loại định dạng tài sản để quản lý hệ thống tốt hơn."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Tên định dạng</Label>
                <Input
                  id="name"
                  placeholder="Ví dụ: Hình ảnh, Video..."
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Mô tả</Label>
                <Textarea
                  className="bg-white h-24"
                  id="description"
                  placeholder="Mô tả chi tiết về định dạng này..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" className="cursor-pointer bg-white hover:bg-white hover:opacity-80" onClick={() => setIsOpen(false)}>
                Hủy
              </Button>
              <Button className="bg-blue-600 cursor-pointer hover:bg-blue-700 hover:opacity-80" onClick={handleSubmit} disabled={isPending}>
                {isPending ? "Đang lưu..." : editingId ? "Lưu thay đổi" : "Lưu định dạng"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(assetType?.data || []).map((type: any) => (
          <div
            key={type.id}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group relative overflow-hidden"
          >
            {/* Background Decoration */}
            <div className="absolute -right-4 -top-4 text-slate-50 group-hover:text-blue-50 transition-colors">
              <FileType className="w-24 h-24" />
            </div>

            <div className="relative">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-4 text-blue-600 border border-blue-100">
                <FileType className="w-6 h-6" />
              </div>

              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {type.name}
                  </h3>
                  {/* <div className="flex items-center gap-2 text-slate-400 text-xs mt-1 font-medium uppercase tracking-wider">
                    <Hash className="w-3 h-3" />
                    {type.count || 0} Assets
                  </div> */}
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600">
                      <span className="sr-only">Open menu</span>
                      <Settings2 className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white" >
                    <DropdownMenuItem onClick={() => handleEdit(type)} className="cursor-pointer border-b border-slate-200">
                      <Pencil className="mr-2 h-4 w-4 hover:opacity-80" />
                      <span className="hover:opacity-80"  >Sửa</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      onClick={() => confirmDelete(type.id)}
                      className="text-red-600 focus:text-red-600 cursor-pointer hover:opacity-80"
                    >
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Xóa</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              <p className="text-slate-500 text-sm mt-3 font-medium line-clamp-3">
                {type.description || "Chưa có mô tả cho loại tài sản này."}
              </p>

              {/* Extensions Tags - Placeholder if needed, or removed if not in data */}
               {/* <div className="mt-5 flex flex-wrap gap-2">
                 <span className="bg-slate-100 text-slate-600 px-2.5 py-1 rounded-lg text-[11px] font-bold border border-slate-200">
                    OPEN
                 </span>
              </div> */}
            </div>
          </div>
        ))}
      </div>
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Xác nhận xóa</DialogTitle>
            <DialogDescription>
              Bạn có chắc chắn muốn xóa định dạng tài sản này không? Hành động này không thể hoàn tác.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" className="cursor-pointer" onClick={() => setIsDeleteOpen(false)}>
              Hủy
            </Button>
            <Button variant="destructive" className="bg-red-600 hover:bg-red-700 cursor-pointer" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Đang xóa..." : "Xóa"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
