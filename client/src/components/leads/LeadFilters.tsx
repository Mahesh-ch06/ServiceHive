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
    <div className="grid gap-4 lg:grid-cols-4">
      <SearchInput value={localSearch} onValueChange={setLocalSearch} />
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
      <div className="flex items-center gap-3">
        <Select
          value={sort ?? "latest"}
          onChange={(event) =>
            setFilters({ sort: event.target.value as "latest" | "oldest" })
          }
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
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default LeadFilters;
