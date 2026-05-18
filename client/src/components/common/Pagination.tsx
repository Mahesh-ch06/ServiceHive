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
    <div className="flex flex-wrap items-center justify-between gap-3 animate-fade-in">
      <Button
        variant="ghost"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={!hasPrev}
        className="gap-1"
      >
        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
        </svg>
        Prev
      </Button>
      <div className="flex flex-wrap gap-1.5">
        {pages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-semibold transition-all duration-200 ${
              page === currentPage
                ? "bg-brand-500 text-white shadow-md shadow-brand-500/25"
                : "text-slate-400 hover:bg-white/5 hover:text-white"
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
        className="gap-1"
      >
        Next
        <svg viewBox="0 0 20 20" width="16" height="16" fill="currentColor">
          <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
        </svg>
      </Button>
    </div>
  );
};

export default Pagination;
