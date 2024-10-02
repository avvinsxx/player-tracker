import { Account } from "../../domain";
import { AccountDto } from "./dto";

export function dtoToAccount(account: AccountDto): Account {
  return {
    id: account.puuid,
    name: account.gameName,
    tag: account.tagLine,
  };
}
