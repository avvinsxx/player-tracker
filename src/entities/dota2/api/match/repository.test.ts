import { describe, expect, test, vitest } from "vitest";
import { getMatch } from "./repository";

const getMatchMock = vitest.fn((id: number) => {
  return Promise.resolve({
    match_id: id,
    game_mode: 22,
    players: [
      {
        account_id: 2,
        hero_id: 55,
        level: 12,
        item_0: 1,
        item_1: 2,
        item_2: 3,
        item_3: 4,
        item_4: 5,
        item_5: 6,
        backpack_0: 40,
        backpack_1: 41,
        backpack_2: 42,
        item_neutral: 80,
        win: 1,
        kda: 3.4,
        kills: 5,
        deaths: 0,
        assists: 10,
        start_time: 1724932614,
        duration: 3381,
        game_mode: 22,
      },
    ],
  });
});

describe("match service", () => {
  test("get match", async () => {
    const matchResult = await getMatch(3, getMatchMock);

    expect(matchResult).toEqual({
      id: 3,
      gameMode: 22,
      players: [
        {
          id: 2,
          heroId: 55,
          level: 12,
          items: [1, 2, 3, 4, 5, 6],
          backpack: [40, 41, 42],
          neutralItem: 80,
          win: true,
          kills: 5,
          deaths: 0,
          assists: 10,
          startTimestamp: 1724932614 * 1000,
          duration: 3381,
          gameMode: 22,
        },
      ],
    });
  });
});
