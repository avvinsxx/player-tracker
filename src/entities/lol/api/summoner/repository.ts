import { getSummoner as getSummonerApi } from "./api";
import { dtoToSummoner } from "./transform";

export async function getSummoner(
  puuid: string,
  platfrom: string,
  getSummoner = getSummonerApi,
) {
  const summonerDto = await getSummoner(puuid, platfrom);
  return dtoToSummoner(summonerDto);
}
