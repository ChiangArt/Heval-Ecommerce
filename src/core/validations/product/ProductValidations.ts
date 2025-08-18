import { z } from "zod"

export const productSchema = z.object({
  title: z.string().min(1, "El título es requerido"),
  description: z.string().min(1, "La descripción es requerida"),
  material: z.string().min(1, "El material es requerido"),
  price: z.coerce.number().min(0, "El precio debe ser positivo"),
  color: z.string().min(0, "Debes ingresar el color color"),
  quantity: z.coerce.number().min(0, "La cantidad debe ser 0 o más"),
  discountPercentage: z.coerce.number().min(0).max(100),
  discountUntil: z.string().optional(),
  collectionId: z.coerce.number().min(1, "Selecciona una colección"),
  imageUrls: z.array(z.string()).optional(),
})


export type ProductFormValues = z.infer<typeof productSchema>;
