import { RankImageDota2 } from "@/src/entities/dota2";
import { getRank } from "../api/get-rank";

interface RankProps {
  playerId: number;
}

export async function Rank({ playerId }: RankProps) {
  const { leaderboard, mmr } = await getRank({ id: playerId });

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-4">
      <RankImageDota2 leaderboard={leaderboard} mmr={mmr} viewType="page" />
    </div>
  );
}
