import { describe, expect, test, vitest } from "vitest";
import PlayerService from "./service";

const mockPlayerApi = {
  getPlayer: vitest.fn((id: number) => {
    return Promise.resolve({
      profile: {
        account_id: id,
        personaname: "name",
        avatar: "/avatar.png",
        avatarfull: "/avatarfull.png",
      },
      leaderboard_rank: 300,
    });
  }),

  getRatings: vitest.fn((playerId: number) => {
    return Promise.resolve([
      {
        account_id: playerId,
        solo_competitive_rank: 2300,
        time: "2017-10-01T12:09:48.843Z",
      },
      {
        account_id: playerId,
        solo_competitive_rank: 2400,
        time: "2016-10-01T12:09:48.843Z",
      },

      {
        account_id: playerId,
        solo_competitive_rank: 2200,
        time: "2018-10-01T12:09:48.843Z",
      },
    ]);
  }),

  getRecentMatches: vitest.fn((playerId: number) => {
    return Promise.resolve([
      {
        match_id: 2,
        radiant_win: true,
        player_slot: 127,
      },
      {
        match_id: 555,
        radiant_win: true,
        player_slot: 127,
      },
      {
        match_id: 444,
        radiant_win: false,
        player_slot: 127,
      },
    ]);
  }),

  getPlayerHeroes: vitest.fn((playerId: number) => {
    return Promise.resolve([
      {
        hero_id: 3,
        games: 10,
        win: 5,
      },
      {
        hero_id: 2,
        games: 8,
        win: 4,
      },
      {
        hero_id: 6,
        games: 6,
        win: 3,
      },
      {
        hero_id: 33,
        games: 4,
        win: 3,
      },
    ]);
  }),
  getPlayerWL: vitest.fn((playerId: number) => {
    return Promise.resolve({
      win: 10,
      lose: 10,
    });
  }),
};

describe("player service", () => {
  test("get player", async () => {
    const player = await PlayerService.getPlayer(1, mockPlayerApi);

    expect(player).toEqual({
      id: 1,
      name: "name",
      avatar: "/avatar.png",
      avatarFull: "/avatarfull.png",
      leaderboardRank: 300,
    });
  });

  test("get last rating", async () => {
    const ratings = await PlayerService.getLastRating(1, mockPlayerApi);

    expect(ratings).toEqual({
      playerId: 1,
      dateTime: Date.parse("2018-10-01T12:09:48.843Z"),
      mmr: 2200,
    });
  });

  test("get 10 last matches", async () => {
    const recentMatches = await PlayerService.get10LastMatches(
      1,
      mockPlayerApi,
    );

    expect(recentMatches).toEqual([
      {
        id: 2,
        win: true,
      },
      {
        id: 555,
        win: true,
      },
      {
        id: 444,
        win: false,
      },
    ]);
  });

  test("get 3 favourite heroes", async () => {
    const favouriteHeroes = await PlayerService.get3FavouriteHeroes(
      1,
      mockPlayerApi,
    );

    expect(favouriteHeroes).toEqual([
      {
        heroId: 3,
        games: 10,
        win: 5,
      },
      {
        heroId: 2,
        games: 8,
        win: 4,
      },
      {
        heroId: 6,
        games: 6,
        win: 3,
      },
    ]);
  });

  test("get wl", async () => {
    const wl = await PlayerService.getWl(1, mockPlayerApi);

    expect(wl).toEqual({
      lose: 10,
      win: 10,
    });
  });
});
