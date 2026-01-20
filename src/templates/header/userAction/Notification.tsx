"use client";
import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

function Notification() {
  const [isOpen, setIsOpen] = useState(false);
  const notificationRef = useRef<HTMLDivElement>(null);

  // Dữ liệu mẫu (Mock data)
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      message: "Chào mừng bạn đến với hệ thống!",
      createdAt: new Date().toISOString(),
      is_read: false,
      post: {
        slug: "welcome",
        image: "https://github.com/shadcn.png",
        id: "1",
      },
    },
    {
      id: 2,
      message: "Bài viết của bạn đã được phê duyệt.",
      createdAt: new Date(Date.now() - 86400000).toISOString(),
      is_read: true,
      post: {
        slug: "approved",
        image: "https://github.com/shadcn.png",
        id: "2",
      },
    },
  ]);

  const NotificationByUser = notifications;
  const NotificationIsUnRead = notifications.filter((n) => !n.is_read);
  const totalNotificationUnRead = NotificationIsUnRead.length;

  useEffect(() => {
    document.getElementById("all")?.classList.add("bg-blue-500");
  }, []);

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
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, is_read: true } : n)),
    );
  };

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
          className="cursor-default absolute rounded right-[-90px] w-[340px] max-h-[500px] overflow-y-auto p-2 bg-gray-800 top-12 text-white"
        >
          <p className="font-semibold m-2 text-2xl">Thông báo</p>
          <Tabs defaultValue="all" className="rounded">
            <TabsList className="flex gap-3 font-medium my-1.5 mx-2 justify-normal">
              <TabsTrigger className="rounded-xl" value="all">
                Tất cả
              </TabsTrigger>
              <TabsTrigger className="rounded-xl" value="unread">
                Chưa đọc
              </TabsTrigger>
            </TabsList>
            <TabsContent value="all">
              <Card className="border-none">
                <CardContent className="border-none p-0 m-0 ">
                  {NotificationByUser?.length > 0 ? (
                    NotificationByUser?.map((item: any, index: number) => (
                      <Link
                        onClick={() => handleReadNotification(item.id)}
                        className="relative"
                        key={index}
                        href={`/home/${item?.post?.slug}`}
                      >
                        <div className="flex gap-2 my-4 cursor-pointer">
                          <div className="w-1/6">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full w-12 h-12 object-cover"
                              src={item?.post?.image}
                              alt={item?.post?.id}
                            />
                          </div>
                          <div className="flex-1 mr-2 flex items-center gap-2">
                            <div>
                              <p className="hover:opacity-80">
                                {item?.message}
                              </p>
                              <p className="text-sm text-gray-300 opacity-80">
                                {new Date(item?.createdAt).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </p>
                            </div>
                            {item?.is_read === false ? (
                              <div className="w-2 h-2 bg-blue-700 rounded"></div>
                            ) : (
                              <></>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400 mx-2">
                      Không có thông báo mới.
                    </p>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="unread">
              <Card className="border-none">
                <CardContent className="border-none p-0 m-0">
                  {NotificationIsUnRead?.length > 0 ? (
                    NotificationIsUnRead?.map((item: any, index: number) => (
                      <Link
                        onClick={() => handleReadNotification(item.id)}
                        key={index}
                        href={`/home/${item?.post?.slug}`}
                      >
                        <div className="flex gap-2 my-4">
                          <div className="w-1/6">
                            <Image
                              width={48}
                              height={48}
                              className="rounded-full w-12 h-12 object-cover"
                              src={item?.post.image}
                              alt={item?.post.id}
                            />
                          </div>
                          <div className="flex-1 mr-2 flex items-center gap-2">
                            <div>
                              <p>{item?.message}</p>
                              <p className="text-sm text-gray-300 opacity-80">
                                {new Date(item?.createdAt).toLocaleDateString(
                                  "vi-VN",
                                )}
                              </p>
                            </div>
                            <div className="w-2 h-2 bg-blue-700 rounded"></div>
                          </div>
                        </div>
                      </Link>
                    ))
                  ) : (
                    <p className="text-gray-400 mx-4">
                      Không có thông báo mới.
                    </p>
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
