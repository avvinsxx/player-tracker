import { getChampionMasteries as getChampionMasteriesApi } from "./api";
import { dtoToChampionMastery } from "./transform";

export async function get3ChampionsMastery(
  puuid: string,
  platform: string,
  getChampionMasteries = getChampionMasteriesApi,
) {
  const championMasteriesDto = await getChampionMasteries(puuid, platform, 3);
  return championMasteriesDto
    .slice(0, 3)
    .map((championMasteryDto) => dtoToChampionMastery(championMasteryDto));
}
