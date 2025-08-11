"use client";

import { useEffect, ReactNode } from "react";
import axios from "axios";
import Cookies from "js-cookie";

interface TokenInitializerProps {
  children: ReactNode;
}

export default function TokenInitializer({ children }: TokenInitializerProps) {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      axios
        .get(`${process.env.NEXT_PUBLIC_API_URL}/auth/anonymous-token`)
        .then((res) => {
          const token = res.data;
          localStorage.setItem("token", token);
          Cookies.set("token", token, { expires: 7, path: "/" });
        })
        .catch(console.error);
    } else {
      Cookies.set("token", token, { expires: 7, path: "/" });
    }
  }, []);

  return <>{children}</>;
}
