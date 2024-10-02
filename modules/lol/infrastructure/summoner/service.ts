import SummonerApi from "./api";
import { dtoToSummoner } from "./transform";

async function getSummoner(puuid: string, platfrom: string, api = SummonerApi) {
  const summonerDto = await api.getSummoner(puuid, platfrom);
  return dtoToSummoner(summonerDto);
}

export default { getSummoner };
