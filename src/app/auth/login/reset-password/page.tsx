"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useEffect } from "react";
import toast from "react-hot-toast";
import Button from "@/components/ui/button/Button";
import { postAuthResetPassword } from "@/core/auth/action/auth.actions";

import { z } from "zod";
import { AxiosError } from "axios";

const resetPasswordSchema = z.object({
  newPassword: z
    .string()
    .min(8, "Debe tener al menos 8 caracteres")
    .regex(/[A-Z]/, "Debe contener al menos una mayúscula")
    .regex(/[0-9]/, "Debe contener al menos un número")
    .regex(/[^A-Za-z0-9]/, "Debe contener al menos un carácter especial"),
});

export type ResetPasswordValues = z.infer<typeof resetPasswordSchema>;

export default function ResetPasswordPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    if (!token) {
      toast.error("Token inválido o ausente.");
      router.push("/auth/login");
    }
  }, [token, router]);

  const validate = (values: ResetPasswordValues) => {
    const result = resetPasswordSchema.safeParse(values);
    if (result.success) return {};
    const errors: Record<string, string> = {};
    result.error.issues.forEach((issue) => {
      const field = issue.path[0] as string;
      errors[field] = issue.message;
    });
    return errors;
  };

  return (
    <div className="max-w-xl mx-auto p-4 py-40 font-bold">
      <h1 className="text-xl mb-4">RESTABLECER CONTRASEÑA</h1>

      <Formik<ResetPasswordValues>
        initialValues={{ newPassword: "" }}
        validate={validate}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            await postAuthResetPassword(token!, values.newPassword);
            toast.success("¡Contraseña actualizada!");
            router.push("/auth/login");
          } catch (error: unknown) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(
              err.response?.data?.message || "Error al actualizar la contraseña"
            );
          } finally {
            setSubmitting(false);
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 text-secundario">
            <div>
              <label htmlFor="newPassword">Nueva Contraseña*</label>
              <Field
                name="newPassword"
                type="password"
                placeholder="Nueva contraseña"
                className="w-full border px-3 py-2"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className="text-red-500 text-sm"
              />
              <p className="text-sm text-gray-500 mt-1">
                Debe contener mínimo 8 caracteres, una mayúscula, un número y un
                símbolo.
              </p>
            </div>

            <Button
              type="submit"
              className="bg-secundario w-full text-white"
              title={isSubmitting ? "ACTUALIZANDO..." : "ACTUALIZAR CONTRASEÑA"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
