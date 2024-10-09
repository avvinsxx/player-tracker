import { describe, expect, test, vitest } from "vitest";
import { getFirstSearchResult } from "./repository";

const searchApi = vitest.fn((name: string) => {
  return Promise.resolve([
    {
      account_id: 34,
      personaname: name,
      avatarfull: "/avatarfull1.png",
      last_match_time: "2024-09-05T16:48:24.000Z",
      similarity: 3.5,
    },
    {
      account_id: 777,
      personaname: name + "2",
      avatarfull: "/avatarfull2.png",
      last_match_time: "2023-09-05T16:48:24.000Z",
      similarity: 2,
    },
  ]);
});

describe("search service", () => {
  test("get first search result", async () => {
    const searchResult = await getFirstSearchResult("test", searchApi);

    expect(searchResult).toEqual({
      id: 34,
      name: "test",
      avatar: "/avatarfull1.png",
      similarity: 3.5,
    });
  });
});
