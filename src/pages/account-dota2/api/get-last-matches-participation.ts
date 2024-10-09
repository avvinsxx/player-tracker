import {
  get10LastMatches,
  getGameModeConstants,
  getHeroesConstants,
  getItemConstants,
  getMatch,
  getPlayerFromMatchById,
  Match,
  MatchPlayer,
} from "@/src/entities/dota2";

interface GetLastMatchesParticipationInput {
  id: number;
}

const dependencies = {
  get10LastMatches: get10LastMatches,

  getHeroesConstants: getHeroesConstants,
  getGameModeConstants: getGameModeConstants,
  getItemConstants: getItemConstants,

  getMatch: getMatch,
};

export async function getLastMatchesParticipation(
  { id }: GetLastMatchesParticipationInput,
  {
    get10LastMatches,
    getHeroesConstants,
    getGameModeConstants,
    getItemConstants,
    getMatch,
  }: typeof dependencies = dependencies,
) {
  const [heroesConstants, gameModeConstants, itemConstants, recentMatches] =
    await Promise.all([
      getHeroesConstants(),
      getGameModeConstants(),
      getItemConstants(),

      get10LastMatches(id),
    ]);

  const matchRequests: Promise<Match | null>[] = [];
  for (const recentMatchData of recentMatches) {
    matchRequests.push(getMatch(recentMatchData.id));
  }

  const matches = await Promise.all(matchRequests);

  const matchParticipation: MatchPlayer[] = [];
  for (const match of matches) {
    if (match) {
      const playerInMatch = getPlayerFromMatchById(match, id);
      matchParticipation.push(playerInMatch);
    }
  }

  return {
    lastMatchesPariticipation: matchParticipation,
    heroesConstants,
    gameModeConstants,
    itemConstants,
  };
}
