import { createClient } from "@/src/shared/api";
import { Player } from "../model/player";
import { playerToInsertDto } from "./transform";

export async function createPlayer(player: Player) {
  const supabase = createClient();
  const { error } = await supabase
    .from("players")
    .insert(playerToInsertDto(player));
  return error;
}
