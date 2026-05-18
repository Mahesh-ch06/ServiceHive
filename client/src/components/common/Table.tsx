import type { ReactNode } from "react";

interface TableProps {
  headers: string[];
  children: ReactNode;
}

const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="w-full overflow-x-auto rounded-2xl border border-white/5 bg-ink-800/70">
      <table className="w-full border-collapse text-sm whitespace-nowrap">
        <thead className="bg-ink-700/70">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-300"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">{children}</tbody>
      </table>
    </div>
  );
};

export default Table;
