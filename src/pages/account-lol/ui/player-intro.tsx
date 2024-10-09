import Image from "next/image";
import { MdDoNotDisturb } from "react-icons/md";

import { getAccountByExternalId } from "@/src/entities/account";
import {
  getAccount,
  getSummoner,
  getSummonerIconUrl,
} from "@/src/entities/lol";
import { getPlayerOptions } from "@/src/entities/player";
import { AddButton } from "./add-button";

interface PlayerIntroProps {
  name: string;
  tag: string;
  platform: string;
}

export async function PlayerIntro({ name, tag, platform }: PlayerIntroProps) {
  const account = await getAccount(name, tag, platform);
  if (!account.id) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-4">
        <MdDoNotDisturb />
        <div>Account not found</div>
      </div>
    );
  }

  const summoner = await getSummoner(account.id, platform);
  const coreAccount = await getAccountByExternalId("lol", account.id);
  const playerOptions = await getPlayerOptions();

  return (
    <div className="flex flex-col justify-center rounded-md bg-neutral-700 p-4">
      <Image
        src={getSummonerIconUrl(summoner.iconId)}
        width={120}
        height={120}
        className="mx-auto rounded-full"
        alt={account.name}
      />
      <div className="text-center">
        <p className="text-lg font-semibold">{decodeURI(account.name)}</p>
        <p className="truncate text-neutral-300">Level: {summoner.level}</p>
        {!coreAccount && (
          <p className="mt-2 truncate text-sm leading-5">
            <AddButton
              gameName={name}
              tag={tag}
              platform={platform}
              players={playerOptions}
            />
          </p>
        )}
      </div>
    </div>
  );
}
