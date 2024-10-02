import { Account } from "../../domain/account/account";
import { createClient } from "../serverClient";
import {
  accountToInsertDto,
  accountToUpdateDto,
  dtoToAccount,
} from "./transform";

const PAGE_SIZE = 5;

async function getAccountsByPage(query: string, currentPage: number) {
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

async function getAccountsPages(query: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("accounts")
    .select("*", { count: "exact", head: true })
    .ilike("name", `%${query}%`);
  return error ? 0 : Math.ceil((count || 1) / PAGE_SIZE);
}

async function getPlayersAccountCount(id: number) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("accounts")
    .select("*", { count: "exact", head: true })
    .eq("player_id", id);
  return count && !error ? count : 0;
}

async function getAccountById(id: number) {
  const supabase = createClient();
  const { data, error } = await supabase
    .from("accounts")
    .select("id, platform, name, external_id")
    .eq("id", id);

  return error ? null : data[0];
}

async function getAccountByName(name: string) {
  const supabase = createClient();
  const { data: accountsFromDB, error: accountsFromDBError } = await supabase
    .from("accounts")
    .select("id")
    .eq("name", name);

  return accountsFromDBError ? null : accountsFromDB[0];
}

async function getAccountByExternalId(game: "lol" | "dota2", id: string) {
  const supabase = createClient();
  const { data: accountsFromDB, error: accountsFromDBError } = await supabase
    .from("accounts")
    .select("id")
    .eq("external_id", id)
    .eq("game", game);

  return accountsFromDBError ? null : accountsFromDB[0];
}

async function createAccount(account: Account) {
  const supabase = createClient();
  const { error } = await supabase
    .from("accounts")
    .insert(accountToInsertDto(account));
  return error;
}

async function updateAccount(account: Account) {
  const accountDto = accountToUpdateDto(account);
  const supabase = createClient();
  const { error } = await supabase
    .from("accounts")
    .update(accountDto)
    .eq("id", accountDto.id);

  return error;
}

async function deleteAccount(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("accounts").delete().eq("id", id);

  return error;
}

export default {
  getAccountById,
  getAccountByName,
  getAccountByExternalId,
  createAccount,
  updateAccount,
  getAccountsPages,
  getAccountsByPage,
  getPlayersAccountCount,
  deleteAccount,
};
