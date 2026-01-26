import Link from "next/link";
import {
  MdOutlineEmail,
  MdOutlineLocalPhone,
  MdOutlineFacebook,
  MdShield,
  MdLockOutline
} from "react-icons/md";


import { Github } from "lucide-react";

function Footer() {
  return (
    <div className="w-full bg-slate-950 text-slate-300">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center md:text-left">
          {/* Column 1: About */}
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-white flex items-center justify-center md:justify-start gap-2">
              <MdShield className="text-indigo-500" /> SecureVault
            </h3>
            <p className="text-sm leading-relaxed text-slate-400">
              Hệ thống quản lý tài sản số và thông tin định danh doanh nghiệp tập trung. 
              Bảo mật, an toàn và dễ dàng phân quyền.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-2">
                 <div className="flex items-center gap-1 text-xs px-2 py-1 bg-slate-900 rounded border border-slate-800">
                    <MdLockOutline className="text-green-500"/> AES-256 Encrypted
                 </div>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Điều hướng</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard" className="hover:text-indigo-400 transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href="/home" className="hover:text-indigo-400 transition-colors">
                  Trang chủ
                </Link>
              </li>
               <li>
                <Link href="/security-policy" className="hover:text-indigo-400 transition-colors">
                  Quy định bảo mật
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
             <h3 className="font-semibold text-lg text-white">Tài nguyên</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="cursor-not-allowed opacity-50">Hướng dẫn sử dụng (Sắp ra mắt)</span>
              </li>
              <li>
                 <span className="cursor-not-allowed opacity-50">API Documentation</span>
              </li>
              <li>
                 <span className="cursor-not-allowed opacity-50">System Status</span>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-white">Liên hệ hỗ trợ</h3>
            <div className="flex flex-col gap-3 text-sm">
               <p className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors">
                <MdOutlineEmail className="text-xl text-indigo-500" />
                <span>support@company.com</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors">
                <MdOutlineLocalPhone className="text-xl text-indigo-500" />
                <span>IT Helpdesk: 1900 xxxx</span>
              </p>
               <Link 
                href="https://github.com/hoangdev8653" 
                target="_blank"
                className="flex items-center justify-center md:justify-start gap-3 hover:text-white transition-colors"
               >
                <Github className="w-5 h-5 text-indigo-500" />
                <span>HoangDev8653</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p className="mb-2">
            © 2026 Digital Asset Manager. All rights reserved. | Internal Structure for Enterprise.
          </p>
          <p>
            Developed by <span className="font-semibold text-indigo-400">IT Department</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
