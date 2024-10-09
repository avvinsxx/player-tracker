import { SearchResult } from "../../model";
import { SearchResultDto } from "./dto";

export function dtoToSearchResult(dto: SearchResultDto): SearchResult {
  return {
    id: dto.account_id,
    name: dto.personaname,
    avatar: dto.avatarfull,
    similarity: dto.similarity,
  };
}
