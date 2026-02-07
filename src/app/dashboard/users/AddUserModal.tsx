"use client";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function AddUserModal({ isOpen, onOpenChange, onAdd, isPending }: any) {
    const [newUser, setNewUser] = useState({ name: "", email: "", password: "", role: "EMPLOYEE" });

    const handleAdd = () => {
        onAdd(newUser, () => {
            setNewUser({ name: "", email: "", password: "", role: "EMPLOYEE" });
        });
    };

    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader><DialogTitle>Thêm người dùng mới</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Tên</Label>
                        <Input className="col-span-3" value={newUser.name} onChange={(e) => setNewUser({ ...newUser, name: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Email</Label>
                        <Input type="email" className="col-span-3" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Mật khẩu</Label>
                        <Input type="password" className="col-span-3" value={newUser.password} onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Vai trò</Label>
                        <div className="col-span-3">
                            <Select value={newUser.role} onValueChange={(val) => setNewUser({ ...newUser, role: val })}>
                                <SelectTrigger><SelectValue /></SelectTrigger>
                                <SelectContent className="bg-white">
                                    <SelectItem value="ADMIN">Quản trị viên</SelectItem>
                                    <SelectItem value="EMPLOYEE">Nhân viên</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button onClick={handleAdd} disabled={isPending}>{isPending ? "Đang xử lý..." : "Thêm người dùng"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}