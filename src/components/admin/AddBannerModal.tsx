"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import { ImageIcon } from "lucide-react";
import { upload } from "@/core/upload/action/upload.actions";
import { createBanner } from "@/core/banner/action/banner.actions"; // usa tu nuevo módulo

export function AddBannerModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const [fileWeb, setFileWeb] = useState<File | null>(null);
  const [fileMobile, setFileMobile] = useState<File | null>(null);

  const [previewWeb, setPreviewWeb] = useState<string | null>(null);
  const [previewMobile, setPreviewMobile] = useState<string | null>(null);

  const handleWebChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileWeb(file);
      setPreviewWeb(URL.createObjectURL(file));
    }
  };

  const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileMobile(file);
      setPreviewMobile(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!fileWeb || !fileMobile) {
      toast.error("Selecciona ambos videos (web y móvil)");
      return;
    }

    setLoading(true);
    try {
      const [urlWeb, urlMobile] = await Promise.all([
        upload(fileWeb, "videos"),
        upload(fileMobile, "videos"),
      ]);

      await createBanner({
        urls: [urlWeb, urlMobile],
      });

      toast.success("Banner agregado correctamente");
      setOpen(false);
      setFileWeb(null);
      setFileMobile(null);
      setPreviewWeb(null);
      setPreviewMobile(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al agregar el banner");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          setFileWeb(null);
          setFileMobile(null);
          setPreviewWeb(null);
          setPreviewMobile(null);
        }
      }}
    >
      <DialogTrigger asChild>
        <Button variant="outline" className="h-24 flex-col gap-2 w-full cursor-pointer">
          <ImageIcon className="h-6 w-6" />
          <span>Agregar Banner</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-4xl w-full">
        <DialogHeader>
          <DialogTitle>Nuevo Banner</DialogTitle>
          <DialogDescription>
            Sube un video para escritorio y otro para móvil.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-4">
          {/* Formulario */}
          <div className="space-y-4">
            <div>
              <Label>Video para escritorio</Label>
              <Input type="file" accept="video/*" onChange={handleWebChange} />
            </div>

            <div>
              <Label>Video para móvil</Label>
              <Input type="file" accept="video/*" onChange={handleMobileChange} />
            </div>

            <DialogFooter className="pt-4">
              <Button onClick={handleSubmit} disabled={loading}>
                {loading ? "Subiendo..." : "Agregar Banner"}
              </Button>
            </DialogFooter>
          </div>

          {/* Vista previa única */}
          <div className="space-y-4 border bg-muted p-4 rounded-md h-fit">
            {previewWeb && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vista escritorio</p>
                <video src={previewWeb} controls className="w-full rounded-md" />
              </div>
            )}
            {previewMobile && (
              <div>
                <p className="text-sm text-muted-foreground mb-1">Vista móvil</p>
                <video src={previewMobile} controls className="w-full rounded-md" />
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
