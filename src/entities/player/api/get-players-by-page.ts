import { createClient } from "@/src/shared/api";
import { dtoToPlayer } from "./transform";

const PAGE_SIZE = 5;

export async function getPlayersByPage(query: string, currentPage: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("players")
    .select("id, nickname, birthdate, role, main_game")
    .range(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage - 1)
    .order("id", { ascending: true })
    .ilike("nickname", `%${query}%`);

  return error ? null : data?.map((p) => dtoToPlayer(p));
}
