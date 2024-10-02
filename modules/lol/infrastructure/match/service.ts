import MatchApi from "./api";
import { dtoToMatch } from "./transform";

async function getLast10MatchesId(puuid: string, platform: string) {
  return await MatchApi.getMatchesId(puuid, platform, 10);
}

async function getMatch(matchId: string, platform: string) {
  const matchDto = await MatchApi.getMatch(matchId, platform);
  return dtoToMatch(matchDto);
}

export default { getLast10MatchesId, getMatch };
