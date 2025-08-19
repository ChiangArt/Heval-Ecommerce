import { z } from "zod";

export const editProductSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  material: z.string().min(1, "El material es obligatorio"),
  price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
  color: z.string().min(1, "El color es obligatorio"),
  quantity: z.coerce.number().min(0, "La cantidad debe ser mayor o igual a 0"),
  discountPercentage: z.coerce
    .number()
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor a 100"),
  discountUntil: z.string().optional(), 
  collectionId: z.coerce.number().min(1, "Debes seleccionar una colección"),
  imageUrls: z.array(z.string()).optional(), 
});

export type EditProductFormValues = z.infer<typeof editProductSchema>;
