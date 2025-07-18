"use client";

import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/store/ui/sidebar-store";
import {
  LayoutDashboard,
  Users,
  ShoppingCart,
  Package,
  Tags,
  CreditCard,
  Settings,
  Mail,
} from "lucide-react";
import clsx from "clsx";
import AdminSidebar from "./AdminSidebar";
import Logo from "../ui/logo/Logo";

interface Props {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: Props) {
  const collapsed = useSidebarStore((state) => state.collapsed);
  const pathname = usePathname();
  console.log("AdminSidebar:", AdminSidebar);
  const links = [
    { title: "Dashboard", icon: LayoutDashboard, href: "/admin" },
    { title: "Usuarios", icon: Users, href: "/admin/users" },
    { title: "Productos", icon: Package, href: "/admin/products" },
    { title: "Colecciones", icon: Tags, href: "/admin/collections" },
    { title: "Órdenes", icon: ShoppingCart, href: "/admin/orders" },
    { title: "Cupones", icon: CreditCard, href: "/admin/coupons" },
    { title: "Banners", icon: Mail, href: "/admin/banners" },
    { title: "Configuración", icon: Settings, href: "/admin/settings" },
  ].map((link) => ({
    ...link,
    variant:
      pathname === link.href ? "default" : ("ghost" as "default" | "ghost"),
  }));

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside
        className={clsx(
          "transition-all duration-300 bg-muted/40 py-7 border-r",
          collapsed ? "w-16" : "w-64"
        )}
      >
        <div className="flex h-14 items-center justify-center border-b px-4">
          <Logo className="w-30" />
        </div>
        <AdminSidebar links={links} />
      </aside>

      {/* Contenido principal */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
