import { useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Button from "../components/common/Button";
import LeadFilters from "../components/leads/LeadFilters";
import LeadTable from "../components/leads/LeadTable";
import LeadSkeleton from "../components/leads/LeadSkeleton";
import EmptyState from "../components/common/EmptyState";
import ErrorState from "../components/common/ErrorState";
import Pagination from "../components/common/Pagination";
import LeadFormModal from "../components/forms/LeadFormModal";
import { exportLeads, fetchLeads, createLead, updateLead, deleteLead } from "../api/leads";
import { useFilterStore } from "../store/filterStore";
import { useAuthStore } from "../store/authStore";
import { usePagination } from "../hooks/usePagination";
import { getErrorMessage } from "../api/client";
import type { Lead } from "../types/lead";
import type { LeadFormValues } from "../validations/leadSchema";
import { buildParamsFromFilters, parseFiltersFromParams } from "../utils/queryParams";
import { useSearchParams } from "react-router-dom";

const statCards = [
  {
    label: "Total Leads",
    key: "total" as const,
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
        <path d="M7 8a3 3 0 100-6 3 3 0 000 6zM14.5 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM1.615 16.428a1.224 1.224 0 01-.569-1.175 6.002 6.002 0 0111.908 0c.058.467-.172.92-.57 1.174A9.953 9.953 0 017 18a9.953 9.953 0 01-5.385-1.572zM14.5 16h-.106c.07-.297.088-.611.048-.933a7.47 7.47 0 00-1.588-3.755 4.502 4.502 0 015.874 2.636.818.818 0 01-.36.98A7.465 7.465 0 0114.5 16z" />
      </svg>
    ),
    color: "text-slate-300",
    bg: "bg-white/5"
  },
  {
    label: "New",
    key: "new" as const,
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-11.25a.75.75 0 00-1.5 0v2.5h-2.5a.75.75 0 000 1.5h2.5v2.5a.75.75 0 001.5 0v-2.5h2.5a.75.75 0 000-1.5h-2.5v-2.5z" clipRule="evenodd" />
      </svg>
    ),
    color: "text-emerald-400",
    bg: "bg-emerald-500/10"
  },
  {
    label: "Qualified",
    key: "qualified" as const,
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z" clipRule="evenodd" />
      </svg>
    ),
    color: "text-amber-400",
    bg: "bg-amber-500/10"
  },
  {
    label: "Lost",
    key: "lost" as const,
    icon: (
      <svg viewBox="0 0 20 20" width="18" height="18" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" />
      </svg>
    ),
    color: "text-red-400",
    bg: "bg-red-500/10"
  }
];

const LeadsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { status, source, search, sort, page, setFilters } = useFilterStore();
  const user = useAuthStore((state) => state.user);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const queryClient = useQueryClient();
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    const initial = parseFiltersFromParams(searchParams);
    if (Object.keys(initial).length) {
      setFilters({
        ...initial,
        page: initial.page ?? 1
      });
    }
    initialized.current = true;
  }, [searchParams, setFilters]);

  useEffect(() => {
    const params = buildParamsFromFilters({ status, source, search, sort, page });
    setSearchParams(params, { replace: true });
  }, [status, source, search, sort, page, setSearchParams]);

  const filters = useMemo(
    () => ({
      status,
      source,
      search: search?.trim() || undefined,
      sort,
      page
    }),
    [status, source, search, sort, page]
  );

  const { data, isLoading, isError } = useQuery({
    queryKey: ["leads", filters],
    queryFn: () => fetchLeads(filters)
  });

  const { pages, hasNext, hasPrev } = usePagination(data?.pagination);

  // Compute stats from current data
  const stats = useMemo(() => {
    const leads = data?.data ?? [];
    return {
      total: data?.pagination?.total ?? leads.length,
      new: leads.filter((l) => l.status === "New").length,
      qualified: leads.filter((l) => l.status === "Qualified").length,
      lost: leads.filter((l) => l.status === "Lost").length
    };
  }, [data]);

  const createMutation = useMutation({
    mutationFn: (values: LeadFormValues) => createLead(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead added");
      setIsModalOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error, "Could not create lead"))
  });

  const updateMutation = useMutation({
    mutationFn: (values: LeadFormValues) =>
      updateLead(selectedLead?._id ?? "", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead updated");
      setIsModalOpen(false);
    },
    onError: (error) => toast.error(getErrorMessage(error, "Could not update lead"))
  });

  const deleteMutation = useMutation({
    mutationFn: (leadId: string) => deleteLead(leadId),
    onMutate: async (leadId) => {
      await queryClient.cancelQueries({ queryKey: ["leads"] });
      const previous = queryClient.getQueryData(["leads", filters]);
      queryClient.setQueryData(["leads", filters], (old: typeof data) => {
        if (!old) return old;
        return {
          ...old,
          data: old.data.filter((lead) => lead._id !== leadId)
        };
      });
      return { previous };
    },
    onError: (_error, _leadId, context) => {
      if (context?.previous) {
        queryClient.setQueryData(["leads", filters], context.previous);
      }
      toast.error("Could not delete lead");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead removed");
    }
  });

  const handleExport = async () => {
    try {
      const blob = await exportLeads(filters);
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "leads.csv";
      link.click();
      window.URL.revokeObjectURL(url);
      toast.success("CSV exported");
    } catch {
      toast.error("Export failed");
    }
  };

  const openCreate = () => {
    setSelectedLead(null);
    setIsModalOpen(true);
  };

  const openEdit = (lead: Lead) => {
    setSelectedLead(lead);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4 stagger">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="rounded-2xl border border-white/5 bg-ink-800/40 p-4 transition-all duration-200 hover:border-white/10 animate-slide-up"
          >
            <div className="flex items-center gap-2">
              <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
                {card.icon}
              </div>
              <span className="text-xs font-medium uppercase tracking-wider text-slate-500">{card.label}</span>
            </div>
            <p className={`mt-2 font-display text-2xl font-bold ${card.color}`}>
              {stats[card.key]}
            </p>
          </div>
        ))}
      </div>

      {/* Header */}
      <section className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/5 bg-ink-800/40 p-5 animate-slide-up" style={{ animationDelay: "60ms" }}>
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Leads Overview</h3>
          <p className="text-sm text-slate-400">
            Track every inbound lead, pipeline stage, and conversion touch.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="secondary" onClick={handleExport}>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
            Export CSV
          </Button>
          <Button onClick={openCreate}>
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
            </svg>
            Add Lead
          </Button>
        </div>
      </section>

      <LeadFilters />

      {isLoading && <LeadSkeleton />}
      {isError && (
        <ErrorState
          title="Unable to load leads"
          description="Check your connection and try again."
        />
      )}
      {!isLoading && !isError && data?.data.length === 0 && (
        <EmptyState
          title="No leads yet"
          description="Start by adding your first lead or adjust your filters."
          action={<Button onClick={openCreate}>Add lead</Button>}
        />
      )}

      {!isLoading && !isError && data?.data.length ? (
        <LeadTable
          leads={data.data}
          canDelete={user?.role === "admin"}
          onEdit={openEdit}
          onDelete={(lead) => deleteMutation.mutate(lead._id)}
        />
      ) : null}

      {data?.pagination && (
        <Pagination
          pages={pages}
          currentPage={page}
          onPageChange={(next) => setFilters({ page: next })}
          hasNext={hasNext}
          hasPrev={hasPrev}
        />
      )}

      <LeadFormModal
        isOpen={isModalOpen}
        onClose={() => {
          setSelectedLead(null);
          setIsModalOpen(false);
        }}
        onSubmit={(values) =>
          selectedLead
            ? updateMutation.mutate(values)
            : createMutation.mutate(values)
        }
        lead={selectedLead}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </div>
  );
};

export default LeadsPage;
