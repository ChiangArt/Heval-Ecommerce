import { z } from "zod";

export const editProductSchema = z.object({
  title: z.string().min(1, "El título es obligatorio").optional(),
  description: z.string().min(1, "La descripción es obligatoria").optional(),
  material: z.string().min(1, "El material es obligatorio").optional(),
  price: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0").optional(),
  color: z.string().min(1, "El color es obligatorio").optional(),
  quantity: z.coerce.number().min(0, "La cantidad debe ser mayor o igual a 0").optional(),
  discountPercentage: z.coerce
    .number()
    .min(0, "El descuento no puede ser negativo")
    .max(100, "El descuento no puede ser mayor a 100")
    .optional(),
  discountUntil: z.string().optional(),
  collectionId: z.coerce.number().min(1, "Debes seleccionar una colección").optional(),
  imageUrls: z.array(z.string()).optional(),
});

export type EditProductFormValues = z.infer<typeof editProductSchema>;
