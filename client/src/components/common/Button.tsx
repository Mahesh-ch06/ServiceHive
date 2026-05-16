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
        "inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500",
        "disabled:cursor-not-allowed disabled:opacity-60",
        variant === "primary" &&
          "bg-brand-500 text-ink-900 hover:bg-brand-600",
        variant === "secondary" &&
          "bg-ink-700 text-white hover:bg-ink-600",
        variant === "ghost" && "bg-transparent text-white hover:bg-ink-700",
        variant === "danger" && "bg-red-500 text-white hover:bg-red-600",
        className
      )}
      {...props}
    />
  );
};

export default Button;
