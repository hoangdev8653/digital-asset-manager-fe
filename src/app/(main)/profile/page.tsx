"use client";

import { 
    User, 
    Mail, 
    Shield, 
    Key, 
    Clock, 
    LogOut,
    Smartphone,
    MapPin,
    Calendar,
    Settings,
    Bell
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
    Tabs, 
    TabsContent, 
    TabsList, 
    TabsTrigger 
} from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ProfilePage() {
  const user = {
    name: "Hoàng Dev",
    email: "hoangdev8653@company.com",
    role: "Senior Developer",
    department: "Engineering",
    joinDate: "Oct 2023",
    avatar: "https://github.com/shadcn.png" 
  };

  const activities = [
    { action: "Logged in from Chrome on Windows", time: "Just now", ip: "192.168.1.1" },
    { action: "Copied password for 'AWS Production'", time: "2 hours ago", ip: "192.168.1.1" },
    { action: "Updated security policy", time: "Yesterday", ip: "192.168.1.1" },
    { action: "Failed login attempt", time: "3 days ago", ip: "113.22.1.5", alert: true },
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        
        {/* Left Column: User Card */}
        <div className="md:col-span-1 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                    <Avatar className="w-24 h-24 border-4 border-slate-50 shadow-sm">
                        <AvatarImage src={user.avatar} />
                        <AvatarFallback>HD</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 border-2 border-white rounded-full"></div>
                </div>
                <h2 className="text-xl font-bold text-slate-900">{user.name}</h2>
                <p className="text-slate-500 text-sm mb-4">{user.role}</p>
                <div className="flex flex-col gap-2 text-sm text-slate-600 text-left px-2">
                    <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-slate-400" /> <span className="truncate">{user.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-slate-400" /> {user.department}
                    </div>
                    <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-slate-400" /> Joined {user.joinDate}
                    </div>
                </div>
            </div>

             <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
                    <LogOut className="w-4 h-4 mr-2" /> Đăng xuất
                </Button>
            </div>
        </div>

        {/* Right Column: Details & Settings */}
        <div className="md:col-span-3">
            <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="bg-white border border-slate-200 p-1 rounded-lg h-auto">
                    <TabsTrigger value="overview" className="px-6 py-2">Tổng quan</TabsTrigger>
                    <TabsTrigger value="security" className="px-6 py-2">Bảo mật</TabsTrigger>
                    <TabsTrigger value="activity" className="px-6 py-2">Hoạt động</TabsTrigger>
                </TabsList>

                {/* OVERVIEW TAB */}
                <TabsContent value="overview">
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-slate-500 text-sm font-medium mb-2">Tài sản sở hữu</h3>
                            <div className="text-3xl font-bold text-slate-900">12</div>
                        </div>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-slate-500 text-sm font-medium mb-2">Báo cáo sự cố</h3>
                            <div className="text-3xl font-bold text-slate-900">2</div>
                        </div>
                         <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                            <h3 className="text-slate-500 text-sm font-medium mb-2">Điểm bảo mật</h3>
                            <div className="text-3xl font-bold text-green-600">95/100</div>
                        </div>
                    </div>
                    
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-4">Cài đặt nâng cao</h3>
                        <div className="space-y-4">
                             <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                <div className="space-y-0.5">
                                    <h4 className="font-medium text-slate-900">Thông báo qua Email</h4>
                                    <p className="text-sm text-slate-500">Nhận email khi có người truy cập tài khoản của bạn.</p>
                                </div>
                                <Switch defaultChecked />
                            </div>
                            <div className="flex items-center justify-between py-3 border-b border-slate-100">
                                <div className="space-y-0.5">
                                    <h4 className="font-medium text-slate-900">Chế độ tối (Dark Mode)</h4>
                                    <p className="text-sm text-slate-500">Giao diện tối giúp bảo vệ mắt.</p>
                                </div>
                                <Switch />
                            </div>
                        </div>
                    </div>
                </TabsContent>

                {/* SECURITY TAB */}
                <TabsContent value="security" className="space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                            <Key className="w-5 h-5 text-indigo-600" /> Đổi mật khẩu
                        </h3>
                        <div className="grid gap-4 max-w-md">
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Mật khẩu hiện tại</label>
                                <Input type="password" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Mật khẩu mới</label>
                                <Input type="password" />
                            </div>
                            <div className="grid gap-2">
                                <label className="text-sm font-medium">Xác nhận mật khẩu mới</label>
                                <Input type="password" />
                            </div>
                            <Button className="w-fit mt-2 bg-indigo-600 hover:bg-indigo-700">Cập nhật mật khẩu</Button>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <h3 className="font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
                            <Smartphone className="w-5 h-5 text-indigo-600" /> Xác thực 2 bước (2FA)
                        </h3>
                         <div className="flex items-center justify-between">
                            <div className="space-y-1">
                                <p className="font-medium text-slate-900 text-sm">Bảo vệ tài khoản bằng ứng dụng Authenticator</p>
                                <p className="text-slate-500 text-xs">Chúng tôi sẽ yêu cầu mã mỗi khi bạn đăng nhập trên thiết bị lạ.</p>
                            </div>
                            <Button variant="outline" className="border-indigo-200 text-indigo-700 bg-indigo-50">Thiết lập</Button>
                        </div>
                    </div>
                </TabsContent>

                {/* ACTIVITY TAB */}
                <TabsContent value="activity">
                     <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-slate-100">
                            <h3 className="font-bold text-lg text-slate-900 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-indigo-600" /> Lịch sử đăng nhập & Thao tác
                            </h3>
                        </div>
                        <div className="divide-y divide-slate-100">
                            {activities.map((act, i) => (
                                <div key={i} className={`p-4 flex items-center justify-between ${act.alert ? 'bg-red-50/50' : 'hover:bg-slate-50'}`}>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${act.alert ? 'bg-red-100 text-red-600' : 'bg-slate-100 text-slate-500'}`}>
                                            {act.alert ? <Shield className="w-5 h-5" /> : <MapPin className="w-5 h-5" />}
                                        </div>
                                        <div>
                                            <p className={`text-sm font-medium ${act.alert ? 'text-red-700' : 'text-slate-900'}`}>{act.action}</p>
                                            <p className="text-xs text-slate-500">{act.time} • {act.ip}</p>
                                        </div>
                                    </div>
                                    {act.alert && (
                                        <Button size="sm" variant="ghost" className="text-red-600 hover:text-red-700 hover:bg-red-100">Review</Button>
                                    )}
                                </div>
                            ))}
                        </div>
                        <div className="p-4 bg-slate-50 text-center border-t border-slate-100">
                            <Button variant="link" className="text-slate-500 text-xs">Xem toàn bộ lịch sử</Button>
                        </div>
                     </div>
                </TabsContent>
            </Tabs>
        </div>

      </div>
    </div>
  );
}
