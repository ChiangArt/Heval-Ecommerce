"use client";
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { postAuthLogin } from "@/core/auth/action/auth.actions";
import Button from "@/components/ui/button/Button";
import { Login, loginSchema } from "@/core/validations/login/LoginValidations";
import { AxiosError } from "axios";
import { useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { LoginResponse } from "@/core/auth/interface/user";
import Link from "next/link";
import { useUserStore } from "@/store/user/use-auth-store";
import { syncGuestCartToUserCart } from "@/core/cart/sync-cart/SyncGuestCartToUserCart ";

export default function LoginPage() {
  const { setToken } = useUserStore();
  const searchParams = useSearchParams();
  const router = useRouter();
  const from = searchParams.get("from") || "/";
  const toastShown = useRef(false);

  useEffect(() => {
    if (!toastShown.current && from !== "/") {
      toast.error("Necesitas logearte para continuar");
      toastShown.current = true;
    }
  }, [from]);

  return (
    <div className="max-w-xl mx-auto p-4 py-40 font-bold">
      <h1 className="text-xl">INICIAR SESIÓN</h1>

      <Formik<Login>
        initialValues={{ email: "", password: "" }}
        validate={(values) => {
          const result = loginSchema.safeParse(values);
          if (result.success) return {};

          const errors: Record<string, string> = {};
          result.error.errors.forEach((err) => {
            const field = err.path[0];
            if (field) errors[field as string] = err.message;
          });
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response: LoginResponse = await postAuthLogin(values);
            const { token } = response;
            document.cookie = `token=${token}; path=/;`;
            localStorage.setItem("token", token);
            setToken(token);
            toast.success("¡Sesión iniciada!");
            await syncGuestCartToUserCart();

            router.push(from);
          } catch (error) {
            const err = error as AxiosError<{ message: string }>;
            toast.error(
              err.response?.data?.message || "Error al crear logearse"
            );
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

            <div>
              <label htmlFor="password">Contraseña*</label>
              <Field
                name="password"
                type="password"
                placeholder="Escribe tu clave"
                className="w-full border px-3 py-2"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm"
              />
              <div className="flex justify-end">
                <Link
                  href={"/auth/login/forgot-password"}
                  className="text-sm hover:underline cursor-pointer"
                >
                  ¿Olvidó su contraseña?
                </Link>
              </div>
            </div>

            <div className="flex gap-2 mt-15">
              <Button
                type="submit"
                className="bg-secundario w-full text-white"
                title={isSubmitting ? "Iniciando..." : "INICIAR SESIÓN"}
              />
              <Link className="w-full" href={"/auth/new-account"}>
                <Button
                  className="bg-white w-full border-1"
                  title="CREAR CUENTA"
                />
              </Link>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
