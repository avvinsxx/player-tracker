import { MdDoNotDisturb } from "react-icons/md";

import { RankImageLol } from "@/src/entities/lol";
import { getRank } from "../api/get-rank";

interface RankProps {
  name: string;
  tag: string;
  platform: string;
}

export async function Rank({ name, tag, platform }: RankProps) {
  const league = await getRank({ name, tag, platform });

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-4">
      {league.tier ? (
        <RankImageLol tier={league.tier} rank={league.rank} viewType="page" />
      ) : (
        <>
          <MdDoNotDisturb />
          <div>Ranked data not found</div>
        </>
      )}
    </div>
  );
}
