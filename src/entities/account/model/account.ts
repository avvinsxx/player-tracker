import { Player } from "../../player/@x/account";

export interface Account {
  id?: number;
  name?: string;
  level?: number | null;
  game?: "lol" | "dota2";
  externalId?: string;
  tier?: string | null;
  rank?: string | null;
  winRate?: number;
  winRateGames?: number;
  platform?: string | null;
  refreshedAt?: Date | null;
  playerId?: number | null;
  leaderboard?: number | null;
  mmr?: number | null;
  player?: Player;
}
