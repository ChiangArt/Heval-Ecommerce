"use client";

import { useEffect, useState } from "react";
import { Users, ShoppingCart, Package, CreditCard } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getOrdersByAdmin } from "@/core/order/action/order.actions";
import { getProducts } from "@/core/product/action/product.actions";
import { getUsers } from "@/core/user/action/user.actions";
import { OrderItem } from "@/core/order/interface/order";
import { AddProductModal } from "@/components/admin/AddProductModal";
import { AddCollectionModal } from "@/components/admin/AddCollectionModal";
import { AddCouponModal } from "@/components/admin/AddCouponModal";
import { AddBannerModal } from "@/components/admin/AddBannerModal";

export default function AdminDashboard() {
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);

  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [orders, setOrders] = useState<OrderItem[]>([]);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const fetchData = async () => {
    try {
      const [users, productsRes, ordersRes] = await Promise.all([
        getUsers(),
        getProducts(),
        getOrdersByAdmin(),
      ]);

      setUserCount(users.length);
      setProductCount(productsRes.content.length);
      setOrderCount(ordersRes.length);

      const recentOrderItems = ordersRes
        .flatMap((order) => order.orderItems)
        .slice(0, 4);

      setOrders(recentOrderItems);

      const total = ordersRes.reduce(
        (acc, order) => acc + (order.totalPrice || 0),
        0
      );
      setTotalRevenue(total);
    } catch (err) {
      console.error("Error al obtener datos del dashboard", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col flex-1">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        <h1 className="text-lg font-semibold">Panel Administrativo</h1>
      </header>

      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        {/* Resumen */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Usuarios totales</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Productos</CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{productCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Órdenes</CardTitle>
              <ShoppingCart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{orderCount}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex justify-between items-center pb-2">
              <CardTitle className="text-sm">Ingresos</CardTitle>
              <CreditCard className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                S/{totalRevenue.toFixed(2)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Órdenes recientes */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Ventas recientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] bg-muted rounded flex items-center justify-center">
                Gráfico de ventas
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-3">
            <CardHeader>
              <CardTitle>Órdenes recientes</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {orders.map((orderItem) => (
                <div key={orderItem.id} className="flex justify-between">
                  <div>
                    <p className="text-sm font-medium">
                      {orderItem.productTitle}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {orderItem.quantity} unidad(es) · $
                      {orderItem.discountedPrice}
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Ver
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Acciones rápidas */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Button
            variant="outline"
            className="h-24 flex-col gap-2 w-full cursor-pointer"
            onClick={() => setIsProductModalOpen(true)}
          >
            <Package className="h-6 w-6" />
            <span>Agregar producto</span>
          </Button>

          <AddProductModal
            open={isProductModalOpen}
            onOpenChange={setIsProductModalOpen}
            onUpdate={fetchData}
          />
          <AddCollectionModal />
          <AddCouponModal />
          <AddBannerModal />
        </div>
      </main>
    </div>
  );
}
