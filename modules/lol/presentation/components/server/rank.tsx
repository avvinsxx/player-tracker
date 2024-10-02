import { MdDoNotDisturb } from "react-icons/md";
import { getRank } from "../../../application/get-rank/get-rank";
import RankImage from "./rank-image";

interface RankProps {
  name: string;
  tag: string;
  platform: string;
}

async function Rank({ name, tag, platform }: RankProps) {
  const league = await getRank({ name, tag, platform });

  return (
    <div className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-4">
      {league.tier ? (
        <RankImage tier={league.tier} rank={league.rank} viewType="page" />
      ) : (
        <>
          <MdDoNotDisturb />
          <div>Ranked data not found</div>
        </>
      )}
    </div>
  );
}

export default Rank;
