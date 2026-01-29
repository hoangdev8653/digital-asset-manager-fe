"use client";
import { useState } from "react";
import { 
    Copy, 
    Eye, 
    EyeOff, 
    ShieldCheck, 
    Calendar, 
    User, 
    Globe, 
    Key, 
    MoreHorizontal,
    Trash2,
    Edit2,
    History
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useGetAssetById} from "@/hooks/useAsset"
import { formatDate } from "@/utils/format";

export default function AssetDetailPage() {
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);
  const { data: assetData, isLoading } = useGetAssetById(params.id as string || "");
  
  const asset = assetData?.data?.data;

  const handleCopy = (text: string, field: string) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  if (isLoading) {
      return (
        <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header Skeleton */}
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 flex items-center justify-between gap-6 animate-pulse">
                    <div className="flex items-center gap-6 w-full">
                        <div className="w-20 h-20 rounded-2xl bg-slate-200"></div>
                        <div className="flex-1 space-y-3">
                            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
                            <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
                            <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-200 rounded w-1/5"></div>
                                    <div className="h-10 bg-slate-200 rounded w-full"></div>
                                </div>
                                <div className="space-y-2">
                                    <div className="h-4 bg-slate-200 rounded w-1/5"></div>
                                    <div className="h-10 bg-slate-200 rounded w-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="md:col-span-1 space-y-6">
                        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 animate-pulse">
                            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
                            <div className="space-y-4">
                                <div className="flex justify-between"><div className="w-1/3 h-4 bg-slate-200 rounded"></div><div className="w-1/4 h-4 bg-slate-200 rounded"></div></div>
                                <div className="flex justify-between"><div className="w-1/3 h-4 bg-slate-200 rounded"></div><div className="w-1/4 h-4 bg-slate-200 rounded"></div></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      );
  }

  if (!asset) {
    return <div className="min-h-screen bg-slate-50 flex items-center justify-center">Không tìm thấy tài sản</div>;
  }


  const formatKey = (key: string) => {
    return key.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const hiddenFields = ['password', 'note', 'role'];
  const dynamicFields = Object.entries(asset?.metadata || {}).filter(([key]) => !hiddenFields.includes(key));

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
       
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-inner">
                    {asset?.title?.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                         <h1 className="text-3xl font-bold text-slate-900">{asset?.title}</h1>
                         <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {asset?.assetType?.name || "Unknown Type"}
                         </span>
                    </div>
                    {asset?.url && (
                        <Link href={asset?.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-500 flex items-center gap-1 text-sm">
                            <Globe className="w-4 h-4" /> {asset?.url}
                        </Link>
                    )}
                </div>
            </div>

            <div className="flex items-center gap-3">
                 <Button variant="outline" className="gap-2">
                    <Edit2 className="w-4 h-4" /> Sửa
                 </Button>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                            <MoreHorizontal className="w-5 h-5 text-slate-500" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white border border-slate-200 rounded-lg">
                        <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2 cursor-pointer hover:bg-slate-50">
                            <History className="w-4 h-4" /> Xem lịch sử
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 gap-2 cursor-pointer hover:bg-slate-50">
                            <Trash2 className="w-4 h-4" /> Xóa tài sản
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                 </DropdownMenu>
            </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6">
            
            {/* Left Column: Credentials */}
            <div className="md:col-span-2 space-y-6">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <Key className="w-5 h-5 text-indigo-500" /> Thông tin tài sản
                    </h2>

                    <div className="space-y-6">
                         {/* Dynamic Fields */}
                        {dynamicFields.map(([key, value]: [string, any]) => (
                             <div className="group" key={key}>
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
                                    {formatKey(key)}
                                </label>
                                <div className="flex gap-2">
                                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 font-mono text-sm group-hover:border-indigo-300 transition-colors break-all">
                                        {value}
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className="px-4 border-slate-200"
                                        onClick={() => handleCopy(String(value), key)}
                                    >
                                        {copied === key ? <span className="text-green-600 font-medium text-xs">Copied!</span> : <Copy className="w-4 h-4 text-slate-500" />}
                                    </Button>
                                </div>
                            </div>
                        ))}

                         {/* Password Field - Special Case */}
                         {asset?.metadata?.password && (
                            <div className="group">
                                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Mật khẩu</label>
                                <div className="flex gap-2 relative">
                                    <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 font-mono text-sm group-hover:border-indigo-300 transition-colors flex items-center justify-between">
                                        <span>
                                            {showPassword ? asset?.metadata?.password : "•".repeat(20)}
                                        </span>
                                        <button 
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="p-1 hover:bg-slate-200 rounded text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                    <Button 
                                        variant="outline" 
                                        className="px-4 border-slate-200"
                                        onClick={() => handleCopy(asset?.metadata?.password, 'password')}
                                    >
                                    {copied === 'password' ? <span className="text-green-600 font-medium text-xs">Copied!</span> : <Copy className="w-4 h-4 text-slate-500" />}
                                    </Button>
                                </div>
                            </div>
                         )}

                         {dynamicFields.length === 0 && !asset?.metadata?.password && (
                             <p className="text-slate-500 italic">Không có thông tin chi tiết.</p>
                         )}
                    </div>
                </div>

                 {/* Notes Section */}
                 {asset?.metadata?.note && (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-bold text-slate-900 mb-4">Ghi chú</h2>
                        <p className="text-slate-600 text-sm leading-relaxed bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                            {asset?.metadata?.note}
                        </p>
                    </div>
                 )}
            </div>

            {/* Right Column: Metadata */}
            <div className="md:col-span-1 space-y-6">
                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                    <h3 className="font-bold text-slate-900 mb-4">Thông tin bổ sung</h3>
                    <ul className="space-y-4">
                        <li className="flex items-start justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                <ShieldCheck className="w-4 h-4" /> Trạng thái
                            </span>
                            <span className={`font-medium px-2 py-0.5 rounded-full ${asset?.status === 'assigned' ? 'bg-green-100 text-green-600' : 'bg-slate-100 text-slate-600'}`}>
                                {asset?.status === 'assigned' ? 'Đã cấp' : 'Sẵn sàng'}
                            </span>
                        </li>
                        {asset?.metadata?.role && (
                            <li className="flex items-start justify-between text-sm">
                                <span className="text-slate-500 flex items-center gap-2">
                                    <User className="w-4 h-4" /> Vai trò
                                </span>
                                <span className="text-slate-900">{asset?.metadata?.role}</span>
                            </li>
                        )}
                         <li className="flex items-start justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Ngày hết hạn
                            </span>
                            <span className="text-slate-900">{asset?.expired_at ? formatDate(asset?.expired_at) : "Vĩnh viễn"}</span>
                        </li>
                    </ul>
                 </div>

                 {/* Security Tip */}
                 <div className="bg-indigo-900 rounded-xl p-6 text-white text-center">
                    <div className="w-12 h-12 bg-indigo-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ShieldCheck className="w-6 h-6 text-indigo-300" />
                    </div>
                    <p className="text-sm text-indigo-100 mb-4">
                        Đừng quên đăng xuất tài khoản này khi hoàn tất công việc.
                    </p>
                    <Link href="/security-policy">
                        <Button size="sm" variant="secondary" className="w-full">Xem quy định</Button>
                    </Link>
                 </div>
            </div>

        </div>
      </div>
    </div>
  );
}
