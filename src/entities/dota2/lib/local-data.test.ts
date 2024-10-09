import { describe, expect, test } from "vitest";
import { getLeaderboardImage, getMmrImage } from "./local-data";

describe("local data service", () => {
  test("get mmr image", () => {
    const imageName = getMmrImage(2000);
    expect(imageName).toEqual("crusader-3");
  });

  test("get leaderboard image", () => {
    const imageName = getLeaderboardImage(10);
    expect(imageName).toEqual("immortal-top-10");
  });
});
