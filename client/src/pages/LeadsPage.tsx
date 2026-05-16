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
import type { Lead } from "../types/lead";
import type { LeadFormValues } from "../validations/leadSchema";
import { buildParamsFromFilters, parseFiltersFromParams } from "../utils/queryParams";
import { useSearchParams } from "react-router-dom";

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

  const createMutation = useMutation({
    mutationFn: (values: LeadFormValues) => createLead(values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead added");
      setIsModalOpen(false);
    },
    onError: () => toast.error("Could not create lead")
  });

  const updateMutation = useMutation({
    mutationFn: (values: LeadFormValues) =>
      updateLead(selectedLead?._id ?? "", values),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["leads"] });
      toast.success("Lead updated");
      setIsModalOpen(false);
    },
    onError: () => toast.error("Could not update lead")
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
      <section className="rounded-3xl border border-white/5 bg-ink-800/60 p-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl text-white">Leads Overview</h3>
            <p className="text-sm text-slate-300">
              Track every inbound lead, pipeline stage, and conversion touch.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="secondary" onClick={handleExport}>
              Export CSV
            </Button>
            <Button onClick={openCreate}>Add lead</Button>
          </div>
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
