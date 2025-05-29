"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    if (pathname === "/") {
      // HOME - Deshabilita scroll global pero permite scroll interno
      document.documentElement.style.overflowY = "hidden";
      document.body.style.overflowY = "hidden";
    } else {
      // OTRAS RUTAS - Habilita scroll global
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
    }

    return () => {
      // Reset al desmontar
      document.documentElement.style.overflowY = "auto";
      document.body.style.overflowY = "auto";
    };
  }, [pathname]);

  return <>{children}</>;
}