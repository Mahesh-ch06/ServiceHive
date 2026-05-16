import { Link } from "react-router-dom";
import Table from "../common/Table";
import Button from "../common/Button";
import type { Lead } from "../../types/lead";

interface LeadTableProps {
  leads: Lead[];
  canDelete: boolean;
  onEdit: (lead: Lead) => void;
  onDelete: (lead: Lead) => void;
}

const LeadTable = ({ leads, canDelete, onEdit, onDelete }: LeadTableProps) => {
  return (
    <Table headers={["Lead", "Status", "Source", "Created", "Actions"]}>
      {leads.map((lead) => (
        <tr key={lead._id} className="bg-ink-800/70 hover:bg-ink-700/70">
          <td className="px-4 py-3">
            <div>
              <Link
                to={`/leads/${lead._id}`}
                className="text-sm font-semibold text-white hover:text-brand-500"
              >
                {lead.name}
              </Link>
              <p className="text-xs text-slate-400">{lead.email}</p>
            </div>
          </td>
          <td className="px-4 py-3">
            <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-slate-200">
              {lead.status}
            </span>
          </td>
          <td className="px-4 py-3 text-xs text-slate-300">{lead.source}</td>
          <td className="px-4 py-3 text-xs text-slate-300">
            {new Date(lead.createdAt).toLocaleDateString()}
          </td>
          <td className="px-4 py-3">
            <div className="flex gap-2">
              <Button variant="ghost" onClick={() => onEdit(lead)}>
                Edit
              </Button>
              {canDelete && (
                <Button variant="danger" onClick={() => onDelete(lead)}>
                  Delete
                </Button>
              )}
            </div>
          </td>
        </tr>
      ))}
    </Table>
  );
};

export default LeadTable;
