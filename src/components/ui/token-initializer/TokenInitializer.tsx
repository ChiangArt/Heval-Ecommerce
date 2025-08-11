"use client";

import { useEffect } from "react";
import axios from "axios";

export default function TokenInitializer() {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/anonymous-token`)
        .then(res => {
          localStorage.setItem("token", res.data);
        })
        .catch(console.error);
    }
  }, []);

  return null; 
}
