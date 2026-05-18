import clsx from "clsx";
import { forwardRef } from "react";
import type { SelectHTMLAttributes } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, error, className, children, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-1.5 text-sm">
        {label && (
          <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
            {label}
          </span>
        )}
        <select
          ref={ref}
          className={clsx(
            "rounded-xl border border-white/10 bg-ink-800/80 px-3 py-2.5 text-sm text-white",
            "transition-all duration-200",
            "focus:border-brand-500/60 focus:outline-none focus:ring-2 focus:ring-brand-500/20",
            error && "border-red-400/60",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <span className="text-xs text-red-400">{error}</span>}
      </label>
    );
  }
);

Select.displayName = "Select";

export default Select;
