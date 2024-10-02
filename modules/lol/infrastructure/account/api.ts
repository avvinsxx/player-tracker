import { getRegionBaseUrl } from "../client";
import { AccountDto } from "./dto";

async function getAccount(
  name: string,
  tag: string,
  platform: string,
): Promise<AccountDto> {
  const url = new URL(getRegionBaseUrl(platform));
  url.pathname = `/riot/account/v1/accounts/by-riot-id/${name}/${tag}`;

  const accountResponse = await fetch(url, {
    method: "GET",
    cache: "no-store",
  });
  return await accountResponse.json();
}

export default { getAccount };
