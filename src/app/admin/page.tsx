"use client";
import { useCallback, useEffect, useState } from "react";
import { format } from "date-fns";
import { getUsers } from "@/core/user/action/user.actions";
import { getProducts } from "@/core/product/action/product.actions";
import { getOrdersByAdmin } from "@/core/order/action/order.actions";
import { OrderItem } from "@/core/order/interface/order";
import { DashboardSummary } from "@/components/admin/dashboard/DashboardSummary";
import { RecentOrders } from "@/components/admin/dashboard/RecentOrders";
import { QuickActions } from "@/components/admin/dashboard/QuickActions";
import { logError } from "../utils/logger";

export default function AdminDashboard() {
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);

  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const today = new Date();
  const formattedDate = format(today, "yyyy-MM-dd");

  const fetchData = useCallback(async () => {
  try {
    setLoadingUsers(true);
    setLoadingProducts(true);
    setLoadingOrders(true);

    const [users, productsRes, ordersRes] = await Promise.all([
      getUsers(),
      getProducts(),
      getOrdersByAdmin(formattedDate, formattedDate),
    ]);

    setUserCount(users.length);
    setProductCount(productsRes.content.length);

    // FILTRAR SOLO ÓRDENES CON LOS ESTADOS VALIDOS
    const validStatuses = ["PAID", "PROCESSING", "SHIPPED", "DELIVERED"];
    const filteredOrders = ordersRes.filter(order =>
      validStatuses.includes(order.orderStatus)
    );

    setOrderCount(filteredOrders.length);

    // Items recientes planos de las órdenes filtradas
    const recentOrderItems = filteredOrders
      .flatMap(order => order.orderItems)
      .slice(0, 4);
    setOrders(recentOrderItems);

    // Calcular ingresos sólo con órdenes filtradas
    const total = filteredOrders.reduce((acc, order) => acc + (order.totalPrice || 0), 0);
    setTotalRevenue(total);

  } catch (err) {
    logError("Error al obtener datos del dashboard", err);
  } finally {
    setLoadingUsers(false);
    setLoadingProducts(false);
    setLoadingOrders(false);
  }
}, [formattedDate]);



  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="flex flex-col flex-1">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <h1 className="text-lg font-semibold">Panel Administrativo</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <DashboardSummary
          userCount={userCount}
          productCount={productCount}
          orderCount={orderCount}
          totalRevenue={totalRevenue}
          loadingUsers={loadingUsers}
          loadingProducts={loadingProducts}
          loadingOrders={loadingOrders}
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <RecentOrders orders={orders} loadingOrders={loadingOrders} />
        </div>

        <QuickActions
          onOpenProductModal={() => setIsProductModalOpen(true)}
          isProductModalOpen={isProductModalOpen}
          onProductModalChange={setIsProductModalOpen}
          onUpdate={fetchData}
        />
      </main>
    </div>
  );
}
