export interface PlayerDto {
  profile: {
    account_id: number;
    personaname: string;
    avatar: string;
    avatarfull: string;
  };
  leaderboard_rank: number;
}

export interface RatingDto {
  account_id: number;
  solo_competitive_rank: number;
  time: string;
}

export interface RecentMatchDto {
  match_id: number;
  radiant_win: boolean;
  player_slot: number;
}

export interface PlayerHeroDto {
  hero_id: number;
  games: number;
  win: number;
}

export interface PlayerWlDto {
  win: number;
  lose: number;
}
