import { getMatch as getMatchApi } from "./api";
import { dtoToMatch } from "./transform";

export async function getMatch(id: number, getMatch = getMatchApi) {
  const matchDto = await getMatch(id);
  return dtoToMatch(matchDto);
}
