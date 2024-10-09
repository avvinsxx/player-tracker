import { describe, expect, test, vitest } from "vitest";
import {
  getGameModeConstants,
  getHeroesConstants,
  getItemConstants,
} from "./repository";

const getHeroesConstantsMock = vitest.fn().mockResolvedValue({
  "2": {
    localized_name: "Anti-Mage",
    img: "/hero.png?",
  },
  "3": {
    localized_name: "test",
    img: "/hero2.png?",
  },
  "5": {
    localized_name: "Hero 5",
    img: "/hero5.png?",
  },
});
const getGameModeConstantsMock = vitest.fn().mockResolvedValue({
  "0": {
    name: "game_mode_unknown",
  },
  "1": {
    name: "game_mode_all_pick",
  },
  "2": {
    name: "game_mode_captains_mode",
  },
});
const getItemConstantsMock = vitest.fn().mockResolvedValue({
  blink: {
    id: 1,
    img: "/apps/dota2/images/dota_react/items/blink.png?t=1593393829403",
  },
  broadsword: {
    id: 3,
    img: "/apps/dota2/images/dota_react/items/broadsword.png?t=1593393829403",
  },
});

describe("constant service", () => {
  test("get heroes constants", async () => {
    const heroesConstantsResult = await getHeroesConstants(
      getHeroesConstantsMock,
    );

    expect(heroesConstantsResult).toEqual({
      "2": { name: "Anti-Mage", img: "/hero.png?" },
      "3": { name: "test", img: "/hero2.png?" },
      "5": { name: "Hero 5", img: "/hero5.png?" },
    });
  });

  test("get game mode constants", async () => {
    const gameModesConstantsResult = await getGameModeConstants(
      getGameModeConstantsMock,
    );
    expect(gameModesConstantsResult).toEqual({
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
  });

  test("get item constants", async () => {
    const itemConstantsResult = await getItemConstants(getItemConstantsMock);

    expect(itemConstantsResult).toEqual({
      "1": {
        img: "/apps/dota2/images/dota_react/items/blink.png?t=1593393829403",
      },
      "3": {
        img: "/apps/dota2/images/dota_react/items/broadsword.png?t=1593393829403",
      },
    });
  });
});
