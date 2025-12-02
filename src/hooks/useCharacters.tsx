import { useEffect, useState } from "react";
import type { Character, CharacterApiResponse, UseCharactersParams } from "../types/ricknmorty";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export function useCharacters({
  page,
  searchTerm,
  statusFilter,
  genderFilter,
}: UseCharactersParams) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setIsLoading(true);
        setError(null);

        const params = new URLSearchParams();
        params.set("page", page.toString());
        localStorage.setItem("currentPage", page.toString());
        if (searchTerm.trim()) params.set("name", searchTerm.trim());
        if (statusFilter) params.set("status", statusFilter);
        if (genderFilter) params.set("gender", genderFilter);

        const url = `${API_BASE_URL}/character?${params.toString()}`;

        const response = await fetch(url);
        if (!response.ok) {
          if (response.status === 404) {
            //comment
            setCharacters([]);
            setTotalPages(1);
            setError("No characters found with current search/filters.");
            return;
          }
          throw new Error("Error 404: Failed to fetch characters!");
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

  return { characters, totalPages, isLoading, error };
}
