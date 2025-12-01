import { useEffect, useState } from "react";
import type { Character, Episode, UseCharacterParams } from "../types/ricknmorty";

const API_BASE_URL = "https://rickandmortyapi.com/api";

export function useCharacterDetail({ id }: UseCharacterParams) {
    const [character, setCharacter] = useState<Character | null>(null);
    const [episodes, setEpisodes] = useState<Episode | Episode[] | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) return;
    
        async function fetchCharacter() {
          try {
            setIsLoading(true);
            setError(null);
    
            const response = await fetch(`${API_BASE_URL}/character/${id}`);
            if (!response.ok) {
              throw new Error("Failed to fetch character");
            }
    
            const data: Character = await response.json();
            setCharacter(data);
    
            if (data.episode && data.episode.length > 0) {
              const episodeIDs = data.episode.map((url) => url.split("/").pop()).join(",");
              const episodeResponse = await fetch(`${API_BASE_URL}/episode/${episodeIDs}`);
              if (episodeResponse.ok) {
                const episodeData: Episode | Episode[] = await episodeResponse.json();
                setEpisodes(episodeData);
              } else {
                setEpisodes(null);
              }
            } else {
              setEpisodes(null);
            }
          } catch (err) {
            setError((err as Error).message);
          } finally {
            setIsLoading(false);
          }
        }
    
        fetchCharacter();
      }, [id]);

      return { character, episodes, isLoading, error };
}