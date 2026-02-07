"use client";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FileText } from "lucide-react";
import { ImagePreviewProps } from "@/types/report"

export default function ImagePreview({ imageUrl, onClose }: ImagePreviewProps) {
    return (
        <Dialog open={!!imageUrl} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="max-w-4xl p-0 overflow-hidden bg-white">
                <DialogHeader className="px-6 py-4 border-b border-slate-100 flex flex-row items-center justify-between bg-white">
                    <DialogTitle className="text-lg font-bold text-slate-900 text-center mx-auto">
                        Chi tiết hình ảnh báo cáo
                    </DialogTitle>
                </DialogHeader>
                <div className="relative w-full h-[70vh] bg-slate-100/50 flex items-center justify-center p-4">
                    {imageUrl ? (
                        <img
                            src={imageUrl}
                            alt="Report Attachment"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-sm border border-slate-200 bg-white"
                        />
                    ) : (
                        <div className="text-slate-400 flex flex-col items-center">
                            <FileText className="w-10 h-10 mb-2 opacity-20" />
                            <p>Không có hình ảnh</p>
                        </div>
                    )}
                </div>
            </DialogContent>
        </Dialog>
    );
}