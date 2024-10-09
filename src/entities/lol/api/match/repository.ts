import {
  getMatch as getMatchApi,
  getMatchesId as getMatchesIdApi,
} from "./api";
import { dtoToMatch } from "./transform";

export async function getLast10MatchesId(
  puuid: string,
  platform: string,
  getMatchesId = getMatchesIdApi,
) {
  return await getMatchesId(puuid, platform, 10);
}

export async function getMatch(
  matchId: string,
  platform: string,
  getMatch = getMatchApi,
) {
  const matchDto = await getMatch(matchId, platform);
  return dtoToMatch(matchDto);
}
