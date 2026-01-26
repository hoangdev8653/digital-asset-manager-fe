"use client";
import Avatar from "./Avatar";
import Notification from "./Notification";
import { LogOut } from "lucide-react";
import { useLogout } from "@/hooks/useAuth";

function UserAction() {
  const { mutate: logout } = useLogout();

  return (
    <div className="flex gap-4 items-center cursor-pointer tablet:hidden">
      <Avatar />
      <Notification />
      <button onClick={() => logout()} title="Đăng xuất" className="cursor-pointer hover:text-red-500 transition-colors">
        <LogOut size={20} />
      </button>
    </div>
  );
}

export default UserAction;
