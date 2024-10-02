export interface MatchDto {
  metadata: {
    matchId: string;
  };
  info: {
    gameDuration: number;
    gameMode: string;
    gameStartTimestamp: number;
    participants: Participant[];
  };
}

interface Participant {
  assists: number;
  champLevel: number;
  championId: number;
  deaths: number;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  kills: number;
  puuid: string;
  summoner1Id: number;
  summoner2Id: number;
  win: boolean;
}
