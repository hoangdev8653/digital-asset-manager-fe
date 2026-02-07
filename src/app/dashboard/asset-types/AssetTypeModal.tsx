"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function AssetTypeModal({ isOpen, onOpenChange, editingId, formData, setFormData, onSubmit, isPending }: any) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>{editingId ? "Cập nhật định dạng tài sản" : "Thêm định dạng tài sản mới"}</DialogTitle>
                    <DialogDescription>
                        {editingId ? "Chỉnh sửa thông tin định dạng tài sản." : "Tạo mới loại định dạng tài sản."}
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Tên định dạng</Label>
                        <Input
                            id="name"
                            placeholder="Ví dụ: Hình ảnh, Video..."
                            value={formData?.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="description">Mô tả</Label>
                        <Textarea
                            className="bg-white h-24"
                            id="description"
                            placeholder="Mô tả chi tiết..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Hủy</Button>
                    <Button className="bg-blue-600 text-white" onClick={onSubmit} disabled={isPending}>
                        {isPending ? "Đang lưu..." : "Xác nhận"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}