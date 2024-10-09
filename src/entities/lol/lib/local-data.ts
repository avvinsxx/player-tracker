import championsMap from "./data/champions.json";
import platformMap from "./data/platform.json";
import regionsMap from "./data/regions.json";
import summonersMap from "./data/summoners.json";

export function getChampionName(id: number) {
  const championsMapTyped: Record<string, string> = championsMap;
  return championsMapTyped[String(id)];
}

export function getSpellName(id: number) {
  const summonersMapTyped: Record<string, string> = summonersMap;
  return summonersMapTyped[String(id)];
}

export function getRegionByPlatform(platform: string) {
  const regionsMapTyped: Record<string, string[]> = regionsMap;

  for (const region in regionsMapTyped) {
    if (regionsMapTyped[region].includes(platform)) {
      return region;
    }
  }
  return null;
}

export function getAllPlatforms() {
  const platformMapTyped: Record<string, string> = platformMap;

  return platformMapTyped;
}
