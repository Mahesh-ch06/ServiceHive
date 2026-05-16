import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

interface SearchInputProps extends InputHTMLAttributes<HTMLInputElement> {
  onValueChange: (value: string) => void;
}

const SearchInput = ({ onValueChange, className, ...props }: SearchInputProps) => {
  return (
    <div className={clsx("relative", className)}>
      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        <svg
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </span>
      <input
        {...props}
        onChange={(event) => onValueChange(event.target.value)}
        aria-label={props.placeholder ?? "Search"}
        className={clsx(
          "w-full rounded-lg border border-white/10 bg-ink-800 py-2 pl-9 pr-3 text-sm text-white",
          "focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
        )}
        placeholder={props.placeholder ?? "Search by name or email"}
      />
    </div>
  );
};

export default SearchInput;
