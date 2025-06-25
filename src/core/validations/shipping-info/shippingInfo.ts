import { z } from "zod";

export const shippingInfoSchema = z.object({
  fullAddress: z
    .string()
    .min(5, "La dirección completa es obligatoria"),

  apartmentOrFloor: z
    .string()
    .optional(),

  reference: z
    .string()
    .optional(),

  additionalInfo: z
    .string()
    .optional(),
});

export type ShippingFormValues = z.infer<typeof shippingInfoSchema>;
