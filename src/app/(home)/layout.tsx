"use client";

import { CartSideBar } from "@/components/ui/side-bar/CartSideBar";
import { Sidebar } from "@/components/ui/side-bar/SideBar";
export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
    <Sidebar />
      {children}
    <CartSideBar/>
      
    </>
  );
}
