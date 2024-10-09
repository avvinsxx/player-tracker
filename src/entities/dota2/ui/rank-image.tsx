import clsx from "clsx";
import Image from "next/image";

import { getRankImageName } from "../use-case/get-rank-image-name";

interface RankImageProps {
  leaderboard?: number | null;
  mmr?: number | null;
  viewType: "page" | "inTable";
}

export function RankImage({ leaderboard, mmr, viewType }: RankImageProps) {
  return (
    <div
      className={clsx("relative", {
        "inline-block": viewType === "inTable",
      })}
    >
      <Image
        src={`/img/dota2/rank/${getRankImageName({ leaderboard, mmr }).image}.png`}
        width={viewType === "page" ? 160 : 50}
        height={viewType === "page" ? 160 : 50}
        alt={(leaderboard ?? mmr)?.toString() ?? ""}
      />
      {leaderboard && (
        <div
          className={clsx("absolute left-0 right-0 text-center", {
            "bottom-0 text-[10px]": viewType === "inTable",
            "bottom-3 text-xl": viewType === "page",
          })}
        >
          {leaderboard}
        </div>
      )}
    </div>
  );
}
