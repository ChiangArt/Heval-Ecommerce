"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useField } from "formik";

interface TextareaFieldProps<T> {
  name: keyof T;
  label: string;
}

export const TextareaField = <T extends object>({ name, label }: TextareaFieldProps<T>) => {
  const [field, meta] = useField(name as string);

  return (
    <div>
      <Label htmlFor={name as string}>{label}</Label>
      <Textarea {...field} id={name as string} />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};
