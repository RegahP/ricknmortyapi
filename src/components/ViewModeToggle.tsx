import type { FC } from "react";
import { FiGrid } from "react-icons/fi";
import { FaList } from "react-icons/fa";

type ViewModeToggleProps = {
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
};

export const ViewModeToggle: FC<ViewModeToggleProps> = ({ viewMode, setViewMode }: ViewModeToggleProps) => { return (
    <div className="align-middle inline-flex rounded-md shadow-sm border border-slate-200 overflow-hidden">
        <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-sm ${viewMode === "grid"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-700"
                }`}
        >
            Grid <FiGrid className="inline-block ml-1" />
        </button>
        <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-sm ${viewMode === "list"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-700"
                }`}
        >
            List <FaList className="inline-block ml-1" />
        </button>
    </div>
)
};