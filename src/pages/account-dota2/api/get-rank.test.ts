import { describe, expect, test, vitest } from "vitest";
import { getRank } from "./get-rank";

const mockGetPlayer = vitest.fn().mockResolvedValue({
  id: 1,
  name: "name",
  avatar: "/avatar.png",
  avatarFull: "/avatarfull.png",
  leaderboardRank: 33,
});

const mockGetLastRating = vitest.fn().mockResolvedValue({
  playerId: 1,
  dateTime: Date.parse("2018-10-01T12:09:48.843Z"),
  mmr: 3000,
});

const mockDependencies = {
  getPlayer: mockGetPlayer,
  getLastRating: mockGetLastRating,
};

describe("get rank", () => {
  test("get leaderboard and mmr", async () => {
    const { leaderboard, mmr } = await getRank({ id: 1 }, mockDependencies);

    expect(leaderboard).toEqual(33);
    expect(mmr).toEqual(3000);
  });
  test("get leaderboard and empty mmr", async () => {
    mockGetLastRating.mockResolvedValueOnce(null);

    const { leaderboard, mmr } = await getRank({ id: 1 }, mockDependencies);

    expect(leaderboard).toEqual(33);
    expect(mmr).toEqual(null);
  });
});
