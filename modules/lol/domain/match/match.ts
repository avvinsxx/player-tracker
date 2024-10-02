export interface Match {
  id: string;
  gameMode: string;
  startTimestamp: number;
  duration: number;
  participants: {
    puuid: string;
    championId: number;
    level: number;
    deaths: number;
    assists: number;
    kills: number;
    win: boolean;
    items: number[];
    summonerSpells: number[];
  }[];
}

export function getItemIconUrl(itemId: number) {
  return `/img/lol/item/${itemId === 0 ? 7050 : itemId}.png`;
}

export function getSummonerSpellIconUrl(spellName: string) {
  return `/img/lol/spell/${spellName}.png`;
}
