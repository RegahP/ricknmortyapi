import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import type { Character, Episode } from "../types/ricknmorty";
import { CharacterDetailCard } from "../components/CharacterDetailCard";
import { BackToList } from "../components/BackToList";

const API_BASE_URL = "https://rickandmortyapi.com/api";

function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [episodes, setEpisodes] = useState<Episode | Episode[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function fetchCharacterAndEpisode() {
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

    fetchCharacterAndEpisode();
  }, [id]);

  if (!id) {
    return <p className="text-sm text-rose-600">Invalid character id.</p>;
  }

  if (isLoading && !character) {
    return <p className="text-sm text-slate-500">Loading character...</p>;
  }

  if (error) {
    return (
      <div className="space-y-3">
        <p className="rounded-md border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          Something went wrong: {error}
        </p>
        <BackToList />
      </div>
    );
  }

  if (!character) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-500">Character not found.</p>
        <BackToList />
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <BackToList />
      <CharacterDetailCard character={character} episodes={episodes} />
    </section>
  );
}

export default CharacterDetailPage;
