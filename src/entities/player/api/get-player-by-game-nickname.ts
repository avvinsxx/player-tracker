import { createClient } from "@/src/shared/api";
import { dtoToPlayer } from "./transform";

export async function getPlayerByGameNickname(
  game: "lol" | "dota2",
  nickname: string,
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("players")
    .select("id")
    .eq("nickname", nickname)
    .eq("game", game)
    .single();

  return error ? null : dtoToPlayer(data);
}
