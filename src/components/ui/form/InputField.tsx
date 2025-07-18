"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormikContext } from "formik";
import { ProductFormValues } from "@/core/validations/product/ProductValidations";

interface InputFieldProps {
  name: keyof ProductFormValues;
  label: string;
  type?: string;
  placeholder?: string;
}

export const InputField = ({
  name,
  label,
  type = "text",
  placeholder = "",
}: InputFieldProps) => {
  const {
    values,
    handleChange,
    errors,
    touched,
  } = useFormikContext<ProductFormValues>();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Input
        id={name}
        name={name}
        type={type}
        value={typeof value === "number" ? value.toString() : value || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && isTouched && (
        <p className="text-sm text-red-500 mt-1">{error as string}</p>
      )}
    </div>
  );
};
