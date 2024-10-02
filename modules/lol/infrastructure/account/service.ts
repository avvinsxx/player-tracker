import AccountApi from "./api";
import { dtoToAccount } from "./transform";

async function getAccount(
  name: string,
  tag: string,
  platform: string,
  api = AccountApi,
) {
  const accountDto = await api.getAccount(name, tag, platform);
  return dtoToAccount(accountDto);
}

export default {
  getAccount,
};
