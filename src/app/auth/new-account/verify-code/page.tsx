"use client";

import { useState, useEffect } from "react";
import { 
  // useSearchParams,
   useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Formik, Form, Field, ErrorMessage } from "formik";

import Button from "@/components/ui/button/Button";
import { postAuthRegister } from "@/core/auth/action/auth.actions";
import { RegisterValues } from "@/core/validations/register/RegisterValidations";
import { useOverlayStore } from "@/store/ui/use-overlay-store";

export default function VerifyCodePage() {
  const { showOverlay, hideOverlay } = useOverlayStore();
  // const searchParams = useSearchParams();
  // const email = searchParams.get("email") || "";
  const router = useRouter();

  const [timeLeft, setTimeLeft] = useState(300); // 5 minutos
  const [pendingData, setPendingData] = useState<RegisterValues | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("pending_register");
    if (saved) {
      try {
        setPendingData(JSON.parse(saved));
      } catch {
        toast.error("Error cargando los datos previos del registro");
      }
    }
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timeLeft % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="max-w-xl text-xs mx-auto p-4 py-40 font-bold">
      <h1 className="text-lg">VERIFICA TU CORREO</h1>
      {/* <p className="md:text-sm text-gray-600">Código enviado a: {email}</p> */}
      <p className="md:text-sm text-gray-600">Tiempo restante: {formatTime()}</p>

      <Formik
        initialValues={{ code: "" }}
        validate={(values) => {
          const errors: Record<string, string> = {};
          if (!values.code) errors.code = "Código requerido";
          return errors;
        }}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            showOverlay(); // 👉 Mostrar overlay

            if (!pendingData) {
              toast.error("Datos incompletos del registro");
              return;
            }

            await postAuthRegister({
              ...pendingData,
              code: values.code,
            });

            toast.success("Registro exitoso");
            localStorage.removeItem("pending_register");
            router.push("/auth/login");
          } catch {
            toast.error("Código incorrecto o expirado");
          } finally {
            setSubmitting(false);
            hideOverlay(); // 👉 Ocultar overlay al finalizar
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form className="pt-6 space-y-4 text-secundario">
            <div>
              <label htmlFor=" code">Código</label>
              <Field name="code" className="w-full border px-3 py-2" />
              <ErrorMessage
                name="code"
                component="div"
                className="text-red-500 md:text-sm"
              />
            </div>

            <Button
              type="submit"
              className="bg-secundario w-full text-white"
              title={isSubmitting ? "VALIDANDO..." : "VALIDAR"}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
}
