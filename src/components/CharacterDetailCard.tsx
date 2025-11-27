import { type Character } from "../types/ricknmorty";
import type { FC } from "react";

type CharacterDetailCardProps = {
    character: Character;
    firstEpisodeName: string | null;
};

export const CharacterDetailCard: FC<CharacterDetailCardProps> = ({ character, firstEpisodeName }) => { return (
    <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col md:flex-row">
        <img
          src={character.image}
          alt={character.name}
          className="w-full md:w-auto h-auto md:h-auto object-cover"
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
)};