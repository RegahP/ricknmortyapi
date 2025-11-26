import { type Character } from "../types/ricknmorty";
import { Link } from "react-router-dom";

export const CharacterGridCard = ({ character }: { character: Character }) => { return (<article
              key={character.id}
              className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex flex-col"
            >
              <img
                src={character.image}
                alt={character.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-3 flex flex-col gap-1 flex-1">
                <h3 className="font-semibold text-slate-800">
                  {character.name}
                </h3>
                <p className="text-xs text-slate-500">
                  {character.status} • {character.species}
                </p>
                <p className="text-xs text-slate-500">
                  Location: {character.location?.name}
                </p>

                <div className="mt-auto pt-2">
                  <Link
                    to={`/character/${character.id}`}
                    className="inline-flex items-center text-xs font-medium text-emerald-600 hover:underline"
                  >
                    View details →
                  </Link>
                </div>
              </div>
            </article>)};