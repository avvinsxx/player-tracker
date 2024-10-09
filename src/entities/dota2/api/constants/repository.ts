import {
  getGameModeConstants as getGameModeConstantsApi,
  getHeroesConstants as getHeroesConstantsApi,
  getItemConstants as getItemConstantsApi,
} from "./api";
import {
  dtoToGameModeConstants,
  dtoToHeroConstants,
  dtoToItemConstants,
} from "./transform";

export async function getHeroesConstants(
  getHeroesConstants = getHeroesConstantsApi,
) {
  const heroesConstantsDto = await getHeroesConstants();

  return dtoToHeroConstants(heroesConstantsDto);
}

export async function getGameModeConstants(
  getGameModeConstants = getGameModeConstantsApi,
) {
  const gameModeConstantDto = await getGameModeConstants();
  return dtoToGameModeConstants(gameModeConstantDto);
}

export async function getItemConstants(getItemConstants = getItemConstantsApi) {
  const itemConstantDto = await getItemConstants();
  return dtoToItemConstants(itemConstantDto);
}
