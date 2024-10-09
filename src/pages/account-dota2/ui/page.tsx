import { Suspense } from "react";

import { getWl } from "@/src/entities/dota2";
import { CardFallback } from "@/src/shared/ui";
import { WinrateChart } from "@/src/shared/ui/winrate-chart";

import { FavCharacters } from "./fav-characters";
import Matches from "./matches";
import { PlayerIntro } from "./player-intro";
import { Rank } from "./rank";

interface PageProps {
  params: { id: string };
}

export async function Page({ params }: PageProps) {
  const id = Number(params.id);

  const wr = await getWl(id);

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
