import CoreAccountService from "@/modules/core/infrastructure/account";
import PlayerService from "../../infrastructure/player";

interface SaveAccountInput {
  id: number;
  playerId?: number | null;
}

export const ErrorMessages = {
  AccountExists: "Account already added.",
  SupabaseError: "Supabase error: Failed to save account.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

const dependencies = {
  getPlayer: PlayerService.getPlayer,
  getLastRating: PlayerService.getLastRating,
  getWl: PlayerService.getWl,
  getAccountByExternalId: CoreAccountService.getAccountByExternalId,
  createAccount: CoreAccountService.createAccount,
};

export async function saveAccount(
  { id, playerId }: SaveAccountInput,
  {
    getPlayer,
    getLastRating,
    getWl,
    getAccountByExternalId,
    createAccount,
  }: typeof dependencies = dependencies,
) {
  try {
    const player = await getPlayer(id);

    const existedAccount = await getAccountByExternalId("dota2", id.toString());
    if (existedAccount) {
      return { error: ErrorMessages.AccountExists };
    }
    const lastRating = await getLastRating(id);
    const wr = await getWl(id);

    const error = await createAccount({
      name: player.name,
      game: "dota2",
      externalId: player.id.toString(),
      leaderboard: player.leaderboardRank ?? null,
      mmr: lastRating?.mmr ?? null,
      winRate: (wr.win / (wr.win + wr.lose)) * 100,
      winRateGames: wr.win + wr.lose,
      refreshedAt: new Date(),
      playerId: playerId || null,
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
