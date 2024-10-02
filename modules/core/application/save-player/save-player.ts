import { Player } from "../../domain/player/player";
import PlayerService from "../../infrastructure/player";

interface SavePlayerInput {
  player: Player;
}

export const ErrorMessages = {
  PlayerExists: "Player already added.",
  SupabaseError: "Supabase error: Failed to save account.",
  UnknownError: "An unknown error occurred. Please try again later.",
} as const;

const dependencies = {
  getPlayerByGameNickname: PlayerService.getPlayerByGameNickname,
  createPlayer: PlayerService.createPlayer,
};

export async function savePlayer(
  { player: newPlayer }: SavePlayerInput,
  { getPlayerByGameNickname, createPlayer }: typeof dependencies = dependencies,
) {
  try {
    const player = await getPlayerByGameNickname(
      newPlayer.mainGame!,
      newPlayer.nickname!,
    );

    if (player) {
      return { error: ErrorMessages.PlayerExists };
    }

    const error = await createPlayer(newPlayer);
    if (error) {
      console.error(error);
      return {
        error: ErrorMessages.SupabaseError,
      };
    }
  } catch (error) {
    console.error(error);
    return { error: ErrorMessages.UnknownError };
  }
}
