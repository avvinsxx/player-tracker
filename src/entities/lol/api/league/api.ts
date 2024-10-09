import { getPlatformBaseUrl } from "../client";
import { LeagueDto } from "./dto";

export async function getLeagues(
  summonerId: string,
  platform: string,
): Promise<LeagueDto[]> {
  const url = new URL(getPlatformBaseUrl(platform));
  url.pathname = `/lol/league/v4/entries/by-summoner/${summonerId}`;

  const leagueResponse = await fetch(url, { method: "GET", cache: "no-store" });
  return await leagueResponse.json();
}
