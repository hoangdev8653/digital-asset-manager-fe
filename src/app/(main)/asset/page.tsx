"use client";
import { useState } from "react";
import {
    Search,
    Plus,
    Filter,
    MoreVertical,
    Copy,
    ExternalLink,
    Key,
    LayoutGrid,
    List as ListIcon
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from 'next/link';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetAssignmentByUser } from "@/hooks/useAssignment"
import { formatDate } from "@/utils/format";

export default function AssetListPage() {
    const [searchTerm, setSearchTerm] = useState("");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [copied, setCopied] = useState<number | null>(null);
    const { data: assignment } = useGetAssignmentByUser();

    const handleCopy = (e: React.MouseEvent, id: number, text: string) => {
        e.preventDefault();
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };


    return (
        <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Tài sản của tôi</h1>
                        <p className="text-slate-500 text-sm mt-1">Quản lý và truy cập nhanh các tài khoản doanh nghiệp.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <Button className="bg-indigo-600 hover:bg-indigo-700 gap-2 shadow-sm rounded-lg">
                            <Plus className="w-4 h-4" /> Thêm mới
                        </Button>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 mb-6 flex flex-col md:flex-row gap-4 justify-between items-center">
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <Input
                            placeholder="Tìm kiếm tài khoản, email..."
                            className="pl-9 bg-slate-50 border-slate-200"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <Button variant="outline" className="gap-2 text-slate-600 border-slate-200">
                            <Filter className="w-4 h-4" /> Lọc
                        </Button>
                        <div className="h-6 w-px bg-slate-200 mx-1 hidden md:block" />
                        <div className="flex bg-slate-100 p-1 rounded-lg">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'grid' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <LayoutGrid className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={`p-1.5 rounded-md transition-all ${viewMode === 'list' ? 'bg-white shadow text-indigo-600' : 'text-slate-500 hover:text-slate-700'}`}
                            >
                                <ListIcon className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {assignment?.data?.length > 0 ? (
                    <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
                        {assignment?.data?.map((item: any) => (
                            <Link href={`/asset/${item?.asset?.id}`} key={item?.asset?.id} className="group block">
                                {viewMode === 'grid' ? (
                                    <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer relative">
                                        <div className="flex justify-between items-start mb-4">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${item?.asset?.color || 'bg-blue-100 text-blue-600'}`}>
                                                {item?.asset?.title?.charAt(0)}
                                            </div>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100" onClick={(e) => e.preventDefault()}>
                                                        <MoreVertical className="w-4 h-4" />
                                                    </button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    <DropdownMenuItem className="cursor-pointer hover:bg-slate-100" onClick={(e) => handleCopy(e, item?.asset?.id, item?.asset?.metadata?.password || "********")}>Sao chép mật khẩu</DropdownMenuItem>
                                                    <DropdownMenuItem asChild>
                                                        <Link href={"/report"} className="cursor-pointer hover:bg-slate-100 w-full">
                                                            Viết báo cáo
                                                        </Link>
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 truncate">{item?.asset?.title}</h3>
                                        <p className="text-sm text-slate-500 truncate mb-4">Hết hạn: {item?.expired_at ? formatDate(item?.expired_at) : 'Vĩnh viễn'}</p>
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className={`text-xs font-medium px-2 py-1 rounded-full ${item?.status === 'assigned' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                                                {item?.status === 'assigned' ? 'Đã cấp' : 'Sẵn sàng'}
                                            </span>
                                            <div className="flex gap-1">
                                                <Button
                                                    size="sm"
                                                    variant="ghost"
                                                    className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                                                    title="Copy Username"
                                                    onClick={(e) => handleCopy(e, item?.asset?.id, item?.asset?.metadata?.username)}
                                                >
                                                    {copied === item?.asset?.id ? <span className="text-xs font-bold text-green-500">Ok</span> : <Copy className="w-4 h-4" />}
                                                </Button>
                                                <div
                                                    className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors"
                                                >
                                                    <ExternalLink className="w-4 h-4" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg border border-slate-200 p-3 flex items-center gap-4 hover:shadow-sm hover:border-indigo-300 transition-all">
                                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0 ${item?.asset?.color || 'bg-indigo-100 text-indigo-600'}`}>
                                            {item?.asset?.title?.charAt(0)}
                                        </div>
                                        <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                            <div>
                                                <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600">{item?.asset?.title}</h3>
                                                <p className="text-xs text-slate-500 truncate md:hidden">{item?.asset?.metadata?.username}</p>
                                            </div>
                                            <div className="hidden md:block text-sm text-slate-600 truncate font-mono bg-slate-50 px-2 py-1 rounded w-fit">
                                                {item?.asset?.metadata?.username || "No Username"}
                                            </div>
                                            <div className="hidden md:flex items-center gap-3">
                                                <span className={`text-xs px-2 py-0.5 rounded ${item?.asset?.status === 'assigned' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-500'}`}>
                                                    {item?.asset?.status === 'assigned' ? 'Đã cấp' : 'Sẵn sàng'}
                                                </span>
                                                <span className="text-xs text-slate-400 ml-auto">
                                                    {item?.asset?.expired_at ? formatDate(item?.asset?.expired_at) : 'Vĩnh viễn'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
                                            <Button
                                                size="sm"
                                                variant="ghost"
                                                className="h-8 w-8 p-0"
                                                onClick={(e) => handleCopy(e, item?.asset?.id, item?.asset?.metadata?.username)}
                                            >
                                                <Copy className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
                                            </Button>
                                            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                                                <Key className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-slate-300">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-6 h-6 text-slate-400" />
                        </div>
                        <h3 className="text-lg font-medium text-slate-900">Không tìm thấy tài sản</h3>
                        <p className="text-slate-500">Thử tìm kiếm với từ khóa khác hoặc thêm mới.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
