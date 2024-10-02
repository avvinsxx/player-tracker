import { describe, expect, test, vitest } from "vitest";
import { getLastMatchesParticipation } from "./get-last-matches-participation";

const mockGet10LastMatches = vitest.fn((playerId: number) =>
  Promise.resolve([
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
  ]),
);

const mockGetHeroesConstants = vitest.fn().mockResolvedValue({
  "2": { name: "Anti-Mage", img: "/hero.png?" },
  "3": { name: "test", img: "/hero2.png?" },
  "5": { name: "Hero 5", img: "/hero5.png?" },
});

const mockGetGameModeConstants = vitest.fn().mockResolvedValue({
  "0": {
    name: "Unknown",
  },
  "1": {
    name: "All pick",
  },
  "2": {
    name: "Captains mode",
  },
});

const mockGetItemConstants = vitest.fn().mockResolvedValue({
  "1": {
    img: "/apps/dota2/images/dota_react/items/blink.png?t=1593393829403",
  },
  "3": {
    img: "/apps/dota2/images/dota_react/items/broadsword.png?t=1593393829403",
  },
});

const mockGetMatch = vitest.fn().mockResolvedValue({
  id: 1,
  gameMode: 22,
  players: [
    {
      id: 1,
      heroId: 3,
      level: 15,
      items: [32, 33, 34, 35, 36, 37],
      backpack: [50, 51, 52],
      neutralItem: 90,
      win: true,
      kills: 4,
      deaths: 1,
      assists: 10,
      startTimestamp: 1724932614 * 1000,
      duration: 4500,
      gameMode: 22,
    },
    {
      id: 2,
      heroId: 3,
      level: 15,
      items: [42, 43, 44, 45, 46, 47],
      backpack: [60, 61, 62],
      neutralItem: 93,
      win: true,
      kills: 4,
      deaths: 1,
      assists: 10,
      startTimestamp: 1724932614 * 1000,
      duration: 4500,
      gameMode: 22,
    },
  ],
});

const mockDependencies = {
  get10LastMatches: mockGet10LastMatches,

  getHeroesConstants: mockGetHeroesConstants,
  getGameModeConstants: mockGetGameModeConstants,
  getItemConstants: mockGetItemConstants,

  getMatch: mockGetMatch,
};

describe("get last matches participation", () => {
  test("get last matches participation with constants", async () => {
    const {
      lastMatchesPariticipation,
      heroesConstants,
      gameModeConstants,
      itemConstants,
    } = await getLastMatchesParticipation({ id: 1 }, mockDependencies);
    expect(lastMatchesPariticipation).toEqual([
      {
        id: 1,
        heroId: 3,
        level: 15,
        items: [32, 33, 34, 35, 36, 37],
        backpack: [50, 51, 52],
        neutralItem: 90,
        win: true,
        kills: 4,
        deaths: 1,
        assists: 10,
        startTimestamp: 1724932614 * 1000,
        duration: 4500,
        gameMode: 22,
      },
      {
        id: 1,
        heroId: 3,
        level: 15,
        items: [32, 33, 34, 35, 36, 37],
        backpack: [50, 51, 52],
        neutralItem: 90,
        win: true,
        kills: 4,
        deaths: 1,
        assists: 10,
        startTimestamp: 1724932614 * 1000,
        duration: 4500,
        gameMode: 22,
      },
      {
        id: 1,
        heroId: 3,
        level: 15,
        items: [32, 33, 34, 35, 36, 37],
        backpack: [50, 51, 52],
        neutralItem: 90,
        win: true,
        kills: 4,
        deaths: 1,
        assists: 10,
        startTimestamp: 1724932614 * 1000,
        duration: 4500,
        gameMode: 22,
      },
    ]);
    expect(heroesConstants).toEqual({
      "2": { name: "Anti-Mage", img: "/hero.png?" },
      "3": { name: "test", img: "/hero2.png?" },
      "5": { name: "Hero 5", img: "/hero5.png?" },
    });
    expect(gameModeConstants).toEqual({
      "0": {
        name: "Unknown",
      },
      "1": {
        name: "All pick",
      },
      "2": {
        name: "Captains mode",
      },
    });

    expect(itemConstants).toEqual({
      "1": {
        img: "/apps/dota2/images/dota_react/items/blink.png?t=1593393829403",
      },
      "3": {
        img: "/apps/dota2/images/dota_react/items/broadsword.png?t=1593393829403",
      },
    });
  });
});
