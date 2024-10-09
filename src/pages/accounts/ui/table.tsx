import { formatDistance } from "date-fns";
import Image from "next/image";

import { getAccountsByPage, getPageUrl } from "@/src/entities/account";
import { getPlayerOptions } from "@/src/entities/player";
import { RefreshButton } from "@/src/features/refresh-account";
import { InputGroup, Link } from "@/src/shared/ui";

import DeleteButton from "./delete-button";
import { EditButton } from "./edit-button";
import Rank from "./rank";

export default async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const accounts = await getAccountsByPage(query, currentPage);
  const playerOptions = await getPlayerOptions();

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-neutral-700 p-2">
          <table className="min-w-full">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  Game
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Level
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Rank
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  WR
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Player
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Last Refresh
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3"></th>
              </tr>
            </thead>
            <tbody className="bg-neutral-600">
              {accounts && accounts.length > 0 ? (
                accounts?.map((rec) => (
                  <tr
                    key={rec.id}
                    className="w-full border-b border-neutral-700 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <Image
                        src={`/img/games/${rec.game}.png`}
                        width={30}
                        height={30}
                        alt={rec.game ?? "game icon"}
                        title={rec.game}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <p>
                        <Link href={getPageUrl(rec)}>{rec.name}</Link>
                      </p>
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">{rec.level}</td>
                    <td className="whitespace-nowrap px-3 py-3">
                      <Rank
                        game={rec.game!}
                        data={{
                          tier: rec.tier!,
                          rank: rec.rank!,
                          leaderboard: rec.leaderboard!,
                          mmr: rec.mmr!,
                        }}
                      />
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {rec.winRate != null ? `${rec.winRate}%` : ""}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {rec.player?.nickname}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3">
                      {rec.refreshedAt &&
                        formatDistance(rec.refreshedAt, new Date(), {
                          addSuffix: true,
                        })}
                    </td>
                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end">
                        <InputGroup>
                          <DeleteButton accountId={rec.id!} />
                          <EditButton
                            accountId={rec.id!}
                            playerOptions={playerOptions}
                          />
                          <RefreshButton game={rec.game!} accountId={rec.id!} />
                        </InputGroup>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="w-full rounded-md border-b border-neutral-700 py-3 text-center text-sm"
                  >
                    No records{" "}
                    {query && (
                      <>
                        for{" "}
                        <span className="font-bold">&quot;{query}&quot;</span>
                      </>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
