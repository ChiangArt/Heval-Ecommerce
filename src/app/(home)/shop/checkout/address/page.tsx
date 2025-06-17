import StepForm from "@/components/ui/step-form/StepForm";
import { FormTexts } from "@/core/address/interface/FormInterface";
import React from "react";

const addressFormTexts: FormTexts = {
  formTitle: "Información de entrega",
  fields: [
    { name: "fullAddress", label: "Dirección completa", type: "text", required: true },
    { name: "apartmentOrFloor", label: "Apartamento o piso", type: "text", required: true },
    { name: "district", label: "Distrito", type: "text", required: true },
    { name: "province", label: "Provincia", type: "text", required: true },
    { name: "department", label: "Departamento", type: "text", required: true },
    { name: "reference", label: "Referencia", type: "text", required: true },
    { name: "additionalInfo", label: "Información adicional", type: "text", required: true },
  ],
  continueButton: {
    type: "button", // ✅ Ahora TypeScript sabe que es literal "button"
    text: "Continuar",
  },
  keepBuyingButton: {
    type: "link", // ✅ También explícitamente "link"
    text: "Seguir comprando",
    href: "/",
  },
};

export default function Address() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2">
      <div className="bg-white p-6">
        <StepForm
          stepNumber="1"
          title="Información de envío"
          formTexts={addressFormTexts}
        />
      </div>
    </section>
  );
}
