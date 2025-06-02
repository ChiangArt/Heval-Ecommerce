import StepForm from "@/components/ui/step-form/StepForm";
import { FormTexts } from "@/interfaces/stepForm.interface";
import React from "react";

const formTexts: FormTexts = {
  formTitle: "DATOS DE ENVÍO",
  fields: [
    {
      name: "direccion",
      label: "Dirección completa",
      placeholder: "",
      type: "text",
      required: true,
    },
    {
      name: "piso",
      label: "Piso / Depto",
      placeholder: "",
      type: "text",
      required: true,
    },
    {
      name: "referencia",
      label: "Referencia",
      placeholder: "",
      type: "text",
      required: true,
    },
    {
      name: "informacion",
      label: "Información adicional",
      placeholder: "",
      type: "text",
      required: true,
    },
  ]
} as const;

export default function Address() {
  return (
    <section className="grid grid-cols-2 ">
      {/* ------------------------------ FORMULARIO ------------------------------ */}
      <div className="bg-white">
        <StepForm
          title="Información de envío"
          stepNumber={2}
          formTexts={formTexts}
        />
      </div>
    </section>
  );
}
