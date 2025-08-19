"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useFormikContext } from "formik";

interface TextareaFieldProps<T> {
  name: keyof T;
  label: string;
}

export const TextareaField = <T extends object>({
  name,
  label,
}: TextareaFieldProps<T>) => {
  const { values, handleChange, errors, touched } = useFormikContext<T>();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  return (
    <div>
      <Label htmlFor={name as string}>{label}</Label>
      <Textarea
        id={name as string}
        name={name as string}
        value={typeof value === "string" ? (value as string) : ""}
        onChange={handleChange}
      />
      {error && isTouched && (
        <p className="text-sm text-red-500 mt-1">{error as string}</p>
      )}
    </div>
  );
};
