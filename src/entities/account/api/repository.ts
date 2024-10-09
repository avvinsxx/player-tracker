import { createClient } from "@/src/shared/api";
import { Account } from "../model/account";
import { accountToInsertDto, accountToUpdateDto } from "./transform";

export async function updateAccount(account: Account) {
  const accountDto = accountToUpdateDto(account);
  const supabase = createClient();
  const { error } = await supabase
    .from("accounts")
    .update(accountDto)
    .eq("id", accountDto.id);

  return error;
}

const PAGE_SIZE = 5;

export async function getTotalPages(query: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("accounts")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);
  return error ? 0 : Math.ceil((count || 1) / PAGE_SIZE);
}

export async function getPlayersAccountCount(id: number) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("accounts")
    .select("*", { count: "exact", head: true })
    .eq("player_id", id);
  return count && !error ? count : 0;
}

import { dtoToAccount } from "./transform";

export async function getAccountsByPage(query: string, currentPage: number) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("accounts")
    .select(
      "id, name, level, game, tier, rank, platform, refreshed_at, leaderboard, mmr, external_id, win_rate, players (nickname)",
    )
    .range(PAGE_SIZE * (currentPage - 1), PAGE_SIZE * currentPage - 1)
    .order("id", { ascending: true })
    .ilike("name", `%${query}%`);

  return data?.map((acc) => dtoToAccount(acc));
}

export async function getAccountByExternalId(
  game: "lol" | "dota2",
  id: string,
) {
  const supabase = createClient();
  const { data: accountsFromDB, error: accountsFromDBError } = await supabase
    .from("accounts")
    .select("id")
    .eq("external_id", id)
    .eq("game", game);

  return accountsFromDBError ? null : accountsFromDB[0];
}

export async function deleteAccount(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("accounts").delete().eq("id", id);

  return error;
}

export async function createAccount(account: Account) {
  const supabase = createClient();
  const { error } = await supabase
    .from("accounts")
    .insert(accountToInsertDto(account));
  return error;
}

export async function getAccountByName(name: string) {
  const supabase = createClient();
  const { data: accountsFromDB, error: accountsFromDBError } = await supabase
    .from("accounts")
    .select("id")
    .eq("name", name);

  return accountsFromDBError ? null : accountsFromDB[0];
}

export async function getAccountById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("accounts")
    .select("id, platform, name, external_id")
    .eq("id", id);

  return error ? null : data[0];
}
