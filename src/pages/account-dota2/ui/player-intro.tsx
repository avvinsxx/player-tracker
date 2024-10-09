import Image from "next/image";

import { getAccountByExternalId } from "@/src/entities/account";
import { getPlayer } from "@/src/entities/dota2";
import { getPlayerOptions } from "@/src/entities/player";
import AddButton from "./add-button";

interface PlayerIntroProps {
  playerId: number;
}

export async function PlayerIntro({ playerId }: PlayerIntroProps) {
  const player = await getPlayer(playerId);

  const coreAccount = await getAccountByExternalId(
    "dota2",
    playerId.toString(),
  );
  const playerOptions = await getPlayerOptions();

  return (
    <div className="flex flex-col justify-center rounded-md bg-neutral-700 p-4">
      <Image
        src={player.avatarFull}
        width={120}
        height={120}
        className="mx-auto rounded-full"
        alt={player.name}
      />
      <div className="text-center">
        <p className="text-lg font-semibold">{decodeURI(player.name)}</p>
        {!coreAccount && (
          <p className="mt-2 truncate text-sm leading-5">
            <AddButton id={playerId} players={playerOptions} />
          </p>
        )}
      </div>
    </div>
  );
}
