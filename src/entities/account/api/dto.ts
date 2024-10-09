import { RequiredFields } from "@/src/shared/lib";
import { PlayerDto } from "../../player/api/types";

export interface AccountDto {
  id?: number;
  name?: string;
  level?: number | null;
  game?: "lol" | "dota2";
  external_id?: string;
  tier?: string | null;
  rank?: string | null;
  win_rate?: number | null;
  win_rate_games?: number;
  platform?: string | null;
  refreshed_at?: string | null;
  player_id?: number | null;
  leaderboard?: number | null;
  mmr?: number | null;
  players?: PlayerDto | null;
}

export type InsertAccountDto = RequiredFields<
  AccountDto,
  "external_id" | "game" | "name"
>;

export type UpdateAccountDto = RequiredFields<AccountDto, "id">;
