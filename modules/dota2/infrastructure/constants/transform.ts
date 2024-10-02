import {
  GameModeConstants,
  HeroConstants,
  ItemConstants,
} from "@/modules/dota2/domain";
import {
  GameModeConstantsDto,
  HeroConstantsDto,
  ItemConstantsDto,
} from "./dto";

export function dtoToHeroConstants(dto: HeroConstantsDto): HeroConstants {
  const constants: HeroConstants = {};
  for (const heroId in dto) {
    constants[heroId] = {
      name: dto[heroId].localized_name,
      img: dto[heroId].img,
    };
  }
  return constants;
}

export function dtoToGameModeConstants(
  dto: GameModeConstantsDto,
): GameModeConstants {
  const constants: GameModeConstants = {};
  for (const gameModeId in dto) {
    const gameModeRaw = dto[gameModeId].name
      .split("game_mode_")[1]
      .split("_")
      .join(" ");
    const gameMode = gameModeRaw[0].toUpperCase() + gameModeRaw.slice(1);
    constants[gameModeId] = {
      name: gameMode,
    };
  }
  return constants;
}

export function dtoToItemConstants(dto: ItemConstantsDto): ItemConstants {
  const constants: ItemConstants = {};
  for (const itemName in dto) {
    constants[dto[itemName].id] = { img: dto[itemName].img };
  }
  return constants;
}
