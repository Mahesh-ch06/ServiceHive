import clsx from "clsx";
import React, { forwardRef } from "react";
import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <label className="flex flex-col gap-2 text-sm">
        {label && <span className="text-slate-200">{label}</span>}
        <input
          ref={ref}
          className={clsx(
            "rounded-lg border border-white/10 bg-ink-800 px-3 py-2 text-sm text-white",
            "focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && <span className="text-xs text-red-400">{error}</span>}
      </label>
    );
  }
);

Input.displayName = "Input";

export default Input;
