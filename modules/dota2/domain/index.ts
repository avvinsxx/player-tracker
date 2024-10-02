export interface SearchResult {
  id: number;
  name: string;
  avatar: string;
  similarity: number;
}

export interface Rating {
  playerId: number;
  mmr: number;
  dateTime: number;
}

export interface RecentMatch {
  id: number;
  win: boolean;
}

export interface PlayerHero {
  heroId: number;
  games: number;
  win: number;
}

export interface PlayerWl {
  win: number;
  lose: number;
}

export interface HeroConstants {
  [key: string]: { name: string; img: string };
}

export interface ItemConstants {
  [key: string]: { img: string };
}

export interface GameModeConstants {
  [key: string]: { name: string };
}
