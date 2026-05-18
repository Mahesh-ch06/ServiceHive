import { Link } from "react-router-dom";
import Table from "../common/Table";
import Button from "../common/Button";
import type { Lead, LeadStatus } from "../../types/lead";

interface LeadTableProps {
  leads: Lead[];
  canDelete: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const statusClasses: Record<LeadStatus, string> = {
  New: "badge-new",
  Contacted: "badge-contacted",
  Qualified: "badge-qualified",
  Lost: "badge-lost"
};

const sourceIcons: Record<string, JSX.Element> = {
  Website: (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="text-blue-400">
      <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6.26 7.34 7H5.5a8.047 8.047 0 00-1.168 1.027zM10 4c.69 0 1.343.13 1.946.366C11.253 5.186 10.58 6 10 6c-.58 0-1.253-.814-1.946-1.634A5.99 5.99 0 0110 4z" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="text-pink-400">
      <path d="M6.29 18.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0020 3.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743A11.65 11.65 0 011.392 3.1a4.106 4.106 0 001.27 5.477A4.072 4.072 0 01.8 8.218v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 010 16.407a11.616 11.616 0 006.29 1.84" />
    </svg>
  ),
  Referral: (
    <svg viewBox="0 0 20 20" width="14" height="14" fill="currentColor" className="text-emerald-400">
      <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
    </svg>
  )
};

const LeadTable = ({ leads, canDelete, onEdit, onDelete }: LeadTableProps) => {
  return (
    <Table headers={["Lead", "Status", "Source", "Created", "Actions"]}>
      {leads.map((lead, idx) => (
        <tr
          key={lead._id}
          className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02] animate-slide-up"
          style={{ animationDelay: `${idx * 40}ms` }}
        >
          <td className="px-4 py-3.5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-500/20 to-brand-600/10 text-xs font-bold text-brand-500">
                {lead.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <Link
                  to={`/dashboard/leads/${lead._id}`}
                  className="text-sm font-semibold text-white transition-colors hover:text-brand-500"
                >
                  {lead.name}
                </Link>
                <p className="text-xs text-slate-500">{lead.email}</p>
              </div>
            </div>
          </td>
          <td className="px-4 py-3.5">
            <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${statusClasses[lead.status]}`}>
              {lead.status}
            </span>
          </td>
          <td className="px-4 py-3.5">
            <span className="inline-flex items-center gap-1.5 text-xs text-slate-300">
              {sourceIcons[lead.source]}
              {lead.source}
            </span>
          </td>
          <td className="px-4 py-3.5 text-xs text-slate-400">
            {new Date(lead.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "short",
              year: "numeric"
            })}
          </td>
          <td className="px-4 py-3.5">
            <div className="flex gap-2">
              <button
                onClick={() => onEdit(lead)}
                className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-white/5 hover:text-white"
                title="Edit"
              >
                <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                  <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
                </svg>
              </button>
              {canDelete && (
                <button
                  onClick={() => onDelete(lead)}
                  className="rounded-lg p-1.5 text-slate-400 transition-colors hover:bg-red-500/10 hover:text-red-400"
                  title="Delete"
                >
                  <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
                    <path fillRule="evenodd" d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.519.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default LeadTable;
