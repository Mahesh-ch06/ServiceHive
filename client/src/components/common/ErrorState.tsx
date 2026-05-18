import type { ReactNode } from "react";

interface ErrorStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const ErrorState = ({ title, description, action }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-red-400/20 bg-red-500/5 p-10 text-center animate-fade-in">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-red-500/10">
        <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#f87171" strokeWidth="1.5">
          <path d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
        </svg>
      </div>
      <div className="space-y-1">
        <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
        <p className="text-sm text-red-300/80">{description}</p>
      </div>
      {action}
    </div>
  );
};

export default ErrorState;
