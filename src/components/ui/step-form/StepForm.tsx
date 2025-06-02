"use client";
import React, { useState } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import Link from "next/link";
import { BiChevronUp } from "react-icons/bi";

type InputType = "text" | "email" | "tel" | "number" | "password";

interface Field {
  name: string;
  label: string;
  placeholder: string;
  type: InputType;
  required?: boolean;
}

interface ButtonOption {
  type: "link" | "button";
  text: string;
  href?: string;
}

interface Option {
  id: number;
  label: string;
}

interface FormTexts {
  formTitle: string;
  fields: Field[];
  documentLabel?: string;
  documentPlaceholder?: string;
  continueButton?: ButtonOption;
  keepBuyingButton?: ButtonOption;
}

interface ContactFormProps {
  stepNumber: number;
  title: string;
  includeDocument?: boolean;
  options?: Option[];
  formTexts: FormTexts;
}

export default function StepForm({
  stepNumber,
  title,
  includeDocument = false,
  options = [],
  formTexts,
}: ContactFormProps) {
  const [selected, setSelected] = useState<Option | null>(null);

  return (
    <div>
      <div className="flex items-center text-primario gap-2 mb-4">
        <span className="font-bold bg-primario text-white px-2 py-1 rounded">
          {stepNumber}
        </span>
        <h2 className="font-semibold flex-grow">{title}</h2>
      </div>
      <div className="border-b border-primario mb-4" />

      <form className="space-y-4 landscape:pt-10">
        <h1 className="font-bold text-primario">{formTexts.formTitle}</h1>

        {/* Campos dinámicos */}
        {formTexts.fields.map((field) => (
          <div key={field.name}>
            <label className="block mb-1 font-medium text-primario">
              {field.label}
              {field.required && " *"}
            </label>
            <input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primario"
              required={field.required}
            />
          </div>
        ))}

        {/* Documento con dropdown */}
        {includeDocument && (
          <div>
            <label className="block mb-1 font-medium text-primario">
              {formTexts.documentLabel}
            </label>
            <div className="flex gap-4">
              <Listbox value={selected} onChange={setSelected}>
                <div className="relative w-1/3">
                  <ListboxButton className="w-full border border-gray-300 p-2 text-left flex justify-between items-center rounded focus:outline-none focus:ring-2 focus:ring-primario">
                    {selected?.label || "Seleccionar"}
                    <BiChevronUp className="h-5 w-5 text-gray-500" />
                  </ListboxButton>
                  <ListboxOptions className="absolute mt-1 w-full bg-terciario p-2 z-10 max-h-60 overflow-auto rounded shadow-lg">
                    {options.map((option) => (
                      <ListboxOption
                        key={option.id}
                        value={option}
                        className={({ selected, disabled }) =>
                          `cursor-pointer bg-white p-2 mb-2 last:mb-0 hover:bg-secundario hover:text-white
                        ${
                          selected
                            ? "border-primario font-semibold"
                            : "border-gray-300"
                        }
                        ${disabled ? "opacity-50 cursor-not-allowed" : ""}`
                        }
                      >
                        {option.label}
                      </ListboxOption>
                    ))}
                  </ListboxOptions>
                </div>
              </Listbox>
              <input
                type="text"
                placeholder={formTexts.documentPlaceholder}
                className="w-2/3 border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-primario"
                required
              />
            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex flex-col gap-4 pt-10">
          {formTexts.continueButton?.type === "link" && (
            <Link
              className="bg-secundario hover:bg-secundario-dark text-white text-center p-2 rounded transition-colors"
              href={formTexts.continueButton.href ?? "#"}
            >
              {formTexts.continueButton.text}
            </Link>
          )}

          {formTexts.continueButton?.type === "button" && (
            <button
              type="submit"
              className="bg-secundario hover:bg-secundario-dark text-white p-2 rounded transition-colors"
            >
              {formTexts.continueButton.text}
            </button>
          )}

          {formTexts.keepBuyingButton && (
            <>
              {formTexts.keepBuyingButton.type === "link" && (
                <Link
                  className="bg-white border border-secundario hover:bg-gray-50 p-2 text-center font-semibold rounded transition-colors"
                  href={formTexts.keepBuyingButton.href ?? "#"}
                >
                  {formTexts.keepBuyingButton.text}
                </Link>
              )}
              {formTexts.keepBuyingButton.type === "button" && (
                <button
                  type="button"
                  className="bg-white border border-secundario hover:bg-gray-50 p-2 font-semibold rounded transition-colors"
                >
                  {formTexts.keepBuyingButton.text}
                </button>
              )}
            </>
          )}
        </div>
      </form>
    </div>
  );
}
