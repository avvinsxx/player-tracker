import { ButtonHTMLAttributes } from "react";
import { RefreshButtonDota2 } from "./refresh-button-dota2";
import { RefreshButtonLol } from "./refresh-button-lol";

interface RefreshButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  game: "lol" | "dota2";
  accountId: number;
}

export function RefreshButton({
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
