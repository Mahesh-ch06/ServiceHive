import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchLead } from "../api/leads";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";

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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-slate-400">Lead profile</p>
          <h2 className="font-display text-2xl text-white">{data.name}</h2>
          <p className="text-sm text-slate-300">{data.email}</p>
        </div>
        <Link
          to="/"
          className="rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-200 hover:bg-ink-700"
        >
          Back to leads
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/5 bg-ink-800/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Status</p>
          <p className="mt-2 text-lg font-semibold text-white">{data.status}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-ink-800/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Source</p>
          <p className="mt-2 text-lg font-semibold text-white">{data.source}</p>
        </div>
        <div className="rounded-2xl border border-white/5 bg-ink-800/70 p-4">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Created</p>
          <p className="mt-2 text-lg font-semibold text-white">
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailPage;
