import {
  PlayerHero,
  PlayerWl,
  Rating,
  RecentMatch,
} from "@/modules/dota2/domain";
import { Player } from "../../domain/player/player";
import {
  PlayerDto,
  PlayerHeroDto,
  PlayerWlDto,
  RatingDto,
  RecentMatchDto,
} from "./dto";

export function dtoToPlayer(dto: PlayerDto): Player {
  return {
    id: dto.profile.account_id,
    name: dto.profile.personaname,
    avatar: dto.profile.avatar,
    avatarFull: dto.profile.avatarfull,
    leaderboardRank: dto.leaderboard_rank,
  };
}

export function dtoToRating(dto: RatingDto): Rating {
  return {
    playerId: dto.account_id,
    dateTime: Date.parse(dto.time),
    mmr: dto.solo_competitive_rank,
  };
}

export function dtoToRecentMatch(dto: RecentMatchDto): RecentMatch {
  return {
    id: dto.match_id,
    win: dto.player_slot >= 0 && dto.player_slot <= 127 && dto.radiant_win,
  };
}

export function dtoToPlayerHero(dto: PlayerHeroDto): PlayerHero {
  return {
    heroId: dto.hero_id,
    games: dto.games,
    win: dto.win,
  };
}

export function dtoToPlayerWl(dto: PlayerWlDto): PlayerWl {
  return {
    win: dto.win,
    lose: dto.lose,
  };
}
