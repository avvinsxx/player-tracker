import { getPlatformBaseUrl } from "../client";
import { ChampionMasteryDto } from "./dto";

export async function getChampionMasteries(
  puuid: string,
  platform: string,
  count: number,
): Promise<ChampionMasteryDto[]> {
  const url = new URL(getPlatformBaseUrl(platform));
  url.pathname = `/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}/top`;
  url.searchParams.append("count", count.toString());

  const championMasteriesReponse = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  if (championMasteriesReponse.status !== 200) {
    console.error(await championMasteriesReponse.text());
    return [];
  }
  return await championMasteriesReponse.json();
}
