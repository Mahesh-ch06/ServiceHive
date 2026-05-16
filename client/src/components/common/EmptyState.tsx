import type { ReactNode } from "react";

interface EmptyStateProps {
  title: string;
  description: string;
  action?: ReactNode;
}

const EmptyState = ({ title, description, action }: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-start gap-3 rounded-2xl border border-white/5 bg-ink-800/70 p-6">
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-slate-300">{description}</p>
      {action}
    </div>
  );
};

export default EmptyState;
