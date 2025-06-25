// core/validations/register/RegisterSchema.ts
import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().min(1, "Nombre requerido"),
  email: z.string().email("Correo inválido"),
  password: z
    .string()
    .min(8, "Mínimo 8 caracteres")
    .regex(/[A-Z]/, "Debe tener al menos una mayúscula")
    .regex(/[0-9]/, "Debe tener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe tener un carácter especial"),
  role: z.literal("CLIENT"),
});

export type RegisterValues = z.infer<typeof registerSchema>;
