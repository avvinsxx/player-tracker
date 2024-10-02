import CoreAccountService from "@/modules/core/infrastructure/account";
import AccountService from "../../infrastructure/account";
import LeagueService from "../../infrastructure/league";
import SummonerService from "../../infrastructure/summoner";

interface RefreshAccountInput {
  id: number;
}

export const ErrorMessages = {
  AccountNotFound: "Account not found.",
  PlatformEmpty: "Platform is empty.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

const dependencies = {
  getAccountById: CoreAccountService.getAccountById,
  updateAccount: CoreAccountService.updateAccount,
  getAccount: AccountService.getAccount,
  getFirstLeague: LeagueService.getFirstLeague,
  getSummoner: SummonerService.getSummoner,
};

export async function refreshAccount(
  { id }: RefreshAccountInput,
  {
    getAccountById,
    getAccount,
    getSummoner,
    getFirstLeague,
    updateAccount,
  }: typeof dependencies = dependencies,
) {
  const account = await getAccountById(id);
  if (!account) {
    return { error: ErrorMessages.AccountNotFound };
  }

  if (!account.platform) {
    return { error: ErrorMessages.PlatformEmpty };
  }

  const [gameName, tag] = account.name.split("#");

  const lolAccount = await getAccount(gameName, tag, account.platform);
  if (!lolAccount.id)
    return { error: "Riot API error: Failed to find riot account." };

  const summoner = await getSummoner(lolAccount.id, account.platform);

  const league = await getFirstLeague(summoner.id, account.platform);

  try {
    const error = await updateAccount({
      id,
      level: summoner.level,
      tier: league.tier ?? null,
      rank: league.rank ?? null,
      refreshedAt: new Date(),
    });
    if (error) {
      return { error: error.message };
    }
  } catch (err) {
    console.error(err);
    let error: string = ErrorMessages.UnknownError;
    if (err instanceof Error) {
      error = err.message;
    }
    return { error };
  }
}
