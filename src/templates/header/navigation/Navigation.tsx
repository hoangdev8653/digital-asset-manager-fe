"use client";
import React from "react";

import { usePathname } from "next/navigation";
import Link from "next/link";
function Navigation() {
  const pathname = usePathname();

  return (
    <div className="tablet:hidden block">
      <ul className="flex justify-between gap-8 text-sm font-semibold text-slate-500 cursor-pointer">
        <li
          className={`hover:text-indigo-600 transition-colors ${
            pathname === "/" || pathname === "/home" ? "text-indigo-600" : ""
          }`}
        >
          <Link href="/home">Trang Chủ</Link>
        </li>
        <li
          className={`hover:text-indigo-600 transition-colors ${
            pathname?.startsWith("/asset") ? "text-indigo-600" : ""
          }`}
        >
          <Link href="/asset">Tài sản</Link>
        </li>
        <li
          className={`hover:text-indigo-600 transition-colors ${
            pathname?.startsWith("/report") ? "text-indigo-600" : ""
          }`}
        >
          <Link href="/report">Báo cáo</Link>
        </li>
        <li
          className={`hover:text-indigo-600 transition-colors ${
            pathname === "/security-policy" ? "text-indigo-600" : ""
          }`}
        >
          <Link href="/security-policy">Quy định bảo mật</Link>
        </li>
      </ul>
    </div>
  );
}

export default Navigation;
