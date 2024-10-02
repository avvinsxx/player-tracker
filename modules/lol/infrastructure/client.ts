import LocalDataService from "./local-data";

const API_KEY = process.env.RIOT_API_KEY!;

export function getRegionBaseUrl(platform: string) {
  const region = LocalDataService.getRegionByPlatform(platform);
  const url = new URL(`https://${region}.api.riotgames.com/`);
  url.searchParams.append("api_key", API_KEY);
  return url;
}

export function getPlatformBaseUrl(platform: string) {
  const url = new URL(`https://${platform}.api.riotgames.com/`);
  url.searchParams.append("api_key", API_KEY);
  return url;
}
