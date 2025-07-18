"use client";
import { Label } from "@/components/ui/label";
import { ProductFormValues } from "@/core/validations/product/ProductValidations";
import { useFormikContext } from "formik";

interface SelectFieldProps {
  name: keyof ProductFormValues;
  label: string;
  options: { value: number | string; label: string }[];
}

export const SelectField = ({ name, label, options }: SelectFieldProps) => {
  const { values, handleChange, errors, touched } =
    useFormikContext<ProductFormValues>();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <select
        id={name}
        name={name}
        value={value?.toString() ?? ""}
        onChange={handleChange}
        className="w-full border rounded px-2 py-2"
      >
        <option value="0" disabled>
          Selecciona una opción
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {error && isTouched && (
        <p className="text-sm text-red-500 mt-1">{error as string}</p>
      )}
    </div>
  );
};
