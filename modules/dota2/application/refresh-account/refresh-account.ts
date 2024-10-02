import CoreAccountService from "@/modules/core/infrastructure/account";
import PlayerService from "../../infrastructure/player";

interface RefreshAccountInput {
  id: number;
}

export const ErrorMessages = {
  AccountNotFound: "Account not found.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

const dependencies = {
  getAccountById: CoreAccountService.getAccountById,
  updateAccount: CoreAccountService.updateAccount,
  getPlayer: PlayerService.getPlayer,
  getLastRating: PlayerService.getLastRating,
  getWl: PlayerService.getWl,
};

export async function refreshAccount(
  { id }: RefreshAccountInput,
  {
    getAccountById,
    updateAccount,
    getPlayer,
    getLastRating,
    getWl,
  }: typeof dependencies = dependencies,
) {
  const account = await getAccountById(id);
  if (!account) {
    return { error: ErrorMessages.AccountNotFound };
  }

  const player = await getPlayer(Number(account.external_id));
  const lastRating = await getLastRating(Number(account.external_id));
  const wr = await getWl(Number(account.external_id));

  try {
    const error = await updateAccount({
      id,
      leaderboard: player.leaderboardRank ?? null,
      mmr: lastRating?.mmr ?? null,
      winRate: (wr.win / (wr.win + wr.lose)) * 100,
      winRateGames: wr.win + wr.lose,
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
