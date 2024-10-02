import { describe, expect, test, vitest } from "vitest";
import ConstantsService from "./service";

const mockConstantApi = {
  getHeroesConstants: vitest.fn().mockResolvedValue({
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
  }),

  getGameModeConstants: vitest.fn().mockResolvedValue({
    "0": {
      name: "game_mode_unknown",
    },
    "1": {
      name: "game_mode_all_pick",
    },
    "2": {
      name: "game_mode_captains_mode",
    },
  }),
  getItemConstants: vitest.fn().mockResolvedValue({
    blink: {
      id: 1,
      img: "/apps/dota2/images/dota_react/items/blink.png?t=1593393829403",
    },
    broadsword: {
      id: 3,
      img: "/apps/dota2/images/dota_react/items/broadsword.png?t=1593393829403",
    },
  }),
};

describe("constant service", () => {
  test("get heroes constants", async () => {
    const heroesConstantsResult =
      await ConstantsService.getHeroesConstants(mockConstantApi);

    expect(heroesConstantsResult).toEqual({
      "2": { name: "Anti-Mage", img: "/hero.png?" },
      "3": { name: "test", img: "/hero2.png?" },
      "5": { name: "Hero 5", img: "/hero5.png?" },
    });
  });

  test("get game mode constants", async () => {
    const gameModesConstantsResult =
      await ConstantsService.getGameModeConstants(mockConstantApi);
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
    const itemConstantsResult =
      await ConstantsService.getItemConstants(mockConstantApi);

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
