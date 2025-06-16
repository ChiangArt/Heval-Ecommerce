"use client";
import { useEffect, useState } from "react";

interface StatusRotatorProps {
  quantity: number;
  discountPercentage: number;
  discountEnd?: string | null;
}

export default function StatusRotator({ quantity, discountPercentage, discountEnd }: StatusRotatorProps) {
  const stockStatus = quantity > 0 ? "EN STOCK" : "SIN STOCK";
  const messages = [stockStatus];

  if (discountPercentage > 0) {
    messages.push(`${discountPercentage} % OFF`);
  }

  if (discountEnd) {
    messages.push(`DESCUENTO HASTA EL ${discountEnd}`);
  }

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [messages.length]);

  return (
    <div className="flex-[1] bg-[rgba(9,32,89,0.10)] px-3 py-2 font-bold flex items-center justify-center text-center">
      {messages[currentIndex]}
    </div>
  );
}
