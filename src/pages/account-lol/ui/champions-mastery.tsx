import { MdDoNotDisturb } from "react-icons/md";

import {
  get3ChampionsMastery,
  getAccount,
  getChampionIconUrl,
  getChampionName,
} from "@/src/entities/lol";
import { ChampionMastery } from "./champion-mastery";

interface ChampionsMasteryProps {
  name: string;
  tag: string;
  platform: string;
}

export async function ChampionsMastery({
  name,
  tag,
  platform,
}: ChampionsMasteryProps) {
  const account = await getAccount(name, tag, platform);
  const championsMastery = await get3ChampionsMastery(account.id, platform);
  return (
    <div className="flex flex-col rounded-md bg-neutral-700 p-4">
      <h2 className="text-center text-2xl">Favourite characters</h2>

      {championsMastery.length ? (
        <div className="mt-6 flex flex-wrap justify-center gap-6">
          <ChampionMastery
            label={getChampionName(championsMastery[1].championId)}
            image={getChampionIconUrl(championsMastery[1].championId)}
            place={2}
            stat={championsMastery[1].level}
          />
          <ChampionMastery
            label={getChampionName(championsMastery[0].championId)}
            image={getChampionIconUrl(championsMastery[0].championId)}
            place={1}
            stat={championsMastery[0].level}
          />
          <ChampionMastery
            label={getChampionName(championsMastery[2].championId)}
            image={getChampionIconUrl(championsMastery[2].championId)}
            place={3}
            stat={championsMastery[2].level}
          />
        </div>
      ) : (
        <div className="flex flex-grow-[1] flex-col items-center justify-center">
          <MdDoNotDisturb />
          <p>Characters not found</p>
        </div>
      )}
    </div>
  );
}
