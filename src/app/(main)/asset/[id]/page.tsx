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

export default function AssetDetailPage() {
  const params = useParams();
  const [showPassword, setShowPassword] = useState(false);
  const [copied, setCopied] = useState<string | null>(null);

  // Mock data - In real app, fetch based on params.id
  const asset = {
    id: params.id,
    name: "Google Gemini Advanced",
    type: "AI Tool",
    icon: "https://placehold.co/100x100/4f46e5/ffffff?text=G",
    url: "https://gemini.google.com",
    username: "marketing@company.com",
    password: "VerySecurePassword123!",
    owner: "Hoàng Dev",
    createdAt: "2025-10-20",
    lastAccessed: "2 giờ trước",
    notes: "Tài khoản dùng chung cho team Content. Vui lòng không đổi mật khẩu khi chưa báo cáo."
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
       
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 mb-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-center gap-6">
                <div className="w-20 h-20 rounded-2xl bg-indigo-50 flex items-center justify-center text-3xl font-bold text-indigo-600 shadow-inner">
                    {asset.name.charAt(0)}
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                         <h1 className="text-3xl font-bold text-slate-900">{asset.name}</h1>
                         <span className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold">
                            {asset.type}
                         </span>
                    </div>
                    <Link href={asset.url} target="_blank" rel="noreferrer" className="text-slate-500 hover:text-indigo-500 flex items-center gap-1 text-sm">
                        <Globe className="w-4 h-4" /> {asset.url}
                    </Link>
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
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Tác vụ</DropdownMenuLabel>
                        <DropdownMenuItem className="gap-2">
                            <History className="w-4 h-4" /> Xem lịch sử
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600 gap-2">
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
                        <Key className="w-5 h-5 text-indigo-500" /> Thông tin đăng nhập
                    </h2>

                    <div className="space-y-6">
                        {/* Username Field */}
                        <div className="group">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Email / Username</label>
                            <div className="flex gap-2">
                                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 font-mono text-sm group-hover:border-indigo-300 transition-colors">
                                    {asset.username}
                                </div>
                                <Button 
                                    variant="outline" 
                                    className="px-4 border-slate-200"
                                    onClick={() => handleCopy(asset.username, 'username')}
                                >
                                    {copied === 'username' ? <span className="text-green-600 font-medium text-xs">Copied!</span> : <Copy className="w-4 h-4 text-slate-500" />}
                                </Button>
                            </div>
                        </div>

                         {/* Password Field */}
                        <div className="group">
                            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">Mật khẩu</label>
                            <div className="flex gap-2 relative">
                                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-900 font-mono text-sm group-hover:border-indigo-300 transition-colors flex items-center justify-between">
                                    <span>
                                        {showPassword ? asset.password : "•".repeat(20)}
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
                                     onClick={() => handleCopy(asset.password, 'password')}
                                >
                                   {copied === 'password' ? <span className="text-green-600 font-medium text-xs">Copied!</span> : <Copy className="w-4 h-4 text-slate-500" />}
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                 <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                     <h2 className="text-lg font-bold text-slate-900 mb-4">Ghi chú</h2>
                     <p className="text-slate-600 text-sm leading-relaxed bg-yellow-50 p-4 rounded-lg border border-yellow-100">
                        {asset.notes}
                     </p>
                 </div>
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
                            <span className="text-green-600 font-medium bg-green-50 px-2 py-0.5 rounded-full">Active</span>
                        </li>
                         <li className="flex items-start justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                <User className="w-4 h-4" /> Người tạo
                            </span>
                            <span className="text-slate-900">{asset.owner}</span>
                        </li>
                         <li className="flex items-start justify-between text-sm">
                            <span className="text-slate-500 flex items-center gap-2">
                                <Calendar className="w-4 h-4" /> Ngày tạo
                            </span>
                            <span className="text-slate-900">{asset.createdAt}</span>
                        </li>
                         <li className="flex items-start justify-between text-sm pt-4 border-t border-slate-100">
                             <div className="w-full">
                                <span className="text-slate-500 block mb-1 text-xs">Truy cập lần cuối</span>
                                <span className="text-slate-900 font-medium">{asset.lastAccessed}</span>
                             </div>
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
