"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import { createProduct } from "@/core/product/action/product.actions";
import { productSchema } from "@/core/validations/product/ProductValidations";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCollectionStore } from "@/store/admin/collection-store";
import { logError } from "@/app/utils/logger";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useImageUpload } from "@/hooks/useImageUpload";
import { InputField } from "@/components/ui/form/InputField";
import { SelectField } from "@/components/ui/form/SelectField";
import { TextareaField } from "@/components/ui/form/TextareaField";

interface CreateProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreated?: () => void;
}

export function CreateProductModal({
  open,
  onOpenChange,
  onCreated,
}: CreateProductModalProps) {
  const { collections, fetchCollections } = useCollectionStore();
  const [loading, setLoading] = useState(false);

  const {
    files,
    previews: imagePreviews,
    handleFileChange,
    uploadFiles,
    resetImages,
  } = useImageUpload();

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  const initialValues = {
    title: "",
    description: "",
    material: "",
    price: 0,
    color: "",
    quantity: 0,
    discountPercentage: 0,
    discountUntil: "",
    collectionId: 0,
    imageUrls: [],
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Nuevo producto</DialogTitle>
          <DialogDescription>
            Completa los detalles del nuevo producto.
          </DialogDescription>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={toFormikValidationSchema(productSchema)}
          onSubmit={async (values, { resetForm }) => {
            setLoading(true);
            try {
              const imageUrls =
                files.length > 0 ? await uploadFiles() : imagePreviews;

              await createProduct({ ...values, imageUrls });
              toast.success("Producto agregado exitosamente");

              onOpenChange(false);
              resetForm();
              resetImages();
              onCreated?.();
            } catch (err) {
              logError(err);
              toast.error("Error al guardar producto");
            } finally {
              setLoading(false);
            }
          }}
        >
          <Form className="grid gap-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField name="title" label="Título" />
              <InputField name="material" label="Material" />
              <SelectField
                name="collectionId"
                label="Colección"
                options={collections.map((col) => ({
                  value: col.id,
                  label: col.name,
                }))}
              />
            </div>

            <TextareaField name="description" label="Descripción" />
            <InputField name="price" label="Precio" type="number" />
            <InputField name="quantity" label="Cantidad" type="number" />
            <InputField name="discountPercentage" label="Descuento (%)" type="number" />
            <InputField name="discountUntil" label="Fecha de descuento" type="datetime-local" />
            <InputField name="color" label="Color" />

            <div>
              <Label>Imágenes</Label>
              <Input type="file" multiple accept="image/*" onChange={handleFileChange} />
              {imagePreviews.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                  {imagePreviews.map((src, idx) => (
                    <div key={idx} className="relative w-full h-32 border rounded overflow-hidden">
                      <Image src={src} alt={`Imagen ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Agregando..." : "Agregar producto"}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
