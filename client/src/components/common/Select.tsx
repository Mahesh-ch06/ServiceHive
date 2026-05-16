import clsx from "clsx";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = ({ label, error, className, children, ...props }: SelectProps) => {
  return (
    <label className="flex flex-col gap-2 text-sm">
      {label && <span className="text-slate-200">{label}</span>}
      <select
        className={clsx(
          "rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white",
          "focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500",
          error && "border-red-400",
          className
        )}
        {...props}
      >
        {children}
      </select>
      {error && <span className="text-xs text-red-400">{error}</span>}
    </label>
  );
};

export default Select;
