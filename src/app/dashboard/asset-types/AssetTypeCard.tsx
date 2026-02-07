"use client";
import { FileType, Settings2, Pencil, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { AssetType, AssetTypeCardProps } from "@/types/assetType";

export default function AssetTypeCard({ type, onEdit, onDelete }: AssetTypeCardProps) {
    return (
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group relative overflow-hidden">
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
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 text-slate-400 hover:text-slate-600 outline-none ring-0">
                                <Settings2 className="w-4 h-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-white">
                            <DropdownMenuItem title="Sửa loại tài sản" onClick={() => onEdit(type)} className="hover:opacity-65 cursor-pointer border-b border-slate-200">
                                <Pencil className="mr-2 h-4 w-4" />
                                <span>Sửa</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem title="Xóa loại tài sản" onClick={() => onDelete(type.id)}
                                className="text-red-600 focus:text-red-600 hover:opacity-65 cursor-pointer"
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
            </div>
        </div>
    );
}