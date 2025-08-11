"use client";
import { ContactFormValues, accountDetailsSchema } from "@/core/validations/personal-info/accountDetailsSchema";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useRouter } from "next/navigation";

const initialValues: ContactFormValues = {
  fullName: "",
  email: "",
};

export default function Checkout() {
  const router = useRouter(); 

  const handleSubmit = (values: ContactFormValues) => {
    localStorage.setItem("guest_contact_info", JSON.stringify(values));
    console.log("Guardado en localStorage:", values);
    router.push("");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={accountDetailsSchema}
      onSubmit={handleSubmit}
    >
      <Form className="text-secundario bg-white p-10 max-w-lg mx-auto text-sm md:text-md">
        <div className="flex flex-row items-center gap-2 border-b-2 pb-4 mb-10">
          <span className="p-1 px-3 bg-primario text-white text-lg font-semibold">
            3
          </span>
          <h2 className="font-bold">Revisa y confirma tu compra</h2>
        </div>

        <h3 className="font-bold pb-3">DATOS DE ENVÍO</h3>

        {/* Nombre completo */}
        <label className="block mb-2">
          Dirección completa
          <Field
            name="address"
            placeholder="Ingresa tu dirección"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="address"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Celular */}
        <label className="block mb-2 mt-4">
          Piso / Depto
          <Field
            name="address"
            placeholder="000 000 000"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="address"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Email */}
        <label className="block mb-2 mt-4">
          Referencia
          <Field
            name="address"
            placeholder="Introduce tu email"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="address"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Documento de identidad */}
        <label className="block mb-2 mt-4">
          Información adicional
          <Field
            name="address"
            placeholder="Introduce el número"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="address"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>
      </Form>
    </Formik>
  );
}
