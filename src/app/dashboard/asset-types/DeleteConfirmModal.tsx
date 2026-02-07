"use client";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { DeleteConfirmModalProps } from "@/types/assetType"
export default function DeleteConfirmModal({ isOpen, onOpenChange, isDeleting, onConfirm }: DeleteConfirmModalProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white">
                <DialogHeader>
                    <DialogTitle>Xác nhận xóa</DialogTitle>
                    <DialogDescription>
                        Bạn có chắc chắn muốn xóa định dạng tài sản này không? Hành động này không thể hoàn tác.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <Button variant="outline" onClick={() => onOpenChange(false)}>
                        Hủy
                    </Button>
                    <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700 text-white"
                        onClick={onConfirm}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Đang xóa..." : "Xóa"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}