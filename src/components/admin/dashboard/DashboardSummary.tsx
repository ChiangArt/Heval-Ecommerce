import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Users, Package, ShoppingCart, CreditCard } from "lucide-react";

interface DashboardSummaryProps {
  userCount: number;
  productCount: number;
  orderCount: number;
  totalRevenue: number;
  loadingUsers: boolean;
  loadingProducts: boolean;
  loadingOrders: boolean;
}

export function DashboardSummary({
  userCount,
  productCount,
  orderCount,
  totalRevenue,
  loadingUsers,
  loadingProducts,
  loadingOrders,
}: DashboardSummaryProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-sm">Usuarios totales</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loadingUsers ? (
            <p>Cargando usuarios...</p>
          ) : (
            <div className="text-2xl font-bold">{userCount}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-sm">Productos</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loadingProducts ? (
            <p>Cargando productos...</p>
          ) : (
            <div className="text-2xl font-bold">{productCount}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-sm">Órdenes</CardTitle>
          <ShoppingCart className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loadingOrders ? (
            <p>Cargando órdenes...</p>
          ) : (
            <div className="text-2xl font-bold">{orderCount}</div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex justify-between items-center pb-2">
          <CardTitle className="text-sm">Ingresos del día</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          {loadingOrders ? (
            <p>Cargando ingresos...</p>
          ) : (
            <div className="text-2xl font-bold">S/{totalRevenue.toFixed(2)}</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
