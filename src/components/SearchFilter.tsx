import type { FC } from "react";

type SearchFilterProps = {
    filterType: "status" | "gender";
    filterValue: string;
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export const SearchFilter: FC<SearchFilterProps> = ({ filterType, filterValue, onChange }: SearchFilterProps) => {

    return (
        <select
            value={filterValue}
            onChange={onChange}
            className="rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
            {filterType === "status" ? (
                <>
                    <option value="">Status: Any</option>
                    <option value="alive">Alive</option>
                    <option value="dead">Dead</option>
                    <option value="unknown">Unknown</option>
                </>
            ) : (
            <>
                <option value="">Gender: Any</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="genderless">Genderless</option>
                <option value="unknown">Unknown</option>
            </>
        )}
        </select>
    )
};