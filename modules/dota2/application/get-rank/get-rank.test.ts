import { describe, expect, test, vitest } from "vitest";
import { getRank } from "./get-rank";

const mockPlayer = {
  id: 1,
  name: "name",
  avatar: "/avatar.png",
  avatarFull: "/avatarfull.png",
};

const mockGetPlayer = vitest.fn().mockResolvedValue(mockPlayer);

const mockGetLastRating = vitest.fn((playerId: number) =>
  Promise.resolve({
    playerId,
    dateTime: Date.parse("2018-10-01T12:09:48.843Z"),
    mmr: 3000,
  }),
);

const mockGetMmrImage = vitest.fn().mockReturnValue("archon-5");
const mockGetLeaderboardImage = vitest.fn().mockReturnValue("immortal-top-100");

const mockDependencies = {
  getPlayer: mockGetPlayer,
  getLastRating: mockGetLastRating,
  getMmrImage: mockGetMmrImage,
  getLeaderboardImage: mockGetLeaderboardImage,
};

describe("get rank", () => {
  test("get leaderboard rank with image", async () => {
    mockGetPlayer.mockResolvedValueOnce({ ...mockPlayer, leaderboardRank: 33 });

    const { rank, image } = await getRank({ id: 1 }, mockDependencies);
    expect(rank).toEqual(33);
    expect(image).toEqual("immortal-top-100");
  });

  test("get mmr image", async () => {
    const { rank, image } = await getRank({ id: 1 }, mockDependencies);
    expect(rank).toEqual(undefined);
    expect(image).toEqual("archon-5");
  });
});
