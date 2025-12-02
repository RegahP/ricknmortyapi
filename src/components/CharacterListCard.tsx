import { type Character } from "../types/ricknmorty";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa6";

export const CharacterListCard = ({ character }: { character: Character }) => {
    return (
        <article
            key={character.id}
            className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden flex"
        >
            <img
                src={character.image}
                alt={character.name}
                className="w-16 h-32 md:w-32 md:h-24 object-cover"
            />
            <div className="p-3 flex flex-row gap-1 flex-1">
                <div className="flex flex-col gap-1 flex-1">
                    <h3 className="font-semibold text-slate-800">
                        {character.name}
                    </h3>
                    <p className="text-xs md:text-s text-slate-500">
                        {character.gender} {character.species} ({character.status})
                    </p>
                </div>
                <div className="flex flex-col gap-1 flex-1">
                    <p className="text-xs md:text-s text-slate-500">
                        <b>Origin:</b> {character.origin?.name}
                    </p>
                    <p className="text-xs md:text-s text-slate-500">
                        <b>Location:</b> {character.location?.name}
                    </p>
                </div>

                <div className="mt-auto pt-2">
                    <Link
                        to={`/character/${character.id}`}
                        className="inline-flex items-center text-xs font-medium text-red-700 hover:underline"
                    >
                        View details <FaArrowRight className="inline-block ml-1" />
                    </Link>
                </div>
            </div>
        </article>
    )
};