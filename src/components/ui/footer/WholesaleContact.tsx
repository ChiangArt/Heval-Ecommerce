"use client"
import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
  wholesaleContactSchema,
  WholesaleContactFormValues,
} from "@/core/validations/wholesale-contact-schema/wholesaleContactSchema";
import { sendWholesaleContact } from "@/core/wholesale-contact/action/wholesale-contact.actions";
import Button from "../button/Button";

interface Props {
  className?: string;
}

export default function WholesaleContact({ className }: Props) {
  const [sent, setSent] = useState(false);

  return (
    <div
      className={`text-center gap-5 text-sm w-full p-4 md:grid md:grid-cols-2 bg-white ${className}`}
    >
      <div className="flex flex-col justify-center items-center gap-5 font-bold">
        <h2 className="text-lg text-secundario ">
          VENTAS AL POR MAYOR
        </h2>
        <p className="mt-2">
          ¿Quieres adquirir nuestros productos como distribuidor o al por mayor?
          Rellena este formulario y nos pondremos en contacto contigo.
        </p>
      </div>
      {sent ? (
        <p className="text-green-600 font-medium mt-4">
          Mensaje enviado con éxito. ¡Gracias por tu interés!
        </p>
      ) : (
        <Formik<WholesaleContactFormValues>
          initialValues={{ nombre: "", email: "", mensaje: "" }}
          validate={(values) => {
            const result = wholesaleContactSchema.safeParse(values);
            if (result.success) return {};
            const errors: Record<string, string> = {};
            result.error.errors.forEach((err) => {
              if (err.path[0]) errors[err.path[0] as string] = err.message;
            });
            return errors;
          }}
          onSubmit={async (values, { resetForm }) => {
            try {
              await sendWholesaleContact(values);
              setSent(true);
              resetForm();
            } catch {
              alert("Algo salió mal. Intenta nuevamente.");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4 w-full max-w-md mx-auto mt-4">
              <div className="text-left">
                <Field
                  name="nombre"
                  placeholder="Tu nombre"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-turquesa"
                />
                <ErrorMessage
                  name="nombre"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="text-left">
                <Field
                  name="email"
                  type="email"
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-turquesa"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="text-left">
                <Field
                  as="textarea"
                  name="mensaje"
                  placeholder="Escribe tu mensaje"
                  className="w-full px-4 py-2 border border-gray-300 focus:outline-none focus:border-turquesa resize-none"
                  rows={4}
                />
                <ErrorMessage
                  name="mensaje"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <Button
                title="Enviar mensaje"
                type="submit"
                className="bg-secundario text-white py-3 px-6"
                loading={isSubmitting}
              />
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
}
