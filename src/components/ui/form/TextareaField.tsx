"use client";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useField } from "formik";

interface TextareaFieldProps {
  name: string;
  label: string;
}

export const TextareaField = ({ name, label }: TextareaFieldProps) => {
  const [field, meta] = useField<string>(name);

  return (
    <div>
      <Label htmlFor={name}>{label}</Label>
      <Textarea {...field} id={name} />
      {meta.touched && meta.error && (
        <p className="text-sm text-red-500 mt-1">{meta.error}</p>
      )}
    </div>
  );
};
