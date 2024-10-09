import {
  getPlayer as getPlayerApi,
  getPlayerHeroes as getPlayerHeroesApi,
  getPlayerWL as getPlayerWLApi,
  getRatings as getRatingsApi,
  getRecentMatches as getRecentMatchesApi,
} from "./api";
import {
  dtoToPlayer,
  dtoToPlayerHero,
  dtoToPlayerWl,
  dtoToRating,
  dtoToRecentMatch,
} from "./transform";

export async function getPlayer(id: number, getPlayer = getPlayerApi) {
  return dtoToPlayer(await getPlayer(id));
}

export async function getLastRating(
  playerId: number,
  getRatings = getRatingsApi,
) {
  const ratingDtos = await getRatings(playerId);
  const lastRatingDto =
    ratingDtos.length == 0
      ? null
      : ratingDtos.reduce((prev, current) => {
          return !prev || Date.parse(current.time) > Date.parse(prev.time)
            ? current
            : prev;
        });
  return lastRatingDto ? dtoToRating(lastRatingDto) : lastRatingDto;
}

export async function get10LastMatches(
  playerId: number,
  getRecentMatches = getRecentMatchesApi,
) {
  const matcheDtos = await getRecentMatches(playerId);
  return matcheDtos
    .slice(0, 10)
    .map((recentMatchDto) => dtoToRecentMatch(recentMatchDto));
}

export async function get3FavouriteHeroes(
  playerId: number,
  getPlayerHeroes = getPlayerHeroesApi,
) {
  const playerHeroDtos = await getPlayerHeroes(playerId);
  return playerHeroDtos
    .slice(0, 3)
    .map((playerHeroDto) => dtoToPlayerHero(playerHeroDto));
}

export async function getWl(playerId: number, getPlayerWL = getPlayerWLApi) {
  const playerWlDto = await getPlayerWL(playerId);
  return dtoToPlayerWl(playerWlDto);
}
