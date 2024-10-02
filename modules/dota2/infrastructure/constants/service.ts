import ConstantApi from "./api";
import {
  dtoToGameModeConstants,
  dtoToHeroConstants,
  dtoToItemConstants,
} from "./transform";

async function getHeroesConstants(api = ConstantApi) {
  const heroesConstantsDto = await api.getHeroesConstants();

  return dtoToHeroConstants(heroesConstantsDto);
}

async function getGameModeConstants(api = ConstantApi) {
  const gameModeConstantDto = await api.getGameModeConstants();
  return dtoToGameModeConstants(gameModeConstantDto);
}

async function getItemConstants(api = ConstantApi) {
  const itemConstantDto = await api.getItemConstants();
  return dtoToItemConstants(itemConstantDto);
}

export default {
  getHeroesConstants,
  getGameModeConstants,
  getItemConstants,
};
