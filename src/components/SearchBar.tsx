export const SearchBar = ({searchTerm, setSearchTerm}: {searchTerm: string, setSearchTerm: React.Dispatch<React.SetStateAction<string>>}) => { return (
    <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full md:w-1/3 rounded-md border border-slate-300 px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
    />
)};