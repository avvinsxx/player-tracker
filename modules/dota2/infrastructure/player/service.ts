import PlayerApi from "./api";
import {
  dtoToPlayer,
  dtoToPlayerHero,
  dtoToPlayerWl,
  dtoToRating,
  dtoToRecentMatch,
} from "./transform";

async function getPlayer(id: number, api = PlayerApi) {
  return dtoToPlayer(await api.getPlayer(id));
}

async function getLastRating(playerId: number, api = PlayerApi) {
  const ratingDtos = await api.getRatings(playerId);
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

async function get10LastMatches(playerId: number, api = PlayerApi) {
  const matcheDtos = await api.getRecentMatches(playerId);
  return matcheDtos
    .slice(0, 10)
    .map((recentMatchDto) => dtoToRecentMatch(recentMatchDto));
}

async function get3FavouriteHeroes(playerId: number, api = PlayerApi) {
  const playerHeroDtos = await api.getPlayerHeroes(playerId);
  return playerHeroDtos
    .slice(0, 3)
    .map((playerHeroDto) => dtoToPlayerHero(playerHeroDto));
}

async function getWl(playerId: number, api = PlayerApi) {
  const playerWlDto = await api.getPlayerWL(playerId);
  return dtoToPlayerWl(playerWlDto);
}

export default {
  getPlayer,
  getLastRating,
  get10LastMatches,
  get3FavouriteHeroes,
  getWl,
};
