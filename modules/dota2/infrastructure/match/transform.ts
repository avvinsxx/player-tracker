import { Match } from "../../domain/match/match";
import { MatchDto } from "./dto";

export function dtoToMatch(dto: MatchDto): Match | null {
  if (!dto.match_id) return null;
  return {
    id: dto.match_id,
    gameMode: dto.game_mode,
    players: dto.players.map((matchPlayer) => ({
      id: matchPlayer.account_id,
      heroId: matchPlayer.hero_id,
      level: matchPlayer.level,
      items: [
        matchPlayer.item_0,
        matchPlayer.item_1,
        matchPlayer.item_2,
        matchPlayer.item_3,
        matchPlayer.item_4,
        matchPlayer.item_5,
      ],
      backpack: [
        matchPlayer.backpack_0,
        matchPlayer.backpack_1,
        matchPlayer.backpack_2,
      ],
      neutralItem: matchPlayer.item_neutral,
      win: matchPlayer.win === 1,
      kills: matchPlayer.kills,
      deaths: matchPlayer.deaths,
      assists: matchPlayer.assists,
      startTimestamp: matchPlayer.start_time * 1000,
      duration: matchPlayer.duration,
      gameMode: matchPlayer.game_mode,
    })),
  };
}
