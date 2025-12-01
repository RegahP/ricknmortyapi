import { useParams } from "react-router-dom";
import { CharacterDetailCard } from "../components/CharacterDetailCard";
import { BackToList } from "../components/BackToList";
import { useCharacterDetail } from "../hooks/useCharacterDetail";

function CharacterDetailPage() {
  const { id } = useParams<{ id: string }>();
  
  const { character, episodes, isLoading, error } = useCharacterDetail({ id });

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
