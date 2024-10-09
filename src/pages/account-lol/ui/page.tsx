import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getAccount } from "@/src/entities/lol";
import { CardFallback, PageHeader } from "@/src/shared/ui";
import { WinrateChart } from "@/src/shared/ui/winrate-chart";

import { getWr } from "../api/get-wr";
import { ChampionsMastery } from "./champions-mastery";
import { Matches } from "./matches";
import { PlayerIntro } from "./player-intro";
import { Rank } from "./rank";

interface PageProps {
  searchParams: {
    tag: string;
    platform: string;
  };
  params: { name: string };
}

export async function Page({ searchParams, params }: PageProps) {
  const name = decodeURIComponent(params.name);
  const { tag, platform } = searchParams;

  try {
    const account = await getAccount(name, tag, platform);
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
