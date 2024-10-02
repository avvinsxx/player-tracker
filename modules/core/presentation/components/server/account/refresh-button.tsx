import { ButtonHTMLAttributes } from "react";

import RefreshButtonDota2 from "@/modules/dota2/presentation/components/client/refresh-button/refresh-button";
import RefreshButtonLol from "@/modules/lol/presentation/components/client/refresh-button/refresh-button";

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  game: "lol" | "dota2";
  accountId: number;
}

export default function RefreshButton({
  game,
  accountId,
  ...rest
}: RefreshButtonProps) {
  if (game === "lol") {
    return <RefreshButtonLol accountId={accountId} {...rest} />;
  }

  if (game === "dota2") {
    return <RefreshButtonDota2 accountId={accountId} {...rest} />;
  }

  return null;
}
