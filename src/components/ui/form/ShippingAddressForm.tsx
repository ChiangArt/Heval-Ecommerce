"use client";
import { createPreference, postOrder } from "@/core/order/action/order.actions";
import {
  ShippingFormValues,
  shippingInfoSchema,
} from "@/core/validations/shipping-info/shippingInfo";
import { ErrorMessage, Field, Form, Formik } from "formik";

const initialValues: ShippingFormValues = {
  fullAddress: "",
  apartmentOrFloor: "",
  reference: "",
  additionalInfo: "",
};

export default function ShippingAddressForm() {
  const handleSubmit = async (values: ShippingFormValues) => {
    // 1. Obtener los datos completos del localStorage
    const contactData = JSON.parse(
      localStorage.getItem("guest_contact_info") || "{}"
    );

    const shippingInfo = {
      ...contactData,
      ...values,
      district: contactData.district || "Lima",
      province: contactData.province || "Lima",
      department: contactData.department || "Lima",
    };

    try {
      // 2. Crear la orden
      const orderCreated = await postOrder(shippingInfo);

      // 3. Obtener el orderId retornado por el backend
      const orderId = orderCreated.orderId; // o como se llame tu propiedad
      console.log("Orden creada:", orderCreated);
      if (!orderId) {
        alert("No se pudo obtener el ID de la orden.");
        return;
      }

      localStorage.setItem("current_order_id", orderId.toString());

      await createPreference(orderId);
      return;
    } catch (error) {
      console.error("Error durante el proceso de checkout:", error);
      alert("Ocurrió un error al finalizar el pedido.");
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        try {
          shippingInfoSchema.parse(values);
          return {};
        } catch (error: any) {
          const errors: Record<string, string> = {};
          error.errors.forEach((err: any) => {
            errors[err.path[0]] = err.message;
          });
          return errors;
        }
      }}
      onSubmit={handleSubmit}
    >
      <Form className="text-secundario bg-white p-10 max-w-lg mx-auto text-sm md:text-md">
        <div className="flex flex-row items-center gap-2 border-b-2 pb-4 mb-10">
          <span className="p-1 px-3 bg-primario text-white text-lg font-semibold">
            2
          </span>
          <h2 className="font-bold">Información de envío</h2>
        </div>

        <h3 className="font-bold pb-3">DATOS DE ENVÍO</h3>

        {/* Nombre completo */}
        <label className="block mb-2">
          Dirección completa
          <Field
            name="fullAddress"
            placeholder="Ingresa tu dirección"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="fullAddress"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Celular */}
        <label className="block mb-2 mt-4">
          Piso / Depto
          <Field
            name="apartmentOrFloor"
            placeholder="000 000 000"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="apartmentOrFloor"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Email */}
        <label className="block mb-2 mt-4">
          Referencia
          <Field
            name="reference"
            placeholder="Introduce tu email"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="reference"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Documento de identidad */}
        <label className="block mb-2 mt-4">
          Información adicional
          <Field
            name="additionalInfo"
            placeholder="Introduce el número"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="additionalInfo"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>
        <div className="mt-6">
          <button
            type="submit"
            className="bg-primario text-white py-3 px-6 font-bold hover:bg-opacity-90 transition w-full"
          >
            FINALIZAR PEDIDO
          </button>
        </div>
      </Form>
    </Formik>
  );
}
