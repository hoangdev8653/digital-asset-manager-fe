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
    ShieldCheck, 
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

// Mock Data
const MOCK_ASSETS = [
    {
        id: 1,
        name: "Google Gemini Advanced",
        username: "marketing@company.com",
        type: "AI Tool",
        url: "https://gemini.google.com",
        color: "bg-blue-100 text-blue-600",
        lastUsed: "2 hours ago"
    },
    {
        id: 2,
        name: "AWS Production",
        username: "admin-root",
        type: "Cloud",
        url: "https://aws.amazon.com",
        color: "bg-orange-100 text-orange-600",
        lastUsed: "1 day ago"
    },
    {
        id: 3,
        name: "Facebook Ads Manager",
        username: "ads-team@agency.com",
        type: "Social",
        url: "https://business.facebook.com",
        color: "bg-indigo-100 text-indigo-600",
        lastUsed: "3 days ago"
    },
    {
        id: 4,
        name: "Figma Professional",
        username: "design-team",
        type: "Design",
        url: "https://figma.com",
        color: "bg-purple-100 text-purple-600",
        lastUsed: "5 hours ago"
    },
    {
        id: 5,
        name: "Vercel Hosting",
        username: "dev-ops",
        type: "Cloud",
        url: "https://vercel.com",
        color: "bg-black text-white",
        lastUsed: "1 week ago"
    },
    {
        id: 6,
        name: "Notion Team",
        username: "internal-wiki",
        type: "Productivity",
        url: "https://notion.so",
        color: "bg-slate-100 text-slate-600",
        lastUsed: "10 mins ago"
    }
];

export default function AssetListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [copied, setCopied] = useState<number | null>(null);

  const handleCopy = (e: React.MouseEvent, id: number, text: string) => {
    e.preventDefault(); // Prevent navigation if inside Link
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  const filteredAssets = MOCK_ASSETS.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    asset.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
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

        {/* Filters & Controls */}
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

        {/* Content */}
        {filteredAssets.length > 0 ? (
            <div className={viewMode === 'grid' ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-3"}>
                {filteredAssets.map((asset) => (
                    <Link href={`/asset/${asset.id}`} key={asset.id} className="group block">
                       {viewMode === 'grid' ? (
                           // CARD VIEW
                           <div className="bg-white rounded-xl border border-slate-200 p-5 hover:shadow-md hover:border-indigo-300 transition-all cursor-pointer relative">
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold ${asset.color}`}>
                                        {asset.name.charAt(0)}
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <button className="text-slate-400 hover:text-slate-600 p-1 rounded-full hover:bg-slate-100" onClick={(e) => e.preventDefault()}>
                                                <MoreVertical className="w-4 h-4" />
                                            </button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem onClick={(e) => handleCopy(e, asset.id, "password123")}>Sao chép mật khẩu</DropdownMenuItem>
                                            <DropdownMenuItem>Chỉnh sửa</DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                                
                                <h3 className="font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-1 truncate">{asset.name}</h3>
                                <p className="text-sm text-slate-500 truncate mb-4">{asset.username}</p>
                                
                                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                    <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">
                                        {asset.type}
                                    </span>
                                    <div className="flex gap-1" onClick={(e) => e.preventDefault()}>
                                        <Button 
                                            size="sm" 
                                            variant="ghost" 
                                            className="h-8 w-8 p-0 text-slate-400 hover:text-indigo-600"
                                            title="Copy Username"
                                            onClick={(e) => handleCopy(e, asset.id, asset.username)}
                                        >
                                           {copied === asset.id ? <span className="text-xs font-bold text-green-500">Ok</span> : <Copy className="w-4 h-4" />}
                                        </Button>
                                        <a 
                                            href={asset.url} 
                                            target="_blank" 
                                            rel="noreferrer"
                                            className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400 hover:text-indigo-600 transition-colors"
                                        >
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                    </div>
                                </div>
                           </div>
                       ) : (
                           // LIST VIEW
                           <div className="bg-white rounded-lg border border-slate-200 p-3 flex items-center gap-4 hover:shadow-sm hover:border-indigo-300 transition-all">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold flex-shrink-0 ${asset.color}`}>
                                    {asset.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                                    <div>
                                        <h3 className="font-semibold text-slate-900 truncate group-hover:text-indigo-600">{asset.name}</h3>
                                        <p className="text-xs text-slate-500 truncate md:hidden">{asset.username}</p>
                                    </div>
                                    <div className="hidden md:block text-sm text-slate-600 truncate font-mono bg-slate-50 px-2 py-1 rounded w-fit">
                                        {asset.username}
                                    </div>
                                    <div className="hidden md:flex items-center gap-3">
                                        <span className="text-xs px-2 py-0.5 bg-slate-100 rounded text-slate-500">{asset.type}</span>
                                        <span className="text-xs text-slate-400 ml-auto">Used {asset.lastUsed}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-1" onClick={(e) => e.preventDefault()}>
                                     <Button 
                                        size="sm" 
                                        variant="ghost" 
                                        className="h-8 w-8 p-0"
                                        onClick={(e) => handleCopy(e, asset.id, asset.username)}
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
