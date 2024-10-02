import RankImageDota2 from "@/modules/dota2/presentation/components/server/rank-image";
import RankImage from "@/modules/lol/presentation/components/server/rank-image";

interface RankProps {
  game: "lol" | "dota2";
  data: { tier: string | null; rank: string | null } & {
    leaderboard: number | null;
    mmr: number | null;
  };
}

export default function Rank({ game, data }: RankProps) {
  if (game === "lol") {
    return <RankImage tier={data.tier} rank={data.rank} viewType="inTable" />;
  }
  if (game === "dota2") {
    return (
      <RankImageDota2
        leaderboard={data.leaderboard}
        mmr={data.mmr}
        viewType="inTable"
      />
    );
  }
  return null;
}
