import { differenceInYears } from "date-fns";

import { getPlayersByPage } from "@/src/entities/player";
import { InputGroup } from "@/src/shared/ui";
import { DeleteButton } from "./delete-button";
import { EditButton } from "./edit-button";

export async function Table({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const players = await getPlayersByPage(query, currentPage);

  return (
    <div className="mt-2 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-neutral-700 p-2 pt-0">
          <table className="min-w-full">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  Nickname
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Main game
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Role
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Age
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3"></th>
              </tr>
            </thead>
            <tbody className="bg-neutral-600">
              {players && players.length > 0 ? (
                players.map((rec) => (
                  <tr
                    key={rec.id}
                    className="w-full border-b border-neutral-700 py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                  >
                    <td className="whitespace-nowrap px-4 py-5">
                      {rec.nickname}
                    </td>
                    <td className="whitespace-nowrap px-4 py-5">
                      {rec.mainGame}
                    </td>
                    <td className="whitespace-nowrap px-3 py-5">{rec.role}</td>
                    <td className="whitespace-nowrap px-3 py-5">
                      {rec.birthdate &&
                        `${differenceInYears(new Date(), rec.birthdate)} y.o.`}
                    </td>

                    <td className="whitespace-nowrap py-3 pl-6 pr-3">
                      <div className="flex justify-end">
                        <InputGroup>
                          <DeleteButton playerId={rec.id!} />
                          <EditButton player={rec} />
                        </InputGroup>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
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
