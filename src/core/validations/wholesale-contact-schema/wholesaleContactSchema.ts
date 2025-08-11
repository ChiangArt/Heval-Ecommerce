import { z } from "zod";

export const wholesaleContactSchema = z.object({
  name: z.string().trim().nonempty("El nombre es obligatorio"),
  email: z
    .string()
    .trim()
    .nonempty("El correo es obligatorio")
    .email("Correo electrónico inválido"),
  message: z
    .string()
    .trim()
    .nonempty("El mensaje es obligatorio")
    .min(10, "El mensaje debe tener al menos 10 caracteres"),
});

export type WholesaleContactFormValues = z.infer<typeof wholesaleContactSchema>;
