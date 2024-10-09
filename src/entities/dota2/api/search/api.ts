import { SearchResultDto } from "./dto";

export async function search(name: string): Promise<SearchResultDto[]> {
  const searchResponse = await fetch(
    `https://api.opendota.com/api/search?q=${name}`,
    { method: "GET", cache: "no-store" },
  );
  return await searchResponse.json();
}
