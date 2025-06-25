"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field } from "formik";
import toast from "react-hot-toast";
import { AxiosError } from "axios";

import Button from "@/components/ui/button/Button";
import { postAuthSendCode } from "@/core/auth/action/auth.actions"; // Asegúrate de que esta función incluya ?email=...
import {
  registerSchema,
  RegisterValues,
} from "@/core/validations/register/RegisterValidations";
import { useUserStore } from "@/store/user/use-auth-store";
import Link from "next/link";

export default function NewAccountPage() {
  const router = useRouter();
  const user = useUserStore((state) => state.user);

  // Si ya está logueado, redirige a home
  useEffect(() => {
    if (user && user.email) {
      router.replace("/");
    }
  }, [user, router]);

  // Usamos registerSchema (sin code) para validar name, email, password, role
  const step1Schema = registerSchema;
  type Step1Values = RegisterValues;

  const initialValues: Step1Values = {
    name: "",
    email: "",
    password: "",
    role: "CLIENT",
  };

  const validate = (values: Step1Values) => {
    const result = step1Schema.safeParse(values);
    if (!result.success) {
      const errors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        errors[field] = issue.message;
      });
      return errors;
    }
    return {};
  };

  const handleSubmit = async (
    values: Step1Values,
    { setSubmitting }: { setSubmitting: (b: boolean) => void }
  ) => {
    try {
      await postAuthSendCode(values.email);
      toast.success("Código enviado a tu correo");

      // 2) Guardar datos en localStorage para el paso 2
      localStorage.setItem("pending_register", JSON.stringify(values));

      // 3) Redirigir a la pantalla de verificación de código
      router.push(
        `/auth/new-account/verify-code?email=${encodeURIComponent(values.email)}`
      );
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      const msg = err.response?.data?.message;
      toast.error(msg || "Error al enviar código. Intenta de nuevo.");
      console.error("Error al enviar código:", err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto py-30 font-bold">
      <h1 className="text-xl mb-4">CREAR CUENTA</h1>

      <Formik<Step1Values>
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, errors, touched }) => (
          <Form className="space-y-4 text-secundario">
            {/* Nombre */}
            <div>
              <label htmlFor="name">Nombre Completo*</label>
              <Field
                name="name"
                type="text"
                placeholder="Nombre completo"
                className="w-full border px-3 py-2"
              />
              {touched.name && errors.name && (
                <span className="text-sm text-red-500">{errors.name}</span>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email">Correo electrónico*</label>
              <Field
                name="email"
                type="email"
                placeholder="Introduce tu email"
                className="w-full border px-3 py-2"
              />
              {touched.email && errors.email && (
                <span className="text-sm text-red-500">{errors.email}</span>
              )}
            </div>

            {/* Contraseña */}
            <div>
              <label htmlFor="password">Contraseña*</label>
              <Field
                name="password"
                type="password"
                placeholder="Escribe tu clave"
                className="w-full border px-3 py-2"
              />
              {touched.password && errors.password && (
                <span className="text-sm text-red-500">{errors.password}</span>
              )}
              <div className="flex justify-end">
                <span className="text-sm text-gray-400">
                  Mínimo 8 caracteres, una mayúscula, un número y un carácter
                  especial.
                </span>
              </div>
            </div>

            {/* Role fijo CLIENT: no se muestra campo editable */}

            <div className="flex gap-2 mt-15">
              <Button
                type="submit"
                className="bg-secundario w-full text-white"
                title={isSubmitting ? "ENVIANDO CÓDIGO..." : "Enviar código"}
              />
              <Link
                href="/auth/login"
                className="flex items-center justify-center w-full border px-4 py-2"
              >
                CANCELAR
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
