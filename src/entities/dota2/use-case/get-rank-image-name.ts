import { getLeaderboardImage, getMmrImage } from "../lib/local-data";

interface getRankImageNameInput {
  leaderboard?: number | null;
  mmr?: number | null;
}

const dependencies = {
  getMmrImage: getMmrImage,
  getLeaderboardImage: getLeaderboardImage,
};

export function getRankImageName(
  { leaderboard, mmr }: getRankImageNameInput,
  { getMmrImage, getLeaderboardImage }: typeof dependencies = dependencies,
) {
  let image: string | undefined;
  if (!leaderboard) {
    image = getMmrImage(mmr);
  } else {
    image = getLeaderboardImage(leaderboard);
  }

  return { image };
}
