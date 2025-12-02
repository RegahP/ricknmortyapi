import { type Character } from "../types/ricknmorty";
import { type Episode } from "../types/ricknmorty";
import type { FC } from "react";

type CharacterDetailCardProps = {
  character: Character;
  episodes: Episode | Episode[] | null;
};

export const CharacterDetailCard: FC<CharacterDetailCardProps> = ({ character, episodes }) => {
  const episodeList = episodes ? (Array.isArray(episodes) ? episodes : [episodes]) : [];

  return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row gap-6 p-6">
      <div className="shrink-0">
        <img
          src={character.image || "/placeholder.svg"}
          alt={character.name}
          className="w-full h-full md:w-64 md:h-64 rounded-lg object-cover bg-slate-200"
        />
      </div>
      
      <div className="p-4 md:p-6 flex-1 flex flex-col gap-2">
        {/* Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">{character.name}</h2>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Status</p>
              <p className="text-sm text-slate-700">{character.status}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Species</p>
              <p className="text-sm text-slate-700">{character.species}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Gender</p>
              <p className="text-sm text-slate-700">{character.gender}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Origin</p>
              <p className="text-sm text-slate-700">{character.origin?.name}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-slate-500 mb-1">Location</p>
              <p className="text-sm text-slate-700">{character.location?.name}</p>
            </div>
          </div>
        </div>

        <p className="text-sm text-slate-700">
          <span className="font-medium">First seen in:</span>{" "}
          {episodeList.length > 0 ? episodeList[0]?.name : "Unknown / loading"}
        </p>

        <div className="mt-6">
          <p className="text-sm font-semibold text-slate-700 mb-3">Appears in episodes:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
            {episodeList.map((ep) => (
              <div
                key={ep.id}
                className="flex items-center gap-2 px-3 py-2 rounded-md bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-colors"
              >
                <span className="text-xs font-medium text-slate-600 shrink-0 bg-slate-200 px-2 py-0.5 rounded">
                  {ep.episode}
                </span>
                <span className="text-sm text-slate-700 truncate">{ep.name}</span>
              </div>
            ))}
          </div>
          {episodeList.length > 0 && (
            <p className="text-xs text-slate-500 mt-2">
              {episodeList.length} episode{episodeList.length !== 1 ? "s" : ""}
            </p>
          )}
        </div>
      </div>
    </div>
  )
};