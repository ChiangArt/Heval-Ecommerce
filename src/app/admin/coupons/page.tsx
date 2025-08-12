"use client";
import { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { MoreVertical, Trash } from "lucide-react";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getCoupons, deleteCouponById } from "@/core/coupon/action/coupon.actions";
import { Badge } from "@/components/ui/badge";
import { Coupon } from "@/core/coupon/interface/CouponResponse";
import { logError } from "@/app/utils/logger";

export default function AdminCoupons() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponToDelete, setCouponToDelete] = useState<Coupon | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchCoupons = async () => {
      try {
        setLoading(true);
        const res = await getCoupons();
        setCoupons(res);
      } catch (err) {
        logError("Error al cargar cupones", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, []);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-lg font-semibold">Cupones</h1>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Cupones</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Cargando cupones...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Código</TableHead>
                      <TableHead>Descuento</TableHead>
                      <TableHead>Válido hasta</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {coupons.map((coupon) => (
                      <TableRow key={coupon.id}>
                        <TableCell>{coupon.code}</TableCell>
                        <TableCell>{coupon.discountPercentage}%</TableCell>
                        <TableCell>
                          {new Date(coupon.expiryDate).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant={coupon.active ? "default" : "destructive"}>
                            {coupon.active ? "Activo" : "Inactivo"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreVertical className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem
                                className="gap-2 text-destructive cursor-pointer"
                                onClick={() => {
                                  setCouponToDelete(coupon);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash className="h-4 w-4" />
                                Eliminar
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Eliminar cupón</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro que deseas eliminar el cupón
                  <span className="font-semibold"> {couponToDelete?.code}</span>?
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setIsDeleteDialogOpen(false)}
                  disabled={deleting}
                >
                  Cancelar
                </Button>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    if (!couponToDelete) return;
                    setDeleting(true);
                    try {
                      await deleteCouponById(couponToDelete.id);
                      toast.success("Cupón eliminado");
                      const updated = await getCoupons();
                      setCoupons(updated);
                    } catch (err) {
                      logError(err);
                      toast.error("Error al eliminar cupón");
                    } finally {
                      setDeleting(false);
                      setCouponToDelete(null);
                      setIsDeleteDialogOpen(false);
                    }
                  }}
                  disabled={deleting}
                >
                  {deleting ? "Eliminando..." : "Eliminar"}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
}
