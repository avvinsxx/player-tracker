import { getRegionBaseUrl } from "../client";
import { MatchDto } from "./dto";

async function getMatch(matchId: string, platform: string): Promise<MatchDto> {
  const url = new URL(getRegionBaseUrl(platform));
  url.pathname = `/lol/match/v5/matches/${matchId}`;

  const matchReponse = await fetch(url, { method: "GET", cache: "no-store" });
  return await matchReponse.json();
}

async function getMatchesId(
  puuid: string,
  platform: string,
  count: number,
): Promise<string[]> {
  const url = new URL(getRegionBaseUrl(platform));
  url.pathname = `/lol/match/v5/matches/by-puuid/${puuid}/ids`;
  url.searchParams.append("start", "0");
  url.searchParams.append("count", count.toString());

  const matchIdsReponse = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  if (matchIdsReponse.status !== 200) {
    console.error(await matchIdsReponse.text());
    return [];
  }
  return await matchIdsReponse.json();
}

export default { getMatch, getMatchesId };
