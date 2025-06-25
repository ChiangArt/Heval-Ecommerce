import { z } from "zod";

export const personalInfoSchema = z.object({
  fullName: z
    .string()
    .min(2, "El nombre debe tener al menos 2 caracteres")
    .nonempty("Nombre completo requerido"),

  cel: z
    .string()
    .regex(/^9\d{8}$/, "El celular debe tener 9 dígitos y empezar con 9"),

  email: z
    .string()
    .email("Correo electrónico no válido"),

  documentType: z.enum(["DNI", "CE"], {
    errorMap: () => ({ message: "Tipo de documento debe ser DNI o CE" }),
  }),

  identityDocument: z
    .string()
    .refine(
      (value) =>
        /^[0-9]{8}$/.test(value) || /^[a-zA-Z0-9]{9}$/.test(value),
      "Documento inválido (DNI: 8 dígitos, CE: 9 caracteres alfanuméricos)"
    ),
});

export type ContactFormValues = z.infer<typeof personalInfoSchema>;
