import { Player } from "../player/player";

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

export function getPageUrl(account: Account) {
  if (account.game === "lol")
    return `/dashboard/accounts/lol/${account.name?.split("#")[0]}?tag=${account.name?.split("#")[1]}&platform=${account.platform}`;
  if (account.game === "dota2")
    return `/dashboard/accounts/dota2/${account.externalId}`;
  return "";
}
