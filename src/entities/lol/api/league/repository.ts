import { getLeagues as getLeaguesApi } from "./api";
import { dtoToLeague } from "./transform";

export async function getFirstLeague(
  summonerId: string,
  platform: string,
  getLeagues = getLeaguesApi,
) {
  const leaguesDto = await getLeagues(summonerId, platform);
  return dtoToLeague(leaguesDto[0] ?? {});
}
