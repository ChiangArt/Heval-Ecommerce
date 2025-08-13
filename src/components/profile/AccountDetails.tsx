"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUserStore } from "@/store/user/use-auth-store";
import toast from "react-hot-toast";
import { putUser, UserRequest } from "@/core/user/action/user.actions";
import { useRouter } from "next/navigation";
import { accountDetailsSchema } from "@/core/validations/personal-info/accountDetailsSchema";
import { logInfo } from "@/app/utils/logger";

const initialValues = {
  fullName: "",
  password: "",
  email: "",
};

export default function AccountDetails() {
  const { user, logout, updateUser } = useUserStore();
  const [isEditable, setIsEditable] = useState(false);
  const router = useRouter();

  const [initialFormValues, setInitialFormValues] = useState(initialValues);

  useEffect(() => {
    if (user) {
      setInitialFormValues({
        fullName: user.name || "",
        email: user.email || "",
        password: "",
      });
    }
  }, [user]);

  const handleSubmit = async (values: typeof initialFormValues) => {
    try {
      if (!user?.id) {
        toast.error("ID de usuario no disponible");
        return;
      }

      const payload: UserRequest = {
        name: values.fullName,
        email: values.email,
        role: user.role as "ADMIN" | "CLIENT",
      };

      if (values.password?.trim()) {
        payload.password = values.password;
      }
      logInfo("📦 Enviando a putUser():", payload); 

      await putUser(user.id, payload);

      // ✅ Actualiza el estado local del store
      updateUser({
        name: values.fullName,
        email: values.email,
      });

      toast.success("Actualizado correctamente");
      setIsEditable(false);
    } catch  {
      toast.error("Error al guardar");
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    localStorage.removeItem("token");
    logout();
    toast.success("Sesión cerrada correctamente");
    router.push("/");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormValues}
      validate={(values) => {

        const result = accountDetailsSchema.safeParse(values);
        const errors: Record<string, string> = {};

        if (!result.success) {
          result.error.errors.forEach((err) => {
            if (err.path[0]) {
              errors[err.path[0]] = err.message;
            }
          });
        }

        return errors;
      }}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ dirty }) => (
        <Form className="max-w-lg mx-auto text-sm md:text-md">
          <h3 className="font-bold pb-3">DETALLES DE LA CUENTA</h3>

          {/* Nombre completo */}
          <label className="block mb-2">
            Nombre completo *
            <Field
              name="fullName"
              placeholder="Nombre completo"
              disabled={!isEditable}
              className="w-full border px-3 py-2 bg-white mt-1 disabled:bg-gray-100"
            />
            <ErrorMessage
              name="fullName"
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
              disabled={!isEditable}
              className="w-full border px-3 py-2 mt-1 bg-white disabled:bg-gray-100"
            />
            <ErrorMessage
              name="email"
              component="p"
              className="text-red-500 text-sm"
            />
          </label>

          {/* Contraseña */}
          {isEditable && (
            <label className="block mb-2 mt-4">
              Contraseña
              <Field
                name="password"
                type="password"
                placeholder="Introduce tu nueva contraseña"
                className="w-full border bg-white px-3 py-2 mt-1"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm"
              />
            </label>
          )}

          {/* Botones */}
          <div className="mt-6 flex gap-4">
            {!isEditable ? (
              <button
                type="button"
                onClick={() => setIsEditable(true)}
                className="bg-secundario text-white hover:bg-primario py-3 w-full font-bold cursor-pointer"
              >
                EDITAR
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setIsEditable(false);
                  setInitialFormValues((prev) => ({
                    ...prev,
                    password: "",
                  }));
                }}
                className="bg-secundario text-white hover:bg-primario py-3 w-full font-bold cursor-pointer"
              >
                CANCELAR
              </button>
            )}

            <button
              type="submit"
              // disabled={!isEditable}
              className={`py-3 w-full font-bold cursor-pointer border-1 ${
                !dirty || !isEditable
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-transparent hover:bg-gray-200 text-secundario"
              }`}
            >
              GUARDAR
            </button>
          </div>

          <div className="mt-4 text-left">
            <button
              type="button"
              onClick={handleLogout}
              className="underline cursor-pointer text-secundario"
            >
              Cerrar sesión
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
