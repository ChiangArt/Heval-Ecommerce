import { z } from "zod"


export const promoSchema = z.object({
  email: z
    .string()
    .min(1, "El correo es obligatorio")
    .email("Correo inválido"),
});



export const couponSchema = z.object({
  code: z.string().min(1, "El código es requerido"),
  discountPercentage: z
    .number({ invalid_type_error: "Debe ser un número" })
    .min(1)
    .max(100),
  expiryDate: z.string().optional(),
  active: z.boolean().default(true),
});
