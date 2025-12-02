import { useState } from "react";

import { CharacterGridCard } from "../components/CharacterGridCard";
import { CharacterListCard } from "../components/CharacterListCard";
import { ViewModeToggle } from "../components/ViewModeToggle";
import { PageControls } from "../components/PageControls";
import { SearchBar } from "../components/SearchBar";
import { SearchFilter } from "../components/SearchFilter";
import { useCharacters } from "../hooks/useCharacters";

type ViewMode = "grid" | "list";

function CharacterListPage() {
  
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  
  const [page, setPage] = useState<number>(() => {
    const savedPage = localStorage.getItem("currentPage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");

  const { characters, totalPages, isLoading, error } = useCharacters({
    page,
    searchTerm,
    statusFilter,
    genderFilter,
  });

  return (
    <section className="space-y-4">
      <header className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-800">
            Characters
          </h2>
          <p className="text-sm text-slate-500">
            Page {page} of {totalPages}.
          </p>
        </div>

        {/* View mode toggle */}
        <div className="text-right">
          <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </header>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <div className="flex flex-row gap-3 self-center">
          <SearchFilter filterType="status" filterValues={["alive", "dead", "unknown"]} filterValue={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}  />
          <SearchFilter filterType="gender" filterValues={["female", "male", "genderless", "unknown"]} filterValue={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}  />
        </div>

      </div>

      {/* Errors */}
      {error && (
        <div className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {error}
        </div>
      )}

      {/* Character list */}
      {characters.length === 0 && !isLoading && !error && (
        <p className="text-sm text-slate-500">No characters to show.</p>
      )}

      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
          {characters.map((character) => (<CharacterGridCard key={character.id} character={character} />))}
        </div>
      ) : (
        <div className="space-y-3">
          {characters.map((character) => (<CharacterListCard key={character.id} character={character} />))}
        </div>
      )}

      {/* Pagination controls */}
      <PageControls page={page} setPage={setPage} totalPages={totalPages} />

      {isLoading && (
        <p className="mt-2 text-xs text-slate-500">Loading...</p>
      )}
    </section>
  );
}

export default CharacterListPage;
