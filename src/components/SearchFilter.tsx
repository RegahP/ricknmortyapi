import type { FC } from "react";

type SearchFilterProps = {
    filterType: "status" | "gender";
    filterValues: string[];
    filterValue: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SearchFilter: FC<SearchFilterProps> = ({ filterType, filterValues, filterValue, onChange }: SearchFilterProps) => {

    return (
        <select
            value={filterValue}
            onChange={onChange}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
        <option value="">{filterType.toUpperCase()}: Any</option>
        {
            filterValues.map((value) => (
                <option key={value} value={value}>{value.toUpperCase()}</option>
            ))
        }
        </select>
    )
};