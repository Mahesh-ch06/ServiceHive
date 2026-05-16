import type { ReactNode } from "react";

interface FormFieldProps {
  label: string;
  error?: string;
  children: ReactNode;
}

const FormField = ({ label, error, children }: FormFieldProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm">
      <span className="text-slate-200">{label}</span>
      {children}
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
};

export default FormField;
