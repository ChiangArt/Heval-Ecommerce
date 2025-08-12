import { logError } from "@/app/utils/logger";
import productsApi from "@/core/api/productsApi";
import { WholesaleContactFormValues } from "@/core/validations/wholesale-contact-schema/wholesaleContactSchema";

export const sendWholesaleContact = async (
  form: WholesaleContactFormValues
): Promise<{ message: string }> => {
  try {
    const { data } = await productsApi.post("/wholesale-contact", form);
    return data;
  } catch (error) {
    logError("❌ Error al enviar el formulario de contacto mayorista:", error);
    throw error;
  }
};
