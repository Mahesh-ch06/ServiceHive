import { useQuery } from "@tanstack/react-query";
import { fetchLeadStats } from "../api/leads";
import Loader from "../components/common/Loader";
import ErrorState from "../components/common/ErrorState";

const statusColors: Record<string, { bar: string; text: string }> = {
  New: { bar: "bg-emerald-400", text: "text-emerald-400" },
  Contacted: { bar: "bg-blue-400", text: "text-blue-400" },
  Qualified: { bar: "bg-amber-400", text: "text-amber-400" },
  Lost: { bar: "bg-red-400", text: "text-red-400" }
};

const sourceColors: Record<string, { bar: string; text: string }> = {
  Website: { bar: "bg-cyan-400", text: "text-cyan-400" },
  Instagram: { bar: "bg-pink-400", text: "text-pink-400" },
  Referral: { bar: "bg-violet-400", text: "text-violet-400" }
};

const AnalyticsPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["lead-stats"],
    queryFn: fetchLeadStats
  });

  if (isLoading) return <Loader />;
  if (isError || !data) return <ErrorState title="Failed to load stats" description="Try again later." />;

  const maxStatus = Math.max(...Object.values(data.byStatus), 1);
  const maxSource = Math.max(...Object.values(data.bySource), 1);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div>
        <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Dashboard</p>
        <h2 className="font-display text-2xl font-semibold text-white">Analytics Overview</h2>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border border-white/5 bg-ink-800/40 p-5">
          <p className="text-xs font-medium uppercase tracking-wider text-slate-500">Total Leads</p>
          <p className="mt-1 font-display text-3xl font-bold text-white">{data.total}</p>
        </div>
        {(["New", "Contacted", "Qualified", "Lost"] as const).map((status) => (
          <div key={status} className="rounded-2xl border border-white/5 bg-ink-800/40 p-5">
            <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{status}</p>
            <p className={`mt-1 font-display text-3xl font-bold ${statusColors[status]?.text ?? "text-white"}`}>
              {data.byStatus[status] ?? 0}
            </p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Status distribution */}
        <div className="rounded-2xl border border-white/5 bg-ink-800/40 p-5">
          <h3 className="text-sm font-semibold text-white">Leads by Status</h3>
          <p className="mt-0.5 text-xs text-slate-500">Pipeline distribution</p>
          <div className="mt-6 space-y-4">
            {(["New", "Contacted", "Qualified", "Lost"] as const).map((status) => {
              const count = data.byStatus[status] ?? 0;
              const pct = maxStatus > 0 ? (count / maxStatus) * 100 : 0;
              const color = statusColors[status];
              return (
                <div key={status}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm text-slate-300">{status}</span>
                    <span className={`text-sm font-semibold ${color?.text ?? "text-white"}`}>{count}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${color?.bar ?? "bg-white/20"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Source distribution */}
        <div className="rounded-2xl border border-white/5 bg-ink-800/40 p-5">
          <h3 className="text-sm font-semibold text-white">Leads by Source</h3>
          <p className="mt-0.5 text-xs text-slate-500">Acquisition channels</p>
          <div className="mt-6 space-y-4">
            {(["Website", "Instagram", "Referral"] as const).map((source) => {
              const count = data.bySource[source] ?? 0;
              const pct = maxSource > 0 ? (count / maxSource) * 100 : 0;
              const color = sourceColors[source];
              return (
                <div key={source}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <span className="text-sm text-slate-300">{source}</span>
                    <span className={`text-sm font-semibold ${color?.text ?? "text-white"}`}>{count}</span>
                  </div>
                  <div className="h-2.5 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${color?.bar ?? "bg-white/20"}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent activity placeholder */}
      <div className="rounded-2xl border border-white/5 bg-ink-800/40 p-5">
        <h3 className="text-sm font-semibold text-white">Quick Insights</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Conversion Rate</p>
            <p className="mt-1 font-display text-xl font-bold text-emerald-400">
              {data.total > 0 ? ((data.byStatus.Qualified ?? 0) / data.total * 100).toFixed(1) : "0.0"}%
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">Qualified / Total</p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Loss Rate</p>
            <p className="mt-1 font-display text-xl font-bold text-red-400">
              {data.total > 0 ? ((data.byStatus.Lost ?? 0) / data.total * 100).toFixed(1) : "0.0"}%
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">Lost / Total</p>
          </div>
          <div className="rounded-xl bg-white/[0.02] border border-white/[0.04] p-4">
            <p className="text-xs text-slate-500">Active Pipeline</p>
            <p className="mt-1 font-display text-xl font-bold text-blue-400">
              {(data.byStatus.New ?? 0) + (data.byStatus.Contacted ?? 0)}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">New + Contacted</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
