import { notFound } from "next/navigation";
import { Suspense } from "react";

import WinrateChart from "@/modules/core/presentation/components/client/winrate-chart";
import CardFallback from "@/modules/core/presentation/components/server/card-fallback";
import PageHeader from "@/modules/core/presentation/components/server/page-header";
import { getWr } from "@/modules/lol/application/get-wr";
import AccountService from "@/modules/lol/infrastructure/account/service";
import ChampionsMastery from "@/modules/lol/presentation/components/server/champions-mastery";
import Matches from "@/modules/lol/presentation/components/server/matches/matches";
import PlayerIntro from "@/modules/lol/presentation/components/server/player-intro";
import Rank from "@/modules/lol/presentation/components/server/rank";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: {
    tag: string;
    platform: string;
  };
  params: { name: string };
}) {
  const name = decodeURIComponent(params.name);
  const { tag, platform } = searchParams;

  try {
    const account = await AccountService.getAccount(name, tag, platform);
  } catch (err) {
    console.error(err);
    notFound();
  }
  const { win, loose } = await getWr({ name, tag, platform });

  return (
    <div>
      <PageHeader>
        Leauge of Legends Account{" "}
        <span className="font-bold">
          {name}#{tag}
        </span>
      </PageHeader>
      <div className="grid grid-cols-[15%_15%_1fr_2fr] gap-4 pb-4">
        <Suspense fallback={<CardFallback />}>
          <PlayerIntro name={name} tag={tag} platform={platform} />
        </Suspense>
        <Suspense fallback={<CardFallback />}>
          <Rank name={name} tag={tag} platform={platform} />
        </Suspense>
        <Suspense fallback={<CardFallback />}>
          <WinrateChart wins={win} looses={loose} />
        </Suspense>
        <Suspense fallback={<CardFallback />}>
          <ChampionsMastery name={name} tag={tag} platform={platform} />
        </Suspense>
      </div>
      <Suspense fallback={<CardFallback />}>
        <Matches name={name} tag={tag} platform={platform} />
      </Suspense>
    </div>
  );
}
