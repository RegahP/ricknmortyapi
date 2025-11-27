export const PageControls = ({page, totalPages, setPage}: {page: number, totalPages: number, setPage: React.Dispatch<React.SetStateAction<number>>}) => { 
    
      const handlePrevious = () => {
        if (page > 1) {
          setPage((prev) => prev - 1);
        }
      };

      const handleNext = () => {
        if (page < totalPages) {
          setPage((prev) => prev + 1);
        }
      };
    
    return (
    <div className="mt-4 flex items-center justify-between">
        <button
          onClick={handlePrevious}
          disabled={page <= 1}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Previous
        </button>
        <span className="text-xs text-slate-500">
          Last loaded page: {page} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next →
        </button>
      </div>
)};