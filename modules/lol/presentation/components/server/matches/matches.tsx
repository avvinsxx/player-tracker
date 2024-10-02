import clsx from "clsx";
import Image from "next/image";

import { MdDoNotDisturb } from "react-icons/md";

import { getLastMatchesParticipation } from "../../../../application/get-last-matches-participation";

interface MatchesProps {
  name: string;
  tag: string;
  platform: string;
}

async function Matches({ name, tag, platform }: MatchesProps) {
  const matchParticipations = await getLastMatchesParticipation({
    name,
    tag,
    platform,
  });

  return (
    <div className="rounded-md bg-neutral-700 p-4">
      <h2 className="text-center text-2xl">Match history</h2>
      <div className="mt-6">
        {matchParticipations.length ? (
          matchParticipations.map((match, index) => (
            <div
              key={index}
              className={clsx("mb-2 flex rounded-md p-3 text-neutral-700", {
                "bg-[#ecf2ff]": match.win,
                "bg-[#fff1f3]": !match.win,
              })}
            >
              <div className="my-auto flex flex-grow-[1] flex-col">
                <h3
                  className={clsx({
                    "text-[#5383e8]": match.win,
                    "text-[#e84057]": !match.win,
                  })}
                >
                  {match.win ? "Win" : "Loose"} - {match.gameMode}
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
                      timeZone:
                        Intl.DateTimeFormat().resolvedOptions().timeZone, // todo timezone dynamic
                    },
                  ).format(match.startTimestamp)}{" "}
                </h3>
                <div>
                  {`${Math.floor(match.duration / 60)} min ${match.duration % 60} sec`}
                </div>
              </div>
              <div className="flex flex-grow-[5]">
                <div className="relative">
                  <Image
                    src={match.champion.iconUrl}
                    width={80}
                    height={80}
                    alt={match.champion.name}
                  />
                  <div className="absolute bottom-0 right-0 w-6 bg-neutral-800 text-center text-neutral-200">
                    {match.level}
                  </div>
                </div>
                <div className="px-2">
                  {match.summonerSpells.map(({ id, name, iconUrl }, index) => (
                    <div key={id} className={clsx({ "mb-1": index === 0 })}>
                      <Image src={iconUrl} width={38} height={38} alt={name} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col items-center justify-between">
                  <div className="text-center">
                    <div className="text-lg">
                      {match.kills} /{" "}
                      <span className="text-[#e84057]">{match.deaths}</span> /{" "}
                      {match.assists}
                    </div>
                    <div className="text-sm leading-3 text-neutral-500">
                      {match.kda.toFixed(2)} KDA
                    </div>
                  </div>
                  <div className="flex">
                    {match.items.map(({ id, iconUrl }) => (
                      <Image
                        key={id}
                        className="px-[1px]"
                        src={iconUrl}
                        width={32}
                        height={32}
                        alt={`item-${id}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center">
            <MdDoNotDisturb />
            <div>Matches not found</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Matches;
