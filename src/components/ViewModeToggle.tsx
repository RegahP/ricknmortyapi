import type { FC } from "react";

type ViewModeToggleProps = {
    viewMode: "grid" | "list";
    setViewMode: (mode: "grid" | "list") => void;
};

export const ViewModeToggle: FC<ViewModeToggleProps> = ({ viewMode, setViewMode }: ViewModeToggleProps) => { return (
    <div className="inline-flex rounded-md shadow-sm border border-slate-200 overflow-hidden">
        <button
            type="button"
            onClick={() => setViewMode("grid")}
            className={`px-3 py-1 text-sm ${viewMode === "grid"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-700"
                }`}
        >
            Grid
        </button>
        <button
            type="button"
            onClick={() => setViewMode("list")}
            className={`px-3 py-1 text-sm ${viewMode === "list"
                    ? "bg-emerald-500 text-white"
                    : "bg-white text-slate-700"
                }`}
        >
            List
        </button>
    </div>
)
};