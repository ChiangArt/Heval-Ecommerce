"use client";
import { Label } from "@/components/ui/label";
import { useFormikContext, FormikValues } from "formik";

interface SelectFieldProps<T extends FormikValues> {
  name: keyof T;
  label: string;
  options: { value: number | string; label: string }[];
}

export const SelectField = <T extends FormikValues>({
  name,
  label,
  options,
}: SelectFieldProps<T>) => {
  const { values, setFieldValue, errors, touched } = useFormikContext<T>();

  const value = values[name];
  const error = errors[name];
  const isTouched = touched[name];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;

    if (selectedValue === "") {
      setFieldValue(name as string, undefined);
    } else if (!isNaN(Number(selectedValue))) {
      setFieldValue(name as string, Number(selectedValue));
    } else {
      setFieldValue(name as string, selectedValue);
    }
  };

  return (
    <div>
      <Label htmlFor={name as string}>{label}</Label>
      <select
        id={name as string}
        name={name as string}
        value={value?.toString() ?? ""}
        onChange={handleChange}
        className="w-full border rounded px-2 py-2"
      >
        <option value="">Selecciona una opción</option>
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
