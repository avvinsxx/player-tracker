import { createClient } from "@/src/shared/api";
import { Player } from "../model/player";
import { playerToUpdateDto } from "./transform";

export async function updatePlayer(player: Player) {
  const playerDto = playerToUpdateDto(player);
  const supabase = createClient();
  const { error } = await supabase
    .from("players")
    .update(playerDto)
    .eq("id", playerDto.id);

  return error;
}
