import LeagueApi from "./api";
import { dtoToLeague } from "./transform";

async function getFirstLeague(summonerId: string, platform: string) {
  const leaguesDto = await LeagueApi.getLeagues(summonerId, platform);
  return dtoToLeague(leaguesDto[0] ?? {});
}

export default { getFirstLeague };
