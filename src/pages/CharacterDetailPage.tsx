import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import type { Character, Episode } from "../types/ricknmorty";

const API_BASE_URL = "https://rickandmortyapi.com/api";

function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();

  const [character, setCharacter] = useState<Character | null>(null);
  const [firstEpisodeName, setFirstEpisodeName] = useState<string | null>(null);
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
          const firstEpisodeUrl = data.episode[0];
          const episodeResponse = await fetch(firstEpisodeUrl);
          if (episodeResponse.ok) {
            const episodeData: Episode = await episodeResponse.json();
            setFirstEpisodeName(episodeData.name);
          } else {
            setFirstEpisodeName(null);
          }
        } else {
          setFirstEpisodeName(null);
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
        <Link to="/" className="text-sm text-emerald-600 hover:underline">
          ← Back to list
        </Link>
      </div>
    );
  }

  if (!character) {
    return (
      <div className="space-y-3">
        <p className="text-sm text-slate-500">Character not found.</p>
        <Link to="/" className="text-sm text-emerald-600 hover:underline">
          ← Back to list
        </Link>
      </div>
    );
  }

  return (
    <section className="space-y-4">
      <Link to="/" className="text-sm text-emerald-600 hover:underline">
        ← Back to list
      </Link>

      <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        <img
          src={character.image}
          alt={character.name}
          className="w-full md:w-64 h-64 md:h-auto object-cover"
        />

        <div className="p-4 md:p-6 flex-1 flex flex-col gap-2">
          <h2 className="text-2xl font-semibold text-slate-800">
            {character.name}
          </h2>

          <div className="grid gap-x-6 gap-y-1 text-sm text-slate-700 sm:grid-cols-2">
            <p>
              <span className="font-medium">Status:</span> {character.status}
            </p>
            <p>
              <span className="font-medium">Species:</span> {character.species}
            </p>
            <p>
              <span className="font-medium">Gender:</span> {character.gender}
            </p>
            <p>
              <span className="font-medium">Origin:</span>{" "}
              {character.origin?.name}
            </p>
            <p>
              <span className="font-medium">Location:</span>{" "}
              {character.location?.name}
            </p>
            <p>
              <span className="font-medium">Episodes:</span>{" "}
              {character.episode.length}
            </p>
          </div>

          <p className="text-sm text-slate-700">
            <span className="font-medium">First seen in:</span>{" "}
            {firstEpisodeName ? firstEpisodeName : "Unknown / loading"}
          </p>

          <div className="mt-3">
            <p className="text-xs font-medium text-slate-500 mb-1">
              Episode URLs (first 5):
            </p>
            <ul className="max-h-32 overflow-auto rounded-md border border-slate-200 bg-slate-50 text-xs text-slate-600 p-2 space-y-1">
              {character.episode.slice(0, 5).map((epUrl) => (
                <li key={epUrl} className="truncate">
                  {epUrl}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacterDetailPage;
