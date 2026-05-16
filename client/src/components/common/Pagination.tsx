import Button from "./Button";

interface PaginationProps {
  pages: number[];
  currentPage: number;
  onPageChange: (page: number) => void;
  hasNext: boolean;
  hasPrev: boolean;
}

const Pagination = ({ pages, currentPage, onPageChange, hasNext, hasPrev }: PaginationProps) => {
  if (pages.length <= 1) return null;

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
      >
        Prev
      </Button>
      <div className="flex flex-wrap gap-2">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`rounded-lg px-3 py-1 text-xs font-semibold ${
              page === currentPage
                ? "bg-brand-500 text-ink-900"
                : "bg-ink-700 text-white"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={!hasNext}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;
