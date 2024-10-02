export interface ViewModel {
  matchId: string;
  gameMode: string;
  startTimestamp: number;
  duration: number;
  champion: {
    iconUrl: string;
    name: string;
  };
  level: number;
  deaths: number;
  assists: number;
  kills: number;
  kda: number;
  win: boolean;
  items: { id: number; iconUrl: string }[];
  summonerSpells: { id: number; name: string; iconUrl: string }[];
}
