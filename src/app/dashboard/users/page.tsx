
"use client";
import { useState } from "react";
import { Search, UserPlus } from "lucide-react";
import { toast } from "react-toastify";
import { useGetAllUser, useLockAccount, useUnlockAccount, useCreateUser, useUpdateUser } from "../../../hooks/useUser";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious, PaginationEllipsis } from "@/components/ui/pagination";

import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import EditUserModal from "./EditUserModal";

export default function Users() {
  const [page, setPage] = useState(1);
  const { data: users, isLoading } = useGetAllUser(page, 10);
  const lockMutation = useLockAccount();
  const unlockMutation = useUnlockAccount();
  const createMutation = useCreateUser();
  const updateMutation = useUpdateUser();

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);

  const handleAddUser = (data: any, callback: () => void) => {
    if (!data.name || !data.email || !data.password) return toast.error("Vui lòng điền đủ thông tin");
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Thêm thành công");
        setIsAddOpen(false);
        callback();
      }
    });
  };

  const handleUpdateUser = () => {
    updateMutation.mutate({ id: editingUser.id, data: { role: editingUser.role } }, {
      onSuccess: () => {
        toast.success("Cập nhật thành công");
        setIsEditOpen(false);
      }
    });
  };

  const handleLockUnlock = (user: any) => {
    const mutation = user.status === 'INACTIVE' ? unlockMutation : lockMutation;
    mutation.mutate(user.id, { onSuccess: () => toast.success("Thao tác thành công") });
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Thành viên</h2>
          <p className="text-slate-500 font-medium">Quản lý người dùng hệ thống.</p>
        </div>
        <button onClick={() => setIsAddOpen(true)} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2">
          <UserPlus className="w-5 h-5" /> Thêm người dùng
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 bg-slate-50/50">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input type="text" placeholder="Tìm kiếm..." className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
        </div>

        <UserTable
          users={users?.data?.data || []}
          onEdit={(u: any) => { setEditingUser(u); setIsEditOpen(true); }}
          onLockUnlock={handleLockUnlock}
        />


        <div className="p-4 border-t border-slate-100 flex justify-center">
          {users?.data?.totalPages > 1 && (
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious href="#" onClick={() => page > 1 && setPage(page - 1)} className={page <= 1 ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext href="#" onClick={() => page < users?.data?.totalPages && setPage(page + 1)} className={page >= users?.data?.totalPages ? "pointer-events-none opacity-50" : ""} />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </div>

      <AddUserModal isOpen={isAddOpen} onOpenChange={setIsAddOpen} onAdd={handleAddUser} isPending={createMutation.isPending} />
      <EditUserModal isOpen={isEditOpen} onOpenChange={setIsEditOpen} user={editingUser} setUser={setEditingUser} onUpdate={handleUpdateUser} isPending={updateMutation.isPending} />
    </div>
  );
}