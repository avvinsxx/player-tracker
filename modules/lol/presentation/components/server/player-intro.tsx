import Image from "next/image";

import { getPlayerOptions } from "@/modules/core/application/get-player-options";
import CoreAccountService from "@/modules/core/infrastructure/account";
import { MdDoNotDisturb } from "react-icons/md";
import { getSummonerIconUrl } from "../../../domain/summoner/summoner";
import AccountService from "../../../infrastructure/account";
import SummonerService from "../../../infrastructure/summoner";
import AddButton from "../client/add-button/add-button";

interface PlayerIntroProps {
  name: string;
  tag: string;
  platform: string;
}

async function PlayerIntro({ name, tag, platform }: PlayerIntroProps) {
  const account = await AccountService.getAccount(name, tag, platform);
  if (!account.id) {
    return (
      <div className="flex flex-col items-center justify-center rounded-md bg-neutral-700 p-4">
        <MdDoNotDisturb />
        <div>Account not found</div>
      </div>
    );
  }

  const summoner = await SummonerService.getSummoner(account.id, platform);
  const coreAccount = await CoreAccountService.getAccountByExternalId(
    "lol",
    account.id,
  );
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

export default PlayerIntro;
