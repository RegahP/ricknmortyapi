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

        // 1) Fetch character
        const response = await fetch(`${API_BASE_URL}/character/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch character");
        }
        const data: Character = await response.json();
        setCharacter(data);

        // 2) Fetch first episode (extra API call)
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
    return <p>Invalid character id.</p>;
  }

  if (isLoading && !character) {
    return <p>Loading character...</p>;
  }

  if (error) {
    return (
      <div>
        <p>Something went wrong: {error}</p>
        <Link to="/">← Back to list</Link>
      </div>
    );
  }

  if (!character) {
    return (
      <div>
        <p>Character not found.</p>
        <Link to="/">← Back to list</Link>
      </div>
    );
  }

  return (
    <section>
      <Link to="/">← Back to list</Link>

      <div style={{ display: "flex", gap: "1rem", marginTop: "1rem", flexWrap: "wrap" }}>
        <img
          src={character.image}
          alt={character.name}
          style={{ width: "250px", borderRadius: "8px" }}
        />

        <div>
          <h2>{character.name}</h2>

          {/* 4+ fields */}
          <p>
            <strong>Status:</strong> {character.status}
          </p>
          <p>
            <strong>Species:</strong> {character.species}
          </p>
          <p>
            <strong>Gender:</strong> {character.gender}
          </p>
          <p>
            <strong>Origin:</strong> {character.origin?.name}
          </p>
          <p>
            <strong>Location:</strong> {character.location?.name}
          </p>

          {/* Field that uses a second API call */}
          <p>
            <strong>First seen in:</strong>{" "}
            {firstEpisodeName ? firstEpisodeName : "Unknown / loading"}
          </p>

          {/* List field */}
          <div style={{ marginTop: "1rem" }}>
            <strong>Episodes ({character.episode.length}):</strong>
            <ul>
              {character.episode.slice(0, 5).map((epUrl) => (
                <li key={epUrl}>{epUrl}</li>
              ))}
            </ul>
            <small>Showing first 5 episode URLs for now.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CharacterDetailPage;
