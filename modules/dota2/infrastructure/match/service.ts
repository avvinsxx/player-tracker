import MatchApi from "./api";
import { dtoToMatch } from "./transform";

async function getMatch(id: number, api = MatchApi) {
  const matchDto = await api.getMatch(id);
  return dtoToMatch(matchDto);
}

export default { getMatch };
