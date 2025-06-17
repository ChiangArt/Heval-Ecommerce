"use client";
import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { postAdress } from "@/core/address/action/address.actions";
import { addressSchema } from "@/core/validations/address/AddressValidations";
import Link from "next/link";
import {
  AddressFormValues,
  StepFormProps,
} from "@/core/address/interface/FormInterface";

export default function StepForm({
  stepNumber,
  title,
  formTexts,
}: StepFormProps) {
  const handleSubmit = async (values: AddressFormValues) => {
    const payload = Object.fromEntries(
      Object.entries(values).map(([k, v]) => [k, v.trim()])
    ) as AddressFormValues;

    try {
      await postAdress(payload);
      alert("Dirección enviada correctamente");
    } catch (error) {
      console.error("Error al enviar dirección", error);
    }
  };

  return (
    <div>
      {/* Título del paso */}
      <div className="flex items-center text-primario gap-2 mb-4">
        <span className="font-bold bg-primario text-white px-2 py-1 rounded">
          {stepNumber}
        </span>
        <h2 className="font-semibold flex-grow">{title}</h2>
      </div>
      <div className="border-b border-primario mb-4" />

      <Formik
        initialValues={{
          fullAddress: "",
          apartmentOrFloor: "",
          district: "",
          province: "",
          department: "",
          reference: "",
          additionalInfo: "",
        }}
        validationSchema={addressSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4 landscape:pt-10">
            <h1 className="font-bold text-primario">{formTexts.formTitle}</h1>

            {/* Campos dinámicos */}
            {formTexts.fields.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block mb-1 font-medium text-primario"
                >
                  {field.label} {field.required && <span>*</span>}
                </label>
                <Field
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primario"
                />
                <ErrorMessage
                  name={field.name}
                  component="p"
                  className="text-red-500 text-sm"
                />
              </div>
            ))}

            {/* Botones */}
            <div className="flex flex-col gap-4 pt-10">
              {formTexts.continueButton?.type === "link" ? (
                <Link
                  href={formTexts.continueButton.href ?? "#"}
                  className="bg-secundario hover:bg-secundario-dark text-white text-center p-2 rounded transition-colors"
                >
                  {formTexts.continueButton.text}
                </Link>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-secundario hover:bg-secundario-dark text-white p-2 rounded transition-colors"
                >
                  {formTexts.continueButton.text}
                </button>
              )}

              {formTexts.keepBuyingButton &&
                (formTexts.keepBuyingButton.type === "link" ? (
                  <Link
                    href={formTexts.keepBuyingButton.href ?? "#"}
                    className="bg-white border border-secundario hover:bg-gray-50 p-2 text-center font-semibold rounded transition-colors"
                  >
                    {formTexts.keepBuyingButton.text}
                  </Link>
                ) : (
                  <button
                    type="button"
                    className="bg-white border border-secundario hover:bg-gray-50 p-2 font-semibold rounded transition-colors"
                  >
                    {formTexts.keepBuyingButton.text}
                  </button>
                ))}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
