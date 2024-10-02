import { getRank } from "../../../application/get-rank";
import RankImage from "./rank-image";

interface RankProps {
  playerId: number;
}

async function Rank({ playerId }: RankProps) {
  const { leaderboard, mmr } = await getRank({ id: playerId });

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-4">
      <RankImage leaderboard={leaderboard} mmr={mmr} viewType="page" />
    </div>
  );
}

export default Rank;
