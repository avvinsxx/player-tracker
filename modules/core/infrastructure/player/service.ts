import { Player } from "../../domain/player/player";
import { createClient } from "../serverClient";
import { dtoToPlayer, playerToInsertDto, playerToUpdateDto } from "./transform";

const PAGE_SIZE = 5;

async function getAllPlayers() {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("players")
    .select("id, nickname, birthdate, role")
    .order("id", { ascending: true });
  return error ? null : data?.map((p) => dtoToPlayer(p)) || [];
}

async function getPlayersByPage(query: string, currentPage: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("players")
    .select("id, nickname, birthdate, role, main_game")
    .range(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage - 1)
    .order("id", { ascending: true })
    .ilike("nickname", `%${query}%`);

  return error ? null : data?.map((p) => dtoToPlayer(p));
}

async function getPlayerByGameNickname(
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

async function createPlayer(player: Player) {
  const supabase = createClient();
  const { error } = await supabase
    .from("players")
    .insert(playerToInsertDto(player));
  return error;
}

async function updatePlayer(player: Player) {
  const playerDto = playerToUpdateDto(player);
  const supabase = createClient();
  const { error } = await supabase
    .from("players")
    .update(playerDto)
    .eq("id", playerDto.id);

  return error;
}

async function deletePlayer(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("players").delete().eq("id", id);

  return error;
}

async function getPlayersPages(query: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("players")
    .select("*", { count: "exact", head: true })
    .ilike("nickname", `%${query}%`);
  return Math.ceil((count || 1) / PAGE_SIZE);
}

export default {
  getAllPlayers,
  getPlayersByPage,
  getPlayerByGameNickname,
  createPlayer,
  getPlayersPages,
  updatePlayer,
  deletePlayer,
};
