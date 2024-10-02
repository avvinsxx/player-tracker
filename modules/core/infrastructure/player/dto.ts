import { RequiredFields } from "../utils";

export interface PlayerDto {
  id?: number;
  nickname?: string;
  birthdate?: string | null;
  role?: string | null;
  main_game?: "lol" | "dota2" | null;
}

export type InsertPlayerDto = RequiredFields<PlayerDto, "nickname">;
export type UpdatePlayerDto = RequiredFields<PlayerDto, "id">;
