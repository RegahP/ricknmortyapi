import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import type { Character, CharacterApiResponse } from "../types/ricknmorty";

const API_BASE_URL = "https://rickandmortyapi.com/api";

function CharacterListPage() {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCharacters() {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`${API_BASE_URL}/character?page=${page}`);
        if (!response.ok) {
          throw new Error("Failed to fetch characters");
        }

        const data: CharacterApiResponse = await response.json();
        setCharacters(data.results);
        setTotalPages(data.info.pages);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchCharacters();
  }, [page]);

  const handlePrevious = () => {
    setPage((prev) => Math.max(1, prev - 1));
  };

  const handleNext = () => {
    setPage((prev) => Math.min(totalPages, prev + 1));
  };

  if (isLoading && characters.length === 0) {
    return <p>Loading characters...</p>;
  }

  if (error) {
    return <p>Something went wrong: {error}</p>;
  }

  return (
    <section>
      <h2>Characters (page {page} of {totalPages})</h2>

      <div
        className="character-list"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {characters.map((character) => (
          <article
            key={character.id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "0.5rem",
              background: "#fff",
            }}
          >
            <img
              src={character.image}
              alt={character.name}
              style={{ width: "100%", borderRadius: "6px" }}
            />
            <h3 style={{ marginTop: "0.5rem" }}>{character.name}</h3>
            <p>
              <strong>Status:</strong> {character.status}
            </p>
            <p>
              <strong>Species:</strong> {character.species}
            </p>

            <Link to={`/character/${character.id}`} style={{ display: "inline-block", marginTop: "0.5rem" }}>
              View details →
            </Link>
          </article>
        ))}
      </div>

      <div style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
        <button onClick={handlePrevious} disabled={page <= 1}>
          Previous
        </button>
        <button onClick={handleNext} disabled={page >= totalPages}>
          Next
        </button>
      </div>
    </section>
  );
}

export default CharacterListPage;
