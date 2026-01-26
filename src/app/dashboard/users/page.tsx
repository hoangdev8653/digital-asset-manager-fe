"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Users,
  Search,
  MoreHorizontal,
  UserPlus,
  Mail,
  Shield,
  Lock,
  Unlock,
  Pencil,
  Trash2,
} from "lucide-react";
import { useGetAllUser, useLockAccount, useUnlockAccount, useCreateUser } from "../../../hooks/useUser";
import { toast } from "react-toastify";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function UsersPage() {
    const {data: users, isLoading, error} = useGetAllUser()
    const lockMutation = useLockAccount();
    const unlockMutation = useUnlockAccount();
    const createUserMutation = useCreateUser();

    // State cho Modal thêm người dùng
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
        role: "EMPLOYEE" // Mặc định là employee
    });

    const handleAddUser = () => {
        if (!newUser.name || !newUser.email || !newUser.password) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return;
        }

        createUserMutation.mutate(newUser, {
            onSuccess: () => {
                toast.success("Thêm người dùng thành công");
                setIsAddUserOpen(false);
                setNewUser({ name: "", email: "", password: "", role: "EMPLOYEE" });
            },
            onError: (error: any) => {
                toast.error(error?.response?.data?.message || "Có lỗi xảy ra khi thêm người dùng");
            }
        });
    };

    const handleLockUnlock = (user: any) => {
        if (user.status === 'LOCKED') {
            unlockMutation.mutate(user.id, {
                onSuccess: () => toast.success(`Đã mở khóa tài khoản ${user.username}`),
                onError: () => toast.error("Có lỗi xảy ra khi mở khóa")
            });
        } else {
            lockMutation.mutate(user.id, {
                onSuccess: () => toast.success(`Đã khóa tài khoản ${user.username}`),
                onError: () => toast.error("Có lỗi xảy ra khi khóa tài khoản")
            });
        }
    };
    
    // console.log(users?.data?.data) -> Clean up console log
  return (
    <div className="p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">
            Thành viên
          </h2>
          <p className="text-slate-500 mt-1 font-medium">
            Quản lý danh sách người dùng và phân quyền hệ thống.
          </p>
        </div>
        <button 
            onClick={() => setIsAddUserOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-blue-200 flex items-center gap-2"
        >
          <UserPlus className="w-5 h-5" />
          <span>Thêm người dùng</span>
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Search & Filter Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm kiếm theo tên hoặc email..."
              className="w-full bg-white border border-slate-200 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase text-[11px] tracking-widest border-b border-slate-100">
              <tr>
                <th className="px-6 py-4">Người dùng</th>
                <th className="px-6 py-4">Vai trò</th>
                <th className="px-6 py-4">Trạng thái</th>
                <th className="px-6 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {(users?.data?.data || []).map((user: any, i: number) => (
                <tr
                  key={i}
                  className="hover:bg-slate-50/80 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-bold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                          <Mail className="w-3 h-3" /> {user.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                      <Shield className="w-4 h-4 text-slate-400" />
                      {user.role}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                        user.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-500"
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
                          user.status === "Active"
                            ? "bg-emerald-500"
                            : "bg-slate-400"
                        }`}
                      ></span>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end">
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all ring-0 outline-none border-none shadow-none bg-transparent">
                            <MoreHorizontal className="w-5 h-5" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px] bg-white border border-slate-200 shadow-xl z-50">
                            <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer gap-2">
                            <Pencil className="w-4 h-4"/> Chỉnh sửa
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                                className="cursor-pointer gap-2"
                                onClick={() => handleLockUnlock(user)}
                            >
                            {user.status === 'LOCKED' ? (
                                <><Unlock className="w-4 h-4 text-emerald-600"/> Mở khóa</>
                            ) : (
                                <><Lock className="w-4 h-4 text-orange-600"/> Khóa TK</>
                            )}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer gap-2 text-red-600 focus:text-red-600 group">
                            <Trash2 className="w-4 h-4 group-hover:text-red-700"/> Xóa
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Placeholder */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/30 flex justify-between items-center text-slate-500 text-xs font-medium">
          <span>Hiển thị 5 trên 24 thành viên</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50 disabled:opacity-50">
              Trước
            </button>
            <button className="px-3 py-1 border border-slate-200 rounded bg-white hover:bg-slate-50">
              Sau
            </button>
          </div>
        </div>
      </div>

      {/* Add User Dialog */}
      <Dialog open={isAddUserOpen} onOpenChange={setIsAddUserOpen}>
        <DialogContent className="sm:max-w-[425px] bg-white">
          <DialogHeader>
            <DialogTitle>Thêm người dùng mới</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Tên
              </Label>
              <Input
                id="name"
                value={newUser.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUser({ ...newUser, name: e.target.value })}
                className="col-span-3"
                placeholder="Nhập tên người dùng"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newUser.email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUser({ ...newUser, email: e.target.value })}
                className="col-span-3"
                placeholder="email@example.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="password" className="text-right">
                Mật khẩu
              </Label>
              <Input
                id="password"
                type="password"
                value={newUser.password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewUser({ ...newUser, password: e.target.value })}
                className="col-span-3"
                placeholder="******"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="role" className="text-right">
                Vai trò
              </Label>
              <div className="col-span-3">
                  <Select 
                    value={newUser.role} 
                    onValueChange={(value) => setNewUser({...newUser, role: value})}
                  >
                    <SelectTrigger>
                        <SelectValue placeholder="Chọn vai trò" />
                    </SelectTrigger>
                    <SelectContent className="bg-white">
                        <SelectItem value="ADMIN">Quản trị viên (Admin)</SelectItem>
                        <SelectItem value="EMPLOYEE">Nhân viên (Employee)</SelectItem>
                    </SelectContent>
                  </Select>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="submit" onClick={handleAddUser} disabled={createUserMutation.isPending}>
              {createUserMutation.isPending ? "Đang thêm..." : "Thêm người dùng"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
