import type { FC } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";


type PageControlsProps = {
    page: number;
    totalPages: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
};

export const PageControls: FC<PageControlsProps> = ({page, totalPages, setPage}: PageControlsProps) => { 
    
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
          <FaArrowLeft className="inline-block mr-1" /> Previous
        </button>
        <span className="text-xs text-slate-500">
          Last loaded page: {page} / {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={page >= totalPages}
          className="inline-flex items-center rounded-md border border-slate-300 bg-white px-3 py-1.5 text-sm text-slate-700 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next <FaArrowRight className="inline-block ml-1" />
        </button>
      </div>
)};