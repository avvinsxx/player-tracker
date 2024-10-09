import {
  PlayerDto,
  PlayerHeroDto,
  PlayerWlDto,
  RatingDto,
  RecentMatchDto,
} from "./dto";

export async function getPlayer(id: number): Promise<PlayerDto> {
  const playerResponse = await fetch(
    `https://api.opendota.com/api/players/${id}`,
    { method: "GET", cache: "no-store" },
  );
  return await playerResponse.json();
}

export async function getRatings(playerId: number): Promise<RatingDto[]> {
  const ratingsResponse = await fetch(
    `https://api.opendota.com/api/players/${playerId}/ratings`,
    { method: "GET", cache: "no-store" },
  );
  return await ratingsResponse.json();
}

export async function getRecentMatches(
  playerId: number,
): Promise<RecentMatchDto[]> {
  const matchesResponse = await fetch(
    `https://api.opendota.com/api/players/${playerId}/recentMatches`,
    { method: "GET", cache: "no-store" },
  );
  return await matchesResponse.json();
}

export async function getPlayerHeroes(
  playerId: number,
): Promise<PlayerHeroDto[]> {
  const playerHeroesResponse = await fetch(
    `https://api.opendota.com/api/players/${playerId}/heroes`,
    { method: "GET", cache: "no-store" },
  );
  return await playerHeroesResponse.json();
}

export async function getPlayerWL(playerId: number): Promise<PlayerWlDto> {
  const playerWlResponse = await fetch(
    `https://api.opendota.com/api/players/${playerId}/wl`,
    { method: "GET", cache: "no-store" },
  );
  return await playerWlResponse.json();
}
