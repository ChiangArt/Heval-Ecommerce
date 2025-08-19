"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useFormikContext } from "formik";

interface InputFieldProps<T> {
  name: keyof T;
  label: string;
  type?: string;
  placeholder?: string;
}

export const InputField = <T extends object>({
  name,
  label,
  type = "text",
  placeholder = "",
}: InputFieldProps<T>) => {
  const { values, handleChange, errors, touched } = useFormikContext<T>();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  return (
    <div>
      <Label htmlFor={name as string}>{label}</Label>
      <Input
        id={name as string}
        name={name as string}
        type={type}
        value={typeof value === "number" ? value.toString() : (value as string) || ""}
        onChange={handleChange}
        placeholder={placeholder}
      />
      {error && isTouched && (
        <p className="text-sm text-red-500 mt-1">{error as string}</p>
      )}
    </div>
  );
};
