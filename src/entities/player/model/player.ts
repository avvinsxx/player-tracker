export interface Player {
  id?: number;
  nickname?: string;
  birthdate?: Date | null;
  mainGame?: "lol" | "dota2" | null;
  role?: string | null;
}
