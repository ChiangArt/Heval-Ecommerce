"use client";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TokenInitializer({ children }: { children: React.ReactNode }) {
  const [tokenReady, setTokenReady] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/anonymous-token`)
        .then(res => {
          localStorage.setItem("token", res.data);
          setTokenReady(true);
        })
        .catch(() => setTokenReady(true)); // aunque falle, continuar
    } else {
      setTokenReady(true);
    }
  }, []);

  if (!tokenReady) return null; // o spinner

  return <>{children}</>;
}
