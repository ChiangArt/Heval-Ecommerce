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
import { useFormik } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { toast } from "react-hot-toast";
import { Tags } from "lucide-react";
import { postCollection } from "@/core/collection/action/collection.actions";
import { Title } from "../ui/title/Title";
import { useCollectionStore } from "@/store/admin/collection-store";

// 📌 Validación con Zod
const collectionSchema = z.object({
  name: z.string().min(1, "El nombre es requerido"),
  headlineTitle: z.string().min(1, "El título principal es requerido"),
  descriptionLine1: z.string().min(1, "La descripción 1 es requerida"),
  descriptionLine2: z.string().min(1, "La descripción 2 es requerida"),
});

export function AddCollectionModal() {
  const { fetchCollections } = useCollectionStore();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const formik = useFormik<z.infer<typeof collectionSchema>>({
    initialValues: {
      name: "",
      headlineTitle: "",
      descriptionLine1: "",
      descriptionLine2: "",
    },
    validationSchema: toFormikValidationSchema(collectionSchema),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        await postCollection(values);
        await fetchCollections();

        toast.success("Colección creada exitosamente");
        setOpen(false);
        formik.resetForm();
      } catch (error) {
        console.error(error);
        toast.error("Error al crear la colección");
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        setOpen(isOpen);
        if (!isOpen) {
          formik.resetForm();
        }
      }}
    >
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="h-24 flex-col gap-2 w-full cursor-pointer"
        >
          <Tags className="h-6 w-6" />
          <span>Crear colección</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="!w-full !max-w-[80vw] !p-6">
        <DialogHeader>
          <DialogTitle>Nueva colección</DialogTitle>
          <DialogDescription>
            Completa los detalles de la colección y observa la vista previa en
            tiempo real.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={formik.handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2  gap-6 py-4"
        >
          {/* 📝 Formulario */}
          <div className="space-y-4">
            <div>
              <Label>Nombre</Label>
              <Input
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Título principal</Label>
              <Input
                name="headlineTitle"
                value={formik.values.headlineTitle}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Descripción línea 1</Label>
              <Input
                name="descriptionLine1"
                value={formik.values.descriptionLine1}
                onChange={formik.handleChange}
              />
            </div>

            <div>
              <Label>Descripción línea 2</Label>
              <Input
                name="descriptionLine2"
                value={formik.values.descriptionLine2}
                onChange={formik.handleChange}
              />
            </div>

            <DialogFooter>
              <Button
                className="cursor-pointer"
                type="submit"
                disabled={loading}
              >
                {loading ? "Creando..." : "Crear colección"}
              </Button>
            </DialogFooter>
          </div>

          {/* 👁️ Vista previa */}
          <div className="border rounded p-4 bg-muted h-fit">
            <Title
              headerItems={[
                "Nueva Colección",
                `01/${new Date().getFullYear()}`,
                "Disponible ya",
              ]}
              title={formik.values.headlineTitle}
              description1={formik.values.descriptionLine1}
              description2={formik.values.descriptionLine2}
              className="text-xs md:text-base"
            />
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
