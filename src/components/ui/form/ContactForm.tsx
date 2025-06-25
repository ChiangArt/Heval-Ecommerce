"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import Link from "next/link";
import {ContactFormValues, personalInfoSchema} from "@/core/validations/personal-info/personalInfo";
import { useRouter } from "next/navigation";
import { startTransition } from "react";

const initialValues: ContactFormValues = {
  fullName: "",
  cel: "",
  email: "",
  documentType: "DNI",
  identityDocument: "",
};

export default function ContactForm() {
  const router = useRouter();

  const handleSubmit = (values: ContactFormValues) => {
    localStorage.setItem("guest_contact_info", JSON.stringify(values));
    startTransition(() => {
      router.push("/shop/checkout/address"); // o .replace() si no quieres que vuelvan atrás
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validate={(values) => {
        try {
          personalInfoSchema.parse(values); // validación Zod
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
      <Form className="max-w-lg mx-auto text-sm md:text-md">
        <div className="flex flex-row items-center gap-2 border-b-2 pb-4 mb-10">
          <span className="p-1 px-3 bg-primario text-white text-lg font-semibold">
            1
          </span>
          <h2 className="font-bold">Completa tus datos personales</h2>
        </div>

        <h3 className="font-bold pb-3">FORMULARIO DE CONTACTO</h3>

        {/* Nombre completo */}
        <label className="block mb-2">
          Nombre completo *
          <Field
            name="fullName"
            placeholder="Nombre completo (Obligatorio)"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="fullName"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Celular */}
        <label className="block mb-2 mt-4">
          Celular *
          <div className="flex mt-1">
            <span className="flex items-center px-3 bg-gray-100 border border-r-0 text-sm text-gray-600 ">
              +51
            </span>
            <Field
              name="cel"
              placeholder="900 000 000"
              className="w-full border px-3 py-2 border-l-0 "
            />
          </div>
          <ErrorMessage
            name="cel"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Email */}
        <label className="block mb-2 mt-4">
          Correo electrónico *
          <Field
            name="email"
            type="email"
            placeholder="Introduce tu email"
            className="w-full border px-3 py-2 mt-1"
          />
          <ErrorMessage
            name="email"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Documento de identidad */}
        <label className="block mb-2 mt-4">
          Documento de identidad *
          <div className="flex gap-2 mt-1">
            <Field
              as="select"
              name="documentType"
              className="border px-2 py-2 w-1/2"
            >
              <option value="">Seleccionar</option>
              <option value="DNI">DNI</option>
              <option value="CE">Carné de extranjería</option>
            </Field>

            <Field
              name="identityDocument"
              placeholder="Introduce el número"
              className="border px-3 py-2 w-1/1"
            />
          </div>
          <ErrorMessage
            name="documentType"
            component="p"
            className="text-red-500 text-sm"
          />
          <ErrorMessage
            name="identityDocument"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Botones */}
        <div className="mt-6 flex gap-4">
          <button
            type="submit"
            className="bg-secundario text-white py-3 w-full font-bold cursor-pointer"
          >
            CONTINUAR COMPRA
          </button>
          <Link
            href="/shop"
            className="border text-center py-3 w-full flex items-center justify-center"
          >
            SEGUIR COMPRANDO
          </Link>
        </div>
      </Form>
    </Formik>
  );
}
