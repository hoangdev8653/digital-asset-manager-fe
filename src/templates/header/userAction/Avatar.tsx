"use client";

import Image from "next/image";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

function Avatar() {
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  // Dữ liệu mẫu (Mock data) để hiển thị giao diện
  const user = {
    name: "Người dùng mẫu",
    image: "https://github.com/shadcn.png", // Ảnh avatar mẫu
  };

  const handleLogout = () => {
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  const handleAvatarHover = () => {
    if (!isOpen) setIsOpen(true);
  };

  const handleAvatarLeave = () => {
    if (isOpen) setIsOpen(false);
  };

  return (
    <div className="block text-white">
      <div
        onMouseEnter={handleAvatarHover}
        onMouseLeave={handleAvatarLeave}
        className="relative"
      >
        <a href={user ? "/profile" : "/login"}>
          <Image
            unoptimized
            width={48}
            height={48}
            className="object-cover rounded-full w-12 h-12"
            src={
              user?.image && user.image.trim() !== ""
                ? user.image
                : "/images/avatar_default.jpg"
            }
            alt={user ? "User avatar" : "Default avatar"}
          />
        </a>
        <div className="h-1" />

        {isOpen && user && (
          <div className="absolute z-50 right-[-40px] w-40 p-2 bg-gray-800 top-[52px]">
            <a href="/profile">
              <p className="text-white font-semibold hover:bg-gray-400 cursor-pointer m-1 text-lg">
                Trang cá nhân
              </p>
            </a>
            <a href="/post">
              <p className="text-white font-semibold cursor-pointer border-b border-gray-400 hover:bg-gray-400 text-lg m-1">
                Đăng bài viết
              </p>
            </a>
            <div>
              <p
                onClick={handleLogout}
                className="text-white font-semibold hover:bg-gray-400 cursor-pointer m-1 text-lg"
              >
                Sign Out
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Avatar;
