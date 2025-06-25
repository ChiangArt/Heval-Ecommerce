"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import AccountDetails from "./AccountDetails";
import Button from "../ui/button/Button";
import OrderGrid from "../order/OrderGrid";
import { getOrders } from "@/core/order/action/order.actions";
import { Order } from "@/core/order/interface/order";

export default function ProfileMobile() {
  const [activeView, setActiveView] = useState<"profile" | "order">("profile");
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const orderData = await getOrders();
        setOrders(orderData);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(
          err.response?.data?.message || "No se pudieron cargar los pedidos"
        );
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-30 md:px-3 landscape:px-20">
      <div className="grid grid-cols-2 gap-4 px-2 text-center">
        <Button
          onClick={() => setActiveView("profile")}
          className={`${
            activeView === "profile" ? "bg-secundario text-white" : "border-2"
          }`}
          title="MI CUENTA"
        />
        <Button
          onClick={() => setActiveView("order")}
          className={`${
            activeView === "order" ? "bg-secundario text-white" : "border-2"
          }`}
          title="MIS PEDIDOS"
        />
      </div>

      {activeView === "profile" && (
        <section className="bg-white p-5 lg:p-20 col-span-full">
          <AccountDetails />
        </section>
      )}

      {activeView === "order" && (
        <section className="space-y-10 col-span-full">
          <OrderGrid loading={loading} orders={orders} />
        </section>
      )}
    </div>
  );
}
