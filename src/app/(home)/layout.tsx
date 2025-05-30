"use client";

import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import { Sidebar } from "@/components/ui/side-bar/SideBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AnnouncementBar />
      <TopMenu />
      <Sidebar />

      {children}
    </>
  );
}
