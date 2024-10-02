import { League } from "../../domain/league/league";
import { LeagueDto } from "./dto";

export function dtoToLeague(league: LeagueDto): League {
  return {
    tier: league.tier,
    rank: league.rank,
  };
}
