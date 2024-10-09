import Image from "next/image";

import { getTierIconUrl } from "../model/summoner/summoner";

interface RankImageProps {
  tier: string | null;
  rank: string | null;
  viewType: "page" | "inTable";
}

export function RankImage({ tier, rank, viewType }: RankImageProps) {
  return (
    tier && (
      <Image
        src={getTierIconUrl(tier)}
        width={viewType === "page" ? 160 : 50}
        height={viewType === "page" ? 160 : 50}
        alt={tier}
        title={`${tier} ${rank}`}
      />
    )
  );
}
