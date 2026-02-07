"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function EditUserModal({ isOpen, onOpenChange, user, setUser, onUpdate, isPending }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[425px] bg-white">
                <DialogHeader><DialogTitle>Cập nhật vai trò</DialogTitle></DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Tên</Label>
                        <Input className="col-span-3 bg-slate-100" value={user?.name || ""} disabled />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right">Vai trò</Label>
                        <div className="col-span-3">
                            <Select value={user?.role} onValueChange={(val) => setUser({ ...user, role: val })}>
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
                    <Button onClick={onUpdate} disabled={isPending}>{isPending ? "Đang lưu..." : "Lưu thay đổi"}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}