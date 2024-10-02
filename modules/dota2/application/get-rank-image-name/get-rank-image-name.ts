import LocalDataService from "../../infrastructure/local-data";

interface getRankImageNameInput {
  leaderboard?: number | null;
  mmr?: number | null;
}

const dependencies = {
  getMmrImage: LocalDataService.getMmrImage,
  getLeaderboardImage: LocalDataService.getLeaderboardImage,
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
