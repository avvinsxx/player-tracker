import { getPlatformBaseUrl } from "../client";
import { SummonerDto } from "./dto";

export async function getSummoner(
  puuid: string,
  platform: string,
): Promise<SummonerDto> {
  const url = new URL(getPlatformBaseUrl(platform));
  url.pathname = `/lol/summoner/v4/summoners/by-puuid/${puuid}`;

  const summonerResponse = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  return await summonerResponse.json();
}
