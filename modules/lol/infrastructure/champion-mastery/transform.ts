import { ChampionMastery } from "../../domain";
import { ChampionMasteryDto } from "./dto";

export function dtoToChampionMastery(
  championMastery: ChampionMasteryDto,
): ChampionMastery {
  return {
    championId: championMastery.championId,
    level: championMastery.championLevel,
  };
}
