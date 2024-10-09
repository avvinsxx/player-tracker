import { getLastRating, getPlayer } from "@/src/entities/dota2";

interface GetRankInput {
  id: number;
}

const dependencies = {
  getPlayer: getPlayer,
  getLastRating: getLastRating,
};

export async function getRank(
  { id }: GetRankInput,
  { getPlayer, getLastRating }: typeof dependencies = dependencies,
) {
  const playerData = await getPlayer(id);
  const lastRating = await getLastRating(id);

  return {
    leaderboard: playerData.leaderboardRank,
    mmr: lastRating?.mmr ?? null,
  };
}
