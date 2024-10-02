import { ensure } from "@/modules/core/infrastructure/utils";

export interface Match {
  id: number;
  gameMode: number;
  players: MatchPlayer[];
}
export interface MatchPlayer {
  id: number;
  gameMode: number;
  heroId: number;
  level: number;
  items: number[];
  backpack: number[];
  neutralItem: number;
  win: boolean;
  kills: number;
  deaths: number;
  assists: number;
  startTimestamp: number;
  duration: number;
}

export function getPlayerFromMatchById(match: Match, id: number) {
  return ensure(match.players.find((player) => player.id === id));
}
