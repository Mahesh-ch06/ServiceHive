import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
}

const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold",
        "transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/50",
        "disabled:cursor-not-allowed disabled:opacity-50",
        "active:scale-[0.97]",
        variant === "primary" &&
          "bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg shadow-brand-500/20 hover:shadow-brand-500/30 hover:brightness-110",
        variant === "secondary" &&
          "border border-white/10 bg-ink-700/80 text-white hover:bg-ink-600 hover:border-white/15",
        variant === "ghost" &&
          "bg-transparent text-slate-300 hover:bg-white/5 hover:text-white",
        variant === "danger" &&
          "bg-red-500/15 text-red-400 border border-red-500/20 hover:bg-red-500/25",
        className
      )}
      {...props}
    />
  );
};

export default Button;
