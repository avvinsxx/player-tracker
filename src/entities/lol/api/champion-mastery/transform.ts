import { ChampionMastery } from "../../model/champion-mastery/champion-mastery";
import { ChampionMasteryDto } from "./dto";

export function dtoToChampionMastery(
  championMastery: ChampionMasteryDto,
): ChampionMastery {
  return {
    championId: championMastery.championId,
    level: championMastery.championLevel,
  };
}
