import { describe, expect, test } from "vitest";
import LocalDataService from "./service";

describe("local data service", () => {
  test("get mmr image", () => {
    const imageName = LocalDataService.getMmrImage(2000);
    expect(imageName).toEqual("crusader-3");
  });

  test("get leaderboard image", () => {
    const imageName = LocalDataService.getLeaderboardImage(10);
    expect(imageName).toEqual("immortal-top-10");
  });
});
