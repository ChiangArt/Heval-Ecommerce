"use client";

import { Formik, Form, Field, ErrorMessage } from "formik";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import Link from "next/link";
import { AxiosError } from "axios";
import { postAuthForgotPassword } from "@/core/auth/action/auth.actions";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-xl mx-auto p-4 py-40 font-bold">
      <h1 className="text-xl">RECUPERAR CONTRASEÑA</h1>
      <p className="text-sm text-gray-600 mb-4">
        Te enviaremos un enlace para que puedas restablecer tu contraseña.
      </p>

      <Formik<{ email: string }>
        initialValues={{ email: "" }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.email) {
            errors.email = "El correo es obligatorio";
          }
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await postAuthForgotPassword(values.email);
            toast.success("Revisa tu correo para recuperar tu contraseña");
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(err.response?.data?.message || "Error al enviar correo");
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="pt-10 space-y-4 text-secundario">
            <div>
              <label htmlFor="email">Correo electrónico*</label>
              <Field
                name="email"
                type="email"
                placeholder="Introduce tu email"
                className="w-full border px-3 py-2"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="flex gap-2 mt-15">
              <Button
                type="submit"
                className="bg-secundario w-full text-white"
                title={isSubmitting ? "ENVIANDO..." : "ENVIAR"}
              />
              <Link className="w-full" href={"/auth/login"}>
                <Button className="bg-white w-full border-1" title="CANCELAR" />
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
