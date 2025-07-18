"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ProductFormValues } from "@/core/validations/product/ProductValidations";
import { useFormikContext } from "formik";

interface TextareaFieldProps {
  name: keyof ProductFormValues;
  label: string;
}

export const TextareaField = ({ name, label }: TextareaFieldProps) => {
  const { values, handleChange, errors, touched } =
    useFormikContext<ProductFormValues>();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea
        id={name}
        name={name}
        value={typeof value === "string" ? value : ""}
        onChange={handleChange}
      />
      {error && isTouched && (
        <p className="text-sm text-red-500 mt-1">{error as string}</p>
      )}
    </div>
  );
};
