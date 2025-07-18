"use client";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import AccountDetails from "./AccountDetails";
import OrderGrid from "../order/OrderGrid";
import { getOrdersByUser } from "@/core/order/action/order.actions";
import { Order } from "@/core/order/interface/order";
import { useOverlayStore } from "@/store/ui/use-overlay-store";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function ProfileDesktop() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [filteredOrders, setFilteredOrders] = useState<Order[]>([]);
  const [loadingOrders, setLoadingOrders] = useState<boolean>(true);
  const [loadingFilter, setLoadingFilter] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const { hideOverlay } = useOverlayStore();

  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      try {
        const orderData = await getOrdersByUser();

        const sortedOrders = [...orderData].sort((a, b) => {
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        });

        setOrders(sortedOrders);
        filterOrdersByMonth(sortedOrders, selectedDate);
      } catch (error) {
        const err = error as AxiosError<{ message: string }>;
        toast.error(
          err.response?.data?.message || "No se pudieron cargar los pedidos"
        );
      } finally {
        setLoadingOrders(false);
        hideOverlay();
      }
    };

    loadOrders();
  }, [hideOverlay, selectedDate]);

  const filterOrdersByMonth = (orders: Order[], date: Date) => {
    const month = date.getMonth();
    const year = date.getFullYear();

    const filtered = orders.filter((order) => {
      const orderDate = new Date(order.createdAt);
      return (
        orderDate.getMonth() === month && orderDate.getFullYear() === year
      );
    });

    setFilteredOrders(filtered);
  };

  const handleDateChange = (date: Date | null) => {
    if (!date) return;
    setLoadingFilter(true);
    setSelectedDate(date);
    filterOrdersByMonth(orders, date);
    setTimeout(() => setLoadingFilter(false), 150); 
  };

  return (
    <div className="grid grid-cols-2 gap-8 px-3 landscape:px-20">
      <section className="bg-[rgba(232,227,222,0.40)] p-6">
        <AccountDetails />
      </section>

      <section className="space-y-10 bg-[rgba(232,227,222,0.40)] p-6">
        <div className="mb-4">
          <h2 className="text-sm font-bold text-primario mb-2">
            Filtrar por mes:
          </h2>
          <DatePicker
            selected={selectedDate}
            onChange={handleDateChange}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            className="border border-gray-300 rounded px-2 py-1 text-sm cursor-pointer"
          />
        </div>

        <OrderGrid loading={loadingOrders || loadingFilter} orders={filteredOrders} />
      </section>
    </div>
  );
}
