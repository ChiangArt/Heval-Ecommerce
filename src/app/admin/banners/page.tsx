"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
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

import {
  getAllBanners,
  deleteBanner,
} from "@/core/banner/action/banner.actions";
import { logError } from "@/app/utils/logger";

export interface Banner {
  id: number;
  urls: string[]; // [desktopUrl, mobileUrl]
}

export default function AdminBanners() {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);

  const [bannerToDelete, setBannerToDelete] = useState<Banner | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        setLoading(true);
        const res = await getAllBanners();
        setBanners(res);
      } catch (err) {
        logError("Error al cargar banners", err);
        toast.error("Error al cargar banners");
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Detectar si es video o imagen
  const isVideo = (url: string) => /\.(mp4|webm|ogg)$/i.test(url);
  const isImage = (url: string) => /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(url);

  return (
    <div className="flex min-h-screen w-full">
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <h1 className="text-lg font-semibold">Banners</h1>
        </header>

        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Banners</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <p className="text-muted-foreground">Cargando banners...</p>
              ) : banners.length === 0 ? (
                <p className="text-muted-foreground">
                  No hay banners disponibles.
                </p>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Visualización</TableHead>
                      <TableHead className="text-right">Acciones</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {banners.map((banner) => {
                      const [desktopUrl, mobileUrl] = banner.urls;

                      return (
                        <TableRow key={banner.id}>
                          <TableCell>
                            <div className="flex flex-col gap-6">
                              {/* Desktop */}
                              <div>
                                <p className="font-semibold mb-2">Desktop:</p>
                                {desktopUrl ? (
                                  isVideo(desktopUrl) ? (
                                    <video
                                      src={desktopUrl}
                                      controls
                                      className="w-[480px] h-[270px] rounded border object-cover"
                                    />
                                  ) : isImage(desktopUrl) ? (
                                    <div className="relative w-[480px] h-[270px] rounded overflow-hidden border">
                                      <Image
                                        src={desktopUrl}
                                        alt={`Banner ${banner.id} escritorio`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        unoptimized
                                      />
                                    </div>
                                  ) : (
                                    <a
                                      href={desktopUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline text-sm"
                                    >
                                      Ver archivo escritorio
                                    </a>
                                  )
                                ) : (
                                  <p className="text-sm italic text-gray-500">
                                    Sin URL para desktop
                                  </p>
                                )}
                              </div>

                              {/* Mobile */}
                              <div>
                                <p className="font-semibold mb-2">Móvil:</p>
                                {mobileUrl ? (
                                  isVideo(mobileUrl) ? (
                                    <video
                                      src={mobileUrl}
                                      controls
                                      className="w-[320px] h-[180px] rounded border object-cover"
                                    />
                                  ) : isImage(mobileUrl) ? (
                                    <div className="relative w-[320px] h-[180px] rounded overflow-hidden border">
                                      <Image
                                        src={mobileUrl}
                                        alt={`Banner ${banner.id} móvil`}
                                        fill
                                        style={{ objectFit: "cover" }}
                                        unoptimized
                                      />
                                    </div>
                                  ) : (
                                    <a
                                      href={mobileUrl}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className="text-blue-600 underline text-sm"
                                    >
                                      Ver archivo móvil
                                    </a>
                                  )
                                ) : (
                                  <p className="text-sm italic text-gray-500">
                                    Sin URL para móvil
                                  </p>
                                )}
                              </div>
                            </div>
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
                                    setBannerToDelete(banner);
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
                      );
                    })}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>

          <Dialog
            open={isDeleteDialogOpen}
            onOpenChange={setIsDeleteDialogOpen}
          >
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Eliminar banner</DialogTitle>
                <DialogDescription>
                  ¿Estás seguro que deseas eliminar ambos banners?
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
                    if (!bannerToDelete) return;
                    setDeleting(true);
                    try {
                      await deleteBanner(bannerToDelete.id);
                      toast.success("Banner eliminado");
                      const updated = await getAllBanners();
                      setBanners(updated);
                    } catch (err) {
                      logError(err);
                      toast.error("Error al eliminar banner");
                    } finally {
                      setDeleting(false);
                      setBannerToDelete(null);
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
