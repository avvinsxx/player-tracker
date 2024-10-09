import { Summoner } from "../../model/summoner/summoner";
import { SummonerDto } from "./dto";

export function dtoToSummoner(summoner: SummonerDto): Summoner {
  return {
    id: summoner.id,
    iconId: summoner.profileIconId,
    level: summoner.summonerLevel,
  };
}
