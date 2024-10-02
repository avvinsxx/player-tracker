import { MatchDto } from "./dto";

async function getMatch(id: number): Promise<MatchDto> {
  const matchResponse = await fetch(
    `https://api.opendota.com/api/matches/${id}`,
    { method: "GET", cache: "no-store" },
  );
  return await matchResponse.json();
}

export default { getMatch };
