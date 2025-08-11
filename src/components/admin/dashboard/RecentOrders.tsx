import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { OrderItem } from "@/core/order/interface/order";

interface RecentOrdersProps {
  orders: OrderItem[];
  loadingOrders: boolean;
}

export function RecentOrders({ orders, loadingOrders }: RecentOrdersProps) {
  const [selectedOrderItem, setSelectedOrderItem] = useState<OrderItem | null>(null);

  if (loadingOrders) {
    return (
      <div className="col-span-3 flex items-center justify-center h-[300px] bg-muted rounded">
        <p>Cargando órdenes recientes...</p>
      </div>
    );
  }

  return (
    <>
      <Card className="col-span-full w-full">
        <CardHeader>
          <CardTitle>Órdenes recientes</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {orders.length === 0 ? (
            <p>No hay órdenes recientes.</p>
          ) : (
            orders.map((orderItem) => (
              <div key={orderItem.id} className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{orderItem.productTitle}</p>
                  <p className="text-xs text-muted-foreground">
                    {orderItem.quantity} unidad(es) · ${orderItem.discountedPrice}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedOrderItem(orderItem)}>
                  Ver
                </Button>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Modal */}
      {selectedOrderItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded p-6 max-w-md w-full relative shadow-lg">
            <button
              onClick={() => setSelectedOrderItem(null)}
              className="absolute top-2 right-2 text-xl font-bold hover:text-red-600"
              aria-label="Cerrar modal"
            >
              ×
            </button>

            <h2 className="text-xl font-semibold mb-4">Detalles del producto</h2>

            <p><strong>Producto:</strong> {selectedOrderItem.productTitle}</p>
            <p><strong>Cantidad:</strong> {selectedOrderItem.quantity}</p>
            <p><strong>Precio unitario:</strong> S/{selectedOrderItem.price}</p>
            <p><strong>Precio descontado:</strong> S/{selectedOrderItem.discountedPrice}</p>
            <p><strong>Subtotal:</strong> S/{(selectedOrderItem.discountedPrice * selectedOrderItem.quantity).toFixed(2)}</p>

            {/* Puedes agregar más detalles si los tienes disponibles */}
          </div>
        </div>
      )}
    </>
  );
}
