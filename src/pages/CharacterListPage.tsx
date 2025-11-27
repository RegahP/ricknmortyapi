import { useEffect, useState } from "react";
import type { Character, CharacterApiResponse } from "../types/ricknmorty";

import { CharacterGridCard } from "../components/CharacterGridCard";
import { CharacterListCard } from "../components/CharacterListCard";
import { ViewModeToggle } from "../components/ViewModeToggle";
import { PageControls } from "../components/PageControls";
import { SearchBar } from "../components/SearchBar";
import { SearchFilter } from "../components/SearchFilter";

const API_BASE_URL = "https://rickandmortyapi.com/api";

type ViewMode = "grid" | "list";

function CharacterListPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [viewMode, setViewMode] = useState<ViewMode>("grid");

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [genderFilter, setGenderFilter] = useState<string>("");

  // Fetch characters whenever page or filters change
  useEffect(() => {
    async function fetchCharacters() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set("page", page.toString());
        if (searchTerm.trim()) params.set("name", searchTerm.trim());
        if (statusFilter) params.set("status", statusFilter);
        if (genderFilter) params.set("gender", genderFilter);

        const url = `${API_BASE_URL}/character?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            // No results for current filters
            setCharacters([]);
            setTotalPages(1);
            setError("No characters found with current search/filters.");
            return;
          }
          throw new Error("Failed to fetch characters");
        }

        const data: CharacterApiResponse = await response.json();
        
        setTotalPages(data.info.pages);
        setCharacters(data.results);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacters();
  }, [page, searchTerm, statusFilter, genderFilter]);

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
        <ViewModeToggle viewMode={viewMode} setViewMode={setViewMode} />
      </header>

      {/* Search + filters */}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:gap-4">
        
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

        <SearchFilter filterType="status" filterValue={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}  />
        <SearchFilter filterType="gender" filterValue={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}  />

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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
