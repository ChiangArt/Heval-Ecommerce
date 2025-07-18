"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "@/components/ui/button"
import { getOrdersByAdmin } from "@/core/order/action/order.actions"
import { Order } from "@/core/order/interface/order"
import { format } from "date-fns"
import { es } from "date-fns/locale"

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getOrdersByAdmin()
        setOrders(data)
      } catch (error) {
        console.error("Error al obtener órdenes del admin:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Órdenes de Clientes</h1>

      {loading ? (
        <div className="space-y-2">
          {Array.from({ length: 5 }).map((_, i) => (
            <Skeleton key={i} className="h-10 w-full rounded-md" />
          ))}
        </div>
      ) : (
        <div className="border rounded-md overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Cliente</TableHead>
                <TableHead>Fecha</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.orderId}>
                  <TableCell>{order.orderId}</TableCell>
                  <TableCell>{order.contactInfo.fullName}</TableCell>
                  <TableCell>
                    {format(new Date(order.createdAt), "dd MMM yyyy HH:mm", {
                      locale: es,
                    })}
                  </TableCell>
                  <TableCell>S/ {order.totalPrice.toFixed(2)}</TableCell>
                  <TableCell className="capitalize">
                    {order.orderStatus.toLowerCase()}
                  </TableCell>
                  <TableCell className="text-right">
                    <Link href={`/dashboard/orders/${order.orderId}`}>
                      <Button size="sm" variant="outline">
                        Ver Detalle
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
