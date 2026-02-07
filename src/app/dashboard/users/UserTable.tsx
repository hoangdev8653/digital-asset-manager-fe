"use client";
import { MoreHorizontal, Mail, Shield, Pencil, Lock, Unlock, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export default function UserTable({ users, onEdit, onLockUnlock }: any) {
    return (
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
                    {users.map((user: any, i: number) => (
                        <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
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
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${user.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-slate-100 text-slate-500"
                                    }`}>
                                    <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${user.status === "ACTIVE" ? "bg-emerald-500" : "bg-slate-400"}`} />
                                    {user.status}
                                </span>
                            </td>
                            <td className="px-6 py-4 text-right">
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-blue-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end" className="w-[160px] bg-white border border-slate-200 shadow-xl">
                                        <DropdownMenuLabel>Thao tác</DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => onEdit(user)}>
                                            <Pencil className="w-4 h-4" /> Chỉnh sửa
                                        </DropdownMenuItem>
                                        <DropdownMenuItem className="cursor-pointer gap-2" onClick={() => onLockUnlock(user)}>
                                            {user.status === 'INACTIVE' ? <><Unlock className="w-4 h-4 text-emerald-600" /> Mở khóa</> : <><Lock className="w-4 h-4 text-orange-600" /> Khóa</>}
                                        </DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem className="cursor-pointer gap-2 text-red-600">
                                            <Trash2 className="w-4 h-4" /> Xóa
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}