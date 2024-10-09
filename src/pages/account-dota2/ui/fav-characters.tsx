import { get3FavouriteHeroes, getHeroesConstants } from "@/src/entities/dota2";
import { FavCharacter } from "./fav-character";

interface FavCharactersProps {
  playerId: number;
}

export async function FavCharacters({ playerId }: FavCharactersProps) {
  const heroesConstants = await getHeroesConstants();
  const heroes = await get3FavouriteHeroes(playerId);

  return (
    <div className="rounded-md bg-neutral-700 p-4">
      <h2 className="text-center text-2xl">Favourite characters</h2>
      <div className="mt-6 flex flex-wrap justify-center gap-6">
        <FavCharacter
          place={2}
          name={heroesConstants[heroes[1].heroId].name}
          image={`https://cdn.cloudflare.steamstatic.com/${heroesConstants[heroes[1].heroId].img}`}
          games={heroes[1].games}
          win={heroes[1].win}
        />
        <FavCharacter
          place={1}
          name={heroesConstants[heroes[0].heroId].name}
          image={`https://cdn.cloudflare.steamstatic.com/${heroesConstants[heroes[0].heroId].img}`}
          games={heroes[0].games}
          win={heroes[0].win}
        />
        <FavCharacter
          place={3}
          name={heroesConstants[heroes[2].heroId].name}
          image={`https://cdn.cloudflare.steamstatic.com/${heroesConstants[heroes[2].heroId].img}`}
          games={heroes[2].games}
          win={heroes[2].win}
        />
      </div>
    </div>
  );
}
