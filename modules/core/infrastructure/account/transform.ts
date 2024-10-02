import { Account } from "../../domain/account/account";
import { dtoToPlayer } from "../player/transform";
import { AccountDto, InsertAccountDto, UpdateAccountDto } from "./dto";

export function accountToUpdateDto(account: Account): UpdateAccountDto {
  if (!account.id) {
    throw new Error("Account id required.");
  }
  return {
    id: account.id,
    name: account.name,
    level: account.level,
    game: account.game,
    external_id: account.externalId,
    tier: account.tier,
    rank: account.rank,
    win_rate: Math.round(account.winRate ?? 0),
    win_rate_games: account.winRateGames,
    platform: account.platform,
    refreshed_at: account.refreshedAt?.toISOString(),
    player_id: account.playerId,
  };
}

export function accountToInsertDto(account: Account): InsertAccountDto {
  if (!account.externalId) {
    throw new Error("Account externalId required.");
  }
  if (!account.game) {
    throw new Error("Account game required.");
  }
  if (!account.name) {
    throw new Error("Account name required.");
  }
  return {
    name: account.name,
    level: account.level,
    game: account.game,
    external_id: account.externalId,
    tier: account.tier,
    rank: account.rank,
    win_rate: Math.round(account.winRate ?? 0),
    win_rate_games: account.winRateGames,
    platform: account.platform,
    refreshed_at: account.refreshedAt?.toISOString(),
    player_id: account.playerId,
    leaderboard: account.leaderboard,
    mmr: account.mmr,
  };
}

export function dtoToAccount(account: AccountDto): Account {
  const accountDomain: Account = {
    id: account.id,
    name: account.name,
    level: account.level,
    game: account.game,
    externalId: account.external_id,
    tier: account.tier,
    rank: account.rank,
    winRate: Math.round(account.win_rate ?? 0),
    winRateGames: account.win_rate_games,
    platform: account.platform,
    refreshedAt: account.refreshed_at ? new Date(account.refreshed_at) : null,
    playerId: account.player_id,
    leaderboard: account.leaderboard,
    mmr: account.mmr,
  };

  if (account.players) {
    accountDomain.player = dtoToPlayer(account.players);
  }

  return accountDomain;
}
