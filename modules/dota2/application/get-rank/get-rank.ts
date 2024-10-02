import PlayerService from "../../infrastructure/player";

interface GetRankInput {
  id: number;
}

const dependencies = {
  getPlayer: PlayerService.getPlayer,
  getLastRating: PlayerService.getLastRating,
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
