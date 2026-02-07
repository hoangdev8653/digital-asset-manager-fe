"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useGetNotificationByUser, useUpdateStatusNotification } from "@/hooks/useNotification"

function Notification() {
  const { data: notificationByUser } = useGetNotificationByUser();
  const { mutate: updateStatusNotification } = useUpdateStatusNotification();
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);
  // const [notifications, setNotifications] = useState<any[]>([]); // Removed

  // Removed useEffect syncing

  const notifications = Array.isArray(notificationByUser?.data)
    ? notificationByUser.data
    : (Array.isArray(notificationByUser?.data?.data) ? notificationByUser.data.data : []);

  const NotificationByUser = notifications;
  const NotificationIsUnRead = notifications?.filter((n: any) => !n.isRead);
  const totalNotificationUnRead = NotificationIsUnRead?.length;

  const handleClickOutside = (event: MouseEvent) => {
    if (
      notificationRef.current &&
      !notificationRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleReadNotification = (id: any) => {
    updateStatusNotification(id);
  };

  const renderNotificationItem = (item: any, index: number) => (
    <Link
      onClick={() => handleReadNotification(item.id)}
      className="relative block hover:bg-slate-800/50 rounded-lg p-2 transition-colors"
      key={index}
      href={"/asset"}
    >
      <div className="flex gap-3 items-start">
        <div className="shrink-0 pt-1">
          {item?.post?.image ? (
            <Image
              width={40}
              height={40}
              unoptimized
              className="rounded-full w-10 h-10 object-cover"
              src={item?.post?.image}
              alt={item?.title}
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-blue-600/20 text-blue-500 flex items-center justify-center">
              <IoNotificationsOutline className="text-xl" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            <span className="font-semibold block text-blue-400 truncate">{item?.title}</span>
            <span className="text-slate-300 block line-clamp-2">{item?.message}</span>
          </p>
          <p className="text-xs text-slate-500 mt-1">
            {new Date(item?.createdAt).toLocaleDateString("vi-VN", {
              hour: '2-digit',
              minute: '2-digit',
              day: 'numeric',
              month: 'numeric',
              year: 'numeric'
            })}
          </p>
        </div>
        {!item?.isRead && (
          <div className="shrink-0 self-center">
            <div className="w-2.5 h-2.5 bg-blue-500 rounded-full ring-2 ring-slate-900"></div>
          </div>
        )}
      </div>
    </Link>
  );

  return (
    <div ref={notificationRef} className="relative inline-block">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
        <IoNotificationsOutline className="text-3xl hover:opacity-30" />
        <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full">
          <div
            style={
              totalNotificationUnRead > 0
                ? { backgroundColor: "red" }
                : { backgroundColor: "transparent" }
            }
            className="flex items-center justify-center w-5 h-5  text-white rounded-full text-sm font-bold"
          >
            {totalNotificationUnRead > 0 ? totalNotificationUnRead : ""}
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          style={{ zIndex: "51" }}
          className="cursor-default absolute rounded-xl right-[-90px] w-[360px] max-h-[500px] overflow-y-auto p-4 bg-slate-900 border border-slate-700 shadow-2xl top-12 text-white"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-xl">Thông báo</p>
            <span className="text-xs text-slate-400">{totalNotificationUnRead} chưa đọc</span>
          </div>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="bg-slate-800 p-1 rounded-lg w-full grid grid-cols-2">
              <TabsTrigger
                className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 hover:text-white transition-all py-1.5"
                value="all"
              >
                Tất cả
              </TabsTrigger>
              <TabsTrigger
                className="rounded-md data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-slate-400 hover:text-white transition-all py-1.5"
                value="unread"
              >
                Chưa đọc
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="mt-0">
              <Card className="border-none bg-transparent">
                <CardContent className="border-none p-0 m-0 space-y-1">
                  {NotificationByUser?.length > 0 ? (
                    NotificationByUser.map(renderNotificationItem)
                  ) : (
                    <div className="text-center py-2 text-slate-500">
                      <IoNotificationsOutline className="text-4xl mx-auto mb-2 opacity-50" />
                      <p>Không có thông báo mới.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="unread" className="mt-0">
              <Card className="border-none bg-transparent">
                <CardContent className="border-none p-0 m-0 space-y-1">
                  {NotificationIsUnRead?.length > 0 ? (
                    NotificationIsUnRead.map(renderNotificationItem)
                  ) : (
                    <div className="text-center py-2 text-slate-500">
                      <p>Bạn đã đọc hết thông báo.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
}

export default Notification;
