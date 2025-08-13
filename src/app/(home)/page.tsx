"use client";
import HomeClient from "@/components/home/client/HomeClient";
import AnnouncementBar from "@/components/ui/announcement-bar/AnnouncementBar";
import TopMenu from "@/components/ui/top-menu/TopMenu";

export default function HomePage() {
  return (
    <>
      <AnnouncementBar />
      <TopMenu />
      <HomeClient />
    </>
  );
}
