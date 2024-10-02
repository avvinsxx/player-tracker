import ChampionMasteryApi from "./api";
import { dtoToChampionMastery } from "./transform";

async function get3ChampionsMastery(puuid: string, platform: string) {
  const championMasteriesDto = await ChampionMasteryApi.getChampionMasteries(
    puuid,
    platform,
    3,
  );
  return championMasteriesDto
    .slice(0, 3)
    .map((championMasteryDto) => dtoToChampionMastery(championMasteryDto));
}

export default {
  get3ChampionsMastery,
};
