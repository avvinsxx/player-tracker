import { search as searchApi } from "./api";
import { dtoToSearchResult } from "./transform";

export async function getFirstSearchResult(name: string, search = searchApi) {
  const searchResultDtos = await search(name);

  return dtoToSearchResult(searchResultDtos[0]);
}
