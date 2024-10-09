import { Account } from "../../model/account/account";
import { AccountDto } from "./dto";

export function dtoToAccount(account: AccountDto): Account {
  return {
    id: account.puuid,
    name: account.gameName,
    tag: account.tagLine,
  };
}
