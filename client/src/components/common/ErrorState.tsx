import type { ReactNode } from "react";

interface ErrorStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const ErrorState = ({ title, description, action }: ErrorStateProps) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-red-400/40 bg-red-500/10 p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-red-200">{description}</p>
      {action}
    </div>
  );
};

export default ErrorState;
