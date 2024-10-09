import { getAccount, getFirstLeague, getSummoner } from "@/src/entities/lol";

interface GetRankInput {
  name: string;
  tag: string;
  platform: string;
}

const dependencies = {
  getAccount: getAccount,
  getSummoner: getSummoner,
  getFirstLeague: getFirstLeague,
};

export async function getRank(
  { name, tag, platform }: GetRankInput,
  {
    getAccount,
    getSummoner,
    getFirstLeague,
  }: typeof dependencies = dependencies,
) {
  const result = {
    tier: null,
    rank: null,
  };
  const account = await getAccount(name, tag, platform);
  if (!account.id) {
    return result;
  }
  const summoner = await getSummoner(account.id, platform);
  const league = await getFirstLeague(summoner.id, platform);

  return league;
}
