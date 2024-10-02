import leaderboardMap from "../../data/leaderboard-image";
import mmrMap from "../../data/mmr-image";

function getMmrImage(mmr?: number | null) {
  let mmrImage = "unranked";
  if (mmr)
    mmrMap.forEach((image, imageMmr) => {
      if (mmrImage === "unranked" && mmr >= Number(imageMmr)) {
        mmrImage = image;
      }
    });
  return mmrImage;
}

function getLeaderboardImage(rank: number) {
  let rankImage = "immortal-placed";
  if (rank)
    leaderboardMap.forEach((image, imageRank) => {
      if (rankImage === "immortal-placed" && rank >= Number(imageRank)) {
        rankImage = image;
      }
    });
  return rankImage;
}

export default { getMmrImage, getLeaderboardImage };
