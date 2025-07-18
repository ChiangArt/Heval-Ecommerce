import { z } from "zod";

export const accountDetailsSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .nonempty("Nombre completo requerido"),

  email: z
    .string()
    .email("Correo electrónico no válido"),

  password: z
    .string()
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .regex(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])/, "Debe incluir una mayúscula, un número y un símbolo")
    .optional()
    .or(z.literal("")), 
});


export type ContactFormValues = z.infer<typeof accountDetailsSchema>;
