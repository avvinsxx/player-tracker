import { Suspense } from "react";

import WinrateChart from "@/modules/core/presentation/components/client/winrate-chart";
import CardFallback from "@/modules/core/presentation/components/server/card-fallback";
import PlayerService from "@/modules/dota2/infrastructure/player";
import FavCharacters from "@/modules/dota2/presentation/components/server/fav-characters";
import Matches from "@/modules/dota2/presentation/components/server/matches";
import PlayerIntro from "@/modules/dota2/presentation/components/server/player-intro";
import Rank from "@/modules/dota2/presentation/components/server/rank";

export default async function Page({ params }: { params: { id: string } }) {
  const id = Number(params.id);

  const wr = await PlayerService.getWl(id);

  return (
    <div>
      <h1 className="mb-3 text-2xl">Dota 2 Account </h1>
      <div className="grid grid-cols-[15%_15%_1fr_2fr] gap-4 pb-4">
        <Suspense fallback={<CardFallback />}>
          <PlayerIntro playerId={id} />
        </Suspense>
        <Suspense fallback={<CardFallback />}>
          <Rank playerId={id} />
        </Suspense>
        <Suspense fallback={<CardFallback />}>
          <WinrateChart wins={wr.win} looses={wr.lose} />
        </Suspense>
        <Suspense fallback={<CardFallback />}>
          <FavCharacters playerId={id} />
        </Suspense>
      </div>
      <Suspense fallback={<CardFallback />}>
        <Matches playerId={id} />
      </Suspense>
    </div>
  );
}
