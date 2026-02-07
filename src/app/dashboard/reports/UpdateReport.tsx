"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { UpdateReportProps } from "@/types/report"


export default function UpdateReport({
    report, newStatus, adminNote, isPending,
    onStatusChange, onNoteChange, onClose, onUpdate
}: UpdateReportProps) {
    return (
        <Dialog open={!!report} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-md bg-white">
                <DialogHeader>
                    <DialogTitle>Cập nhật báo cáo</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Trạng thái</label>
                        <select
                            className="w-full p-2 border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-slate-900"
                            value={newStatus}
                            onChange={(e) => onStatusChange(e.target.value)}
                        >
                            <option value="pending">Chờ xử lý</option>
                            <option value="resolved">Đã xử lý</option>
                            <option value="rejected">Từ chối</option>
                        </select>
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-700">Ghi chú của Admin</label>
                        <textarea
                            className="w-full p-2 border border-slate-200 rounded-md min-h-[100px] focus:outline-none focus:ring-2 focus:ring-slate-900"
                            placeholder="Nhập ghi chú xử lý..."
                            value={adminNote}
                            onChange={(e) => onNoteChange(e.target.value)}
                        />
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <Button variant="outline" onClick={onClose}>Hủy bỏ</Button>
                        <Button onClick={onUpdate} disabled={isPending}>
                            {isPending ? "Đang lưu..." : "Lưu thay đổi"}
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}