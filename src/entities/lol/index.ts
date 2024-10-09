export { getAccount } from "./api/account/repository";
export { get3ChampionsMastery } from "./api/champion-mastery/repository";
export { getFirstLeague } from "./api/league/repository";
export { getLast10MatchesId, getMatch } from "./api/match/repository";
export { getSummoner } from "./api/summoner/repository";
export {
  getAllPlatforms,
  getChampionName,
  getSpellName,
} from "./lib/local-data";
export { getChampionIconUrl } from "./model/champion/champion";
export { getItemIconUrl, getSummonerSpellIconUrl } from "./model/match/match";
export { getSummonerIconUrl } from "./model/summoner/summoner";
export { RankImage as RankImageLol } from "./ui/rank-image";
