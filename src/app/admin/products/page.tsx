"use client";
import { useEffect, useState } from "react";
import {
  deleteProduct,
  getAdminProducts,
} from "@/core/product/action/product.actions";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Plus, Search, MoreVertical, Edit, Trash } from "lucide-react";
import { Product } from "@/core/product/interface/productResponse";
import Image from "next/image";
import { AddProductModal } from "@/components/admin/AddProductModal";
import toast from "react-hot-toast";

export default function AdminProducts() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productToEdit, setProductToEdit] = useState<Product | undefined>(undefined);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");

  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => clearTimeout(handler);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await getAdminProducts(0, 20, {
          searchText: debouncedSearchTerm,
        });
        setProducts(res.content);
      } catch (err) {
        console.error("Error al cargar productos", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [debouncedSearchTerm]);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-lg font-semibold">Productos</h1>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar productos..."
                className="pl-9"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                className="gap-2"
                onClick={() => {
                  setProductToEdit(undefined);
                  setIsModalOpen(true);
                }}
              >
                <Plus className="h-4 w-4" />
                Nuevo producto
              </Button>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Lista de Productos</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Cargando productos...</p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Imagenes</TableHead>
                      <TableHead>Producto</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Descuento</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Estado</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {products.map((product) => (
                      <TableRow key={product.id}>
                        <TableCell>
                          <div className="flex items-center">
                            {product.imageUrls.slice(0, 4).map((url, index) => (
                              <div
                                key={index}
                                className={`relative w-10 h-10 border-2 border-white rounded-full overflow-hidden ${index > 0 ? "-ml-3" : ""}`}
                              >
                                <Image
                                  src={url}
                                  alt={product.title}
                                  fill
                                  className="object-cover"
                                  sizes="40px"
                                />
                              </div>
                            ))}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">{product.title}</TableCell>
                        <TableCell>${product.price.toFixed(2)}</TableCell>
                        <TableCell>${product.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>{product.quantity}</TableCell>
                        <TableCell>
                          <Badge variant={product.quantity > 0 ? "default" : "destructive"}>
                            {product.quantity > 0 ? "Activo" : "Sin stock"}
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
                                className="gap-2 cursor-pointer"
                                onClick={() => {
                                  setProductToEdit(product);
                                  setIsModalOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                                Editar
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="gap-2 text-destructive cursor-pointer"
                                onClick={() => {
                                  setProductToDelete(product);
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

          <div className="flex items-center justify-end gap-4">
            <Button variant="outline" size="sm" disabled>
              Anterior
            </Button>
            <span className="text-sm text-muted-foreground">Página 1</span>
            <Button variant="outline" size="sm" disabled>
              Siguiente
            </Button>
          </div>

          <AddProductModal
            open={isModalOpen}
            onOpenChange={setIsModalOpen}
            productToEdit={productToEdit}
            onUpdate={() => {
              setIsModalOpen(false);
              setProductToEdit(undefined);
              getAdminProducts(0, 20, {
                searchText: debouncedSearchTerm,
              }).then((res) => setProducts(res.content));
            }}
          />

          <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Eliminar producto</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro que deseas eliminar
                  <span className="font-semibold"> {productToDelete?.title}</span>?
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
                    if (!productToDelete) return;
                    setDeleting(true);
                    try {
                      await deleteProduct(productToDelete.id);
                      toast.success("Producto eliminado");
                      const res = await getAdminProducts(0, 20, {
                        searchText: debouncedSearchTerm,
                      });
                      setProducts(res.content);
                    } catch (err) {
                      console.error(err);
                      toast.error("Error al eliminar producto");
                    } finally {
                      setDeleting(false);
                      setProductToDelete(null);
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
