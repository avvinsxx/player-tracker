import {
  getPlayerFromMatchById,
  Match,
  MatchPlayer,
} from "../../domain/match/match";
import ConstantsService from "../../infrastructure/constants";
import MatchService from "../../infrastructure/match";
import PlayerService from "../../infrastructure/player";

interface GetLastMatchesParticipationInput {
  id: number;
}

const dependencies = {
  get10LastMatches: PlayerService.get10LastMatches,

  getHeroesConstants: ConstantsService.getHeroesConstants,
  getGameModeConstants: ConstantsService.getGameModeConstants,
  getItemConstants: ConstantsService.getItemConstants,

  getMatch: MatchService.getMatch,
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
