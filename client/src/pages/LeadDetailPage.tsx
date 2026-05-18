import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchLead } from "../api/leads";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";
import type { LeadStatus } from "../types/lead";

const statusClasses: Record<LeadStatus, string> = {
  New: "badge-new",
  Contacted: "badge-contacted",
  Qualified: "badge-qualified",
  Lost: "badge-lost"
};

const LeadDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lead", id],
    queryFn: () => fetchLead(id ?? ""),
    enabled: Boolean(id)
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError || !data) {
    return (
      <ErrorState
        title="Lead not found"
        description="We could not locate this lead."
      />
    );
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-500/20 to-brand-600/10 text-xl font-bold text-brand-500">
            {data.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Lead profile</p>
            <h2 className="font-display text-2xl font-semibold text-white">{data.name}</h2>
            <p className="text-sm text-slate-400">{data.email}</p>
          </div>
        </div>
        <Link
          to="/dashboard"
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.02] px-4 py-2 text-sm text-slate-300 transition-all hover:bg-white/5 hover:text-white"
        >
          <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
            <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
          </svg>
          Back to leads
        </Link>
      </div>

      {/* Detail Cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-ink-800/50 p-5 hover-lift">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-slate-500">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Status</p>
          </div>
          <div className="mt-3">
            <span className={`inline-flex rounded-full px-3 py-1 text-sm font-medium ${statusClasses[data.status]}`}>
              {data.status}
            </span>
          </div>
        </div>
        <div className="rounded-2xl border border-white/5 bg-ink-800/50 p-5 hover-lift">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-slate-500">
              <path d="M10 1a6 6 0 00-3.815 10.631C7.237 12.5 8 13.443 8 14.456v.644a.75.75 0 00.75.75h2.5a.75.75 0 00.75-.75v-.644c0-1.013.762-1.957 1.815-2.825A6 6 0 0010 1zM8.863 17.414a.75.75 0 00-.226 1.483 9.066 9.066 0 002.726 0 .75.75 0 00-.226-1.483 7.563 7.563 0 01-2.274 0z" />
            </svg>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Source</p>
          </div>
          <p className="mt-3 text-lg font-semibold text-white">{data.source}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-ink-800/50 p-5 hover-lift">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor" className="text-slate-500">
              <path fillRule="evenodd" d="M5.75 2a.75.75 0 01.75.75V4h7V2.75a.75.75 0 011.5 0V4h.25A2.75 2.75 0 0118 6.75v8.5A2.75 2.75 0 0115.25 18H4.75A2.75 2.75 0 012 15.25v-8.5A2.75 2.75 0 014.75 4H5V2.75A.75.75 0 015.75 2zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75z" clipRule="evenodd" />
            </svg>
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Created</p>
          </div>
          <p className="mt-3 text-lg font-semibold text-white">
            {new Date(data.createdAt).toLocaleDateString("en-IN", {
              day: "2-digit",
              month: "long",
              year: "numeric"
            })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
