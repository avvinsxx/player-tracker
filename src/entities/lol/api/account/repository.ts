import { getAccount as getAccountApi } from "./api";
import { dtoToAccount } from "./transform";

export async function getAccount(
  name: string,
  tag: string,
  platform: string,
  getAccount = getAccountApi,
) {
  const accountDto = await getAccount(name, tag, platform);
  return dtoToAccount(accountDto);
}
