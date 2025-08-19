import { z } from "zod";

export const createProductSchema = z.object({
  title: z.string().nonempty("El título es requerido"),
  description: z.string().nonempty("La descripción es requerida"),
  material: z.string().nonempty("El material es requerido"),
  color: z.string().nonempty("Debes ingresar el color"),

  price: z.coerce.number({
    required_error: "El precio es requerido",
    invalid_type_error: "El precio debe ser un número",
  }).min(0, "El precio debe ser positivo"),

  quantity: z.coerce.number({
    required_error: "La cantidad es requerida",
    invalid_type_error: "La cantidad debe ser un número",
  }).min(0, "La cantidad debe ser 0 o más"),

  discountPercentage: z.coerce.number().min(0).max(100),
  discountUntil: z.string().optional(),

  collectionId: z.coerce.number({
    required_error: "Selecciona una colección",
    invalid_type_error: "La colección debe ser un número válido",
  }).min(1, "Selecciona una colección"),

  imageUrls: z.array(
  z.string().nonempty("La URL de la imagen no puede estar vacía")
).min(1, "Debes subir al menos una imagen"),

});

export type createProductFormValues = z.infer<typeof createProductSchema>;
