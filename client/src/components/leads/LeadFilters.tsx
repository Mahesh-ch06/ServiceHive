import { useEffect, useState } from "react";
import SearchInput from "../common/SearchInput";
import Select from "../common/Select";
import Button from "../common/Button";
import { useFilterStore } from "../../store/filterStore";
import { useDebounce } from "../../hooks/useDebounce";

const LeadFilters = () => {
  const { status, source, sort, search, setFilters, reset } = useFilterStore();
  const [localSearch, setLocalSearch] = useState(search ?? "");
  const debouncedSearch = useDebounce(localSearch, 500);

  useEffect(() => {
    setLocalSearch(search ?? "");
  }, [search]);

  useEffect(() => {
    const normalized = debouncedSearch.trim();
    setFilters({ search: normalized || undefined, page: 1 });
  }, [debouncedSearch, setFilters]);

  return (
    <div className="rounded-2xl border border-white/5 bg-ink-800/40 p-4 animate-slide-up" style={{ animationDelay: "80ms" }}>
      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <SearchInput value={localSearch} onValueChange={setLocalSearch} />
        </div>
        <Select
          value={status ?? ""}
          onChange={(event) =>
            setFilters({
              status: (event.target.value || undefined) as typeof status,
              page: 1
            })
          }
        >
          <option value="">All status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Qualified">Qualified</option>
          <option value="Lost">Lost</option>
        </Select>
        <Select
          value={source ?? ""}
          onChange={(event) =>
            setFilters({
              source: (event.target.value || undefined) as typeof source,
              page: 1
            })
          }
        >
          <option value="">All sources</option>
          <option value="Website">Website</option>
          <option value="Instagram">Instagram</option>
          <option value="Referral">Referral</option>
        </Select>
        <div className="flex items-end gap-2">
          <Select
            value={sort ?? "latest"}
            onChange={(event) =>
              setFilters({ sort: event.target.value as "latest" | "oldest" })
            }
            className="flex-1"
          >
            <option value="latest">Latest</option>
            <option value="oldest">Oldest</option>
          </Select>
          <Button
            variant="ghost"
            onClick={() => {
              setLocalSearch("");
              reset();
            }}
            className="shrink-0"
          >
            <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
              <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 01-9.379 2.341L4.22 12.053a.75.75 0 111.06-1.06l1.713 1.712a4.003 4.003 0 006.92-1.281H12.5a.75.75 0 010-1.5h3.25a.75.75 0 01.75.75v3.25a.75.75 0 01-1.5 0v-1.3zM4.688 8.576a5.5 5.5 0 019.379-2.341l1.713 1.712a.75.75 0 01-1.06 1.06L13.006 7.294a4.003 4.003 0 00-6.92 1.282H7.5a.75.75 0 010 1.5H4.25a.75.75 0 01-.75-.75V6.076a.75.75 0 011.5 0v1.3z" clipRule="evenodd" />
            </svg>
            Reset
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LeadFilters;
