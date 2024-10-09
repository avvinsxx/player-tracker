import { createAccount, getAccountByName } from "@/src/entities/account";
import {
  getAccount,
  getFirstLeague,
  getLast10MatchesId,
  getMatch,
  getSummoner,
} from "@/src/entities/lol";

interface SaveAccountInput {
  gameName: string;
  tag: string;
  platform: string;
  playerId?: number | null;
}

export const ErrorMessages = {
  AccountExists: "Account already added.",
  SupabaseError: "Supabase error: Failed to save account.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

const dependencies = {
  getAccountByName: getAccountByName,
  createAccount: createAccount,
  getAccount: getAccount,
  getLast10MatchesId: getLast10MatchesId,
  getMatch: getMatch,
  getSummoner: getSummoner,
  getFirstLeague: getFirstLeague,
};

export async function saveAccount(
  { gameName, tag, platform, playerId }: SaveAccountInput,
  {
    getAccountByName,
    createAccount,
    getAccount,
    getLast10MatchesId,
    getMatch,
    getSummoner,
    getFirstLeague,
  }: typeof dependencies = dependencies,
) {
  const accountName = `${gameName}#${tag}`;

  try {
    const existedAccount = await getAccountByName(accountName);
    if (existedAccount) {
      return { error: ErrorMessages.AccountExists };
    }

    const account = await getAccount(gameName, tag, platform);
    const matchesId = await getLast10MatchesId(account.id, platform);

    const fetchMatchPromises = [];
    for (const matchId of matchesId) {
      fetchMatchPromises.push(getMatch(matchId, platform));
    }
    const matches = await Promise.all(fetchMatchPromises);
    let winCount = 0;
    let looseCount = 0;
    for (const match of matches) {
      if (!match) continue;
      for (const participant of match.participants) {
        if (participant.puuid === account.id) {
          if (participant.win) {
            winCount++;
          } else {
            looseCount++;
          }
        }
      }
    }

    const summoner = await getSummoner(account.id, platform);

    const league = await getFirstLeague(summoner.id, platform);

    const error = await createAccount({
      name: accountName,
      level: summoner.level,
      game: "lol",
      externalId: account.id,
      tier: league.tier,
      rank: league.rank,
      winRate: (winCount / (winCount + looseCount)) * 100,
      winRateGames: winCount + looseCount,
      platform,
      refreshedAt: new Date(),
      playerId: playerId || null, // todo validate player
    });

    if (error) {
      console.error(error);
      return { error: ErrorMessages.SupabaseError };
    }
  } catch (error) {
    console.error(error);
    return { error: ErrorMessages.UnknownError };
  }
}
