import { createClient } from "@/src/shared/api";
import { dtoToPlayer } from "./transform";

export async function getAllPlayers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("players")
    .select("id, nickname, birthdate, role")
    .order("id", { ascending: true });
  return error ? null : data?.map((p) => dtoToPlayer(p)) || [];
}
