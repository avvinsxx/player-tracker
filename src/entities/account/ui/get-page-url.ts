import { Account } from "../model/account";

export function getPageUrl(account: Account) {
  if (account.game === "lol")
    return `/dashboard/accounts/lol/${account.name?.split("#")[0]}?tag=${account.name?.split("#")[1]}&platform=${account.platform}`;
  if (account.game === "dota2")
    return `/dashboard/accounts/dota2/${account.externalId}`;
  return "";
}
