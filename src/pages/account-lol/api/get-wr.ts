import { getAccount, getLast10MatchesId, getMatch } from "@/src/entities/lol";
import { ensure } from "@/src/shared/lib";

interface GetWrInput {
  name: string;
  tag: string;
  platform: string;
}

const dependencies = {
  getAccount: getAccount,
  getLast10MatchesId: getLast10MatchesId,
  getMatch: getMatch,
};

export async function getWr(
  { name, tag, platform }: GetWrInput,
  {
    getAccount,
    getLast10MatchesId,
    getMatch,
  }: typeof dependencies = dependencies,
) {
  const result = { win: 0, loose: 0 };
  const account = await getAccount(name, tag, platform);
  if (!account.id) return result;
  const matchesId = await getLast10MatchesId(account.id, platform);

  const fetchMatchPromises = [];

  for (const matchId of matchesId) {
    fetchMatchPromises.push(getMatch(matchId, platform));
  }

  const matches = await Promise.all(fetchMatchPromises);

  for (const match of matches) {
    if (!match) continue;
    const participant = ensure(
      match.participants.find(
        (participant) => participant.puuid === account.id,
      ),
    );
    if (participant.win) {
      result.win++;
    } else {
      result.loose++;
    }
  }
  return result;
}
