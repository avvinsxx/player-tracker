import clsx from "clsx";
import Image from "next/image";
import { PiBackpack } from "react-icons/pi";

import { getLastMatchesParticipation } from "../api/get-last-matches-participation";

interface MatchesProps {
  playerId: number;
}

async function Matches({ playerId }: MatchesProps) {
  const {
    heroesConstants,
    gameModeConstants,
    itemConstants,
    lastMatchesPariticipation,
  } = await getLastMatchesParticipation({ id: playerId });

  return (
    <div className="rounded-md bg-neutral-700 p-4">
      <h2 className="text-center text-2xl">Match history</h2>
      <div className="mt-6">
        {lastMatchesPariticipation.map((match, index) => (
          <div
            key={index}
            className={clsx(
              "mb-2 flex max-h-[150px] rounded-md p-3 text-neutral-700",
              {
                "bg-[#ecf2ff]": match.win,
                "bg-[#fff1f3]": !match.win,
              },
            )}
          >
            <div className="my-auto flex flex-grow-[1] flex-col">
              <h3
                className={clsx({
                  "text-[#5383e8]": match.win,
                  "text-[#e84057]": !match.win,
                })}
              >
                {match.win ? "Win" : "Loose"} -{" "}
                {gameModeConstants[match.gameMode].name}
              </h3>
              <h3>
                {new Intl.DateTimeFormat(
                  // navigator?.languages[0] ??  // todo fix locale detection
                  "en-GB",
                  {
                    year: "numeric",
                    month: "2-digit",
                    day: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone, // todo timezone dynamic
                  },
                ).format(match.startTimestamp)}
              </h3>
              <div>
                {`${Math.floor(match.duration / 60)} min ${match.duration % 60} sec`}
              </div>
            </div>
            <div className="flex flex-grow-[5] items-center gap-2">
              <div className="relative">
                <Image
                  className="h-auto w-36"
                  src={`https://cdn.cloudflare.steamstatic.com/${heroesConstants[match.heroId].img}`}
                  width={256}
                  height={144}
                  alt={heroesConstants[match.heroId].name}
                />
                <div className="absolute bottom-0 right-0 w-6 bg-neutral-800 text-center text-neutral-200">
                  {match.level}
                </div>
              </div>
              <div className="flex h-full flex-col items-center justify-between">
                <div className="text-center">
                  <div className="text-lg">
                    {match.kills} /{" "}
                    <span className="text-[#e84057]">{match.deaths}</span> /{" "}
                    {match.assists}
                  </div>
                  <div className="text-sm leading-3 text-neutral-500">
                    {((match.kills + match.assists) / match.deaths).toFixed(2)}{" "}
                    KDA
                  </div>
                </div>
                <div className="flex gap-[2px]">
                  {match.items.map((item) =>
                    item ? (
                      <Image
                        className="w-10"
                        key={item}
                        src={`https://cdn.cloudflare.steamstatic.com/${itemConstants[item].img}`}
                        width={88}
                        height={64}
                        alt={`item-${item}`}
                      />
                    ) : (
                      <div
                        key={item}
                        className="h-[30px] w-10 bg-neutral-900"
                      ></div>
                    ),
                  )}
                  {match.neutralItem ? (
                    <Image
                      className="w-10 rounded-full"
                      src={`https://cdn.cloudflare.steamstatic.com/${itemConstants[match.neutralItem].img}`}
                      width={88}
                      height={64}
                      alt={`item-${match.neutralItem}`}
                    />
                  ) : (
                    <div className="h-[30px] w-10 rounded-full bg-neutral-900"></div>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-center">
                <div className="flex max-w-[104px] flex-wrap gap-1 bg-neutral-400 p-2 text-neutral-50">
                  <PiBackpack className="w-10 text-3xl" />
                  {match.backpack.map((item) =>
                    item ? (
                      <Image
                        className="w-10"
                        key={item}
                        src={`https://cdn.cloudflare.steamstatic.com/${itemConstants[item].img}`}
                        width={88}
                        height={64}
                        alt={`item-${item}`}
                      />
                    ) : (
                      <div
                        key={item}
                        className="h-[30px] w-10 bg-neutral-900"
                      ></div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Matches;
