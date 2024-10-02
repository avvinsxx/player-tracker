import Image from "next/image";

import { getTierIconUrl } from "@/modules/lol/domain/summoner/summoner";

interface RankImageProps {
  tier: string | null;
  rank: string | null;
  viewType: "page" | "inTable";
}

export default function RankImage({ tier, rank, viewType }: RankImageProps) {
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
