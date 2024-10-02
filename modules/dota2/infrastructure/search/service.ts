import SearchApi from "./api";
import { dtoToSearchResult } from "./transform";

async function getFirstSearchResult(name: string, api = SearchApi) {
  const searchResultDtos = await api.search(name);

  return dtoToSearchResult(searchResultDtos[0]);
}

export default { getFirstSearchResult };
