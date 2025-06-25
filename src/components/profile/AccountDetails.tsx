"use client";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { personalInfoSchema } from "@/core/validations/personal-info/PersonalInfo";
import { useUserStore } from "@/store/user/use-auth-store";
import toast from "react-hot-toast";
import { putUser } from "@/core/user/action/user.actions";
import { useRouter } from "next/navigation";

const initialValues = {
  fullName: "",
  password: "",
  email: "",
};

export default function AccountDetails() {
  const { user, logout } = useUserStore();
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
      await putUser(user.id, values.fullName, values.email, values.password);
      toast.success("Actualizado correctamente");

      setIsEditable(false);
    } catch (err) {
      toast.error("Error al guardar");
    }
  };

  const handleLogout = () => {
    document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    logout();

    toast.success("Sesión cerrada correctamente");
    router.push("/");
  };

  return (
    <Formik
      enableReinitialize
      initialValues={initialFormValues}
      validationSchema={personalInfoSchema}
      onSubmit={(values) => handleSubmit(values)}
    >
      <Form className="max-w-lg mx-auto text-sm md:text-md">
        <h3 className="font-bold pb-3">DETALLES DE LA CUENTA</h3>

        {/* Nombre completo */}
        <label className="block mb-2">
          Nombre completo *
          <Field
            name="fullName"
            placeholder="Nombre completo"
            disabled={!isEditable}
            className="w-full border px-3 py-2 mt-1 disabled:bg-gray-100"
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
            className="w-full border px-3 py-2 mt-1 disabled:bg-gray-100"
          />
          <ErrorMessage
            name="email"
            component="p"
            className="text-red-500 text-sm"
          />
        </label>

        {/* Celular */}
        {isEditable && (
          <label className="block mb-2 mt-4">
            Contraseña
            <Field
              name="password"
              type="password"
              placeholder="Introduce tu nueva contraseña"
              className="w-full border px-3 py-2 mt-1"
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
              }}
              className="bg-secundario text-white hover:bg-primario py-3 w-full font-bold cursor-pointer"
            >
              CANCELAR
            </button>
          )}
          <button
            type="submit"
            className="bg-transparent border-1 hover:bg-gray-200 text-secundario py-3 w-full font-bold cursor-pointer"
          >
            GUARDAR
          </button>
        </div>

        <div className="mt-4 text-left">
          <button
            type="button"
            onClick={handleLogout}
            className="underline  cursor-pointer text-secundario"
          >
            Cerrar sesión
          </button>
        </div>
      </Form>
    </Formik>
  );
}
