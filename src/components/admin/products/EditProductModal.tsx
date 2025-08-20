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
import toast from "react-hot-toast";
import { Formik, Form } from "formik";
import { updateProduct } from "@/core/product/action/product.actions";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { useCollectionStore } from "@/store/admin/collection-store";
import { useImageUpload } from "@/hooks/useImageUpload";
import { logError } from "@/app/utils/logger";
import { Product } from "@/core/product/interface/productResponse";
import Image from "next/image";
import { useEffect, useState } from "react";
import { InputField } from "@/components/ui/form/InputField";
import { TextareaField } from "@/components/ui/form/TextareaField";
import { SelectField } from "@/components/ui/form/SelectField";
import { Input } from "@/components/ui/input";
import { EditProductFormValues, editProductSchema } from "@/core/validations/product/editProductValidatios";

interface EditProductModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product;
  onUpdated?: () => void;
}

export function EditProductModal({
  open,
  onOpenChange,
  product,
  onUpdated,
}: EditProductModalProps) {
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
    title: product.title,
    description: product.description,
    material: product.material,
    price: product.price,
    color: product.color,
    quantity: product.quantity,
    discountPercentage: product.discountPercentage,
    discountUntil: product.discountUntil
      ? new Date(product.discountUntil).toISOString().slice(0, 16)
      : "",
    collectionId: product.collectionId,
    imageUrls: product.imageUrls,
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-full !max-w-[95vw]">
        <DialogHeader>
          <DialogTitle>Editar producto</DialogTitle>
          <DialogDescription>
            Modifica los detalles del producto.
          </DialogDescription>
        </DialogHeader>

        <Formik<EditProductFormValues>
          initialValues={initialValues}
          enableReinitialize
          validationSchema={toFormikValidationSchema(editProductSchema)}
          onSubmit={async (values) => {
            setLoading(true);
            try {
              const imageUrls =
                files.length > 0 ? await uploadFiles() : values.imageUrls;

              await updateProduct(product.id, { ...values, imageUrls });
              console.log("Descripción del producto:", product.description);

              toast.success("Producto actualizado exitosamente");

              onOpenChange(false);
              resetImages();
              onUpdated?.();
            } catch (err) {
              logError(err);
              toast.error("Error al actualizar producto");
            } finally {
              setLoading(false);
            }
          }}
          
        >
          <Form className="grid gap-6 py-4">
            <InputField<EditProductFormValues> name="title" label="Título" />
            <TextareaField<EditProductFormValues> name="description" label="Descripción" />
            <InputField<EditProductFormValues> name="price" label="Precio" type="number" />
            <InputField<EditProductFormValues> name="quantity" label="Cantidad" type="number" />
            <SelectField<EditProductFormValues>
              name="collectionId"
              label="Colección"
              options={collections.map((col) => ({
                value: col.id,
                label: col.name,
              }))}
            />
            {/* imágenes */}
            <div>
              <Input
                type="file"
                multiple
                accept="image/*"
                onChange={handleFileChange}
              />
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                {(files.length > 0 ? imagePreviews : product.imageUrls).map(
                  (src, idx) => (
                    <div
                      key={idx}
                      className="relative w-full h-32 border rounded overflow-hidden"
                    >
                      <Image
                        src={src}
                        alt={`Imagen ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  )
                )}
              </div>
            </div>

            <DialogFooter>
              <Button type="submit" disabled={loading}>
                {loading ? "Actualizando..." : "Actualizar producto"}
              </Button>
            </DialogFooter>
          </Form>
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
