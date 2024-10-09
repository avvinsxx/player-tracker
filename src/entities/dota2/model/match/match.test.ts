import { describe, expect, test } from "vitest";
import { getPlayerFromMatchById } from "./match";

const mockMatch = {
  id: 1,
  gameMode: 22,
  players: [
    {
      id: 1,
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
    {
      id: 2,
      heroId: 12,
      level: 13,
      items: [6, 7, 8, 9, 10, 11],
      backpack: [50, 51, 52],
      neutralItem: 90,
      win: false,
      kills: 5,
      deaths: 0,
      assists: 10,
      startTimestamp: 1724932614 * 1000,
      duration: 3381,
      gameMode: 22,
    },
  ],
};

describe("match domain", () => {
  test("get player from match by id", () => {
    const player = getPlayerFromMatchById(mockMatch, 2);
    expect(player).toEqual({
      id: 2,
      heroId: 12,
      level: 13,
      items: [6, 7, 8, 9, 10, 11],
      backpack: [50, 51, 52],
      neutralItem: 90,
      win: false,
      kills: 5,
      deaths: 0,
      assists: 10,
      startTimestamp: 1724932614 * 1000,
      duration: 3381,
      gameMode: 22,
    });
  });
});
