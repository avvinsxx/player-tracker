import {
  GameModeConstantsDto,
  HeroConstantsDto,
  ItemConstantsDto,
} from "./dto";

async function getHeroesConstants(): Promise<HeroConstantsDto> {
  const constantResponse = await fetch(
    `https://api.opendota.com/api/constants/heroes`,
    { method: "GET" },
  );
  return await constantResponse.json();
}

async function getGameModeConstants(): Promise<GameModeConstantsDto> {
  const constantResponse = await fetch(
    `https://api.opendota.com/api/constants/game_mode`,
    { method: "GET" },
  );

  return await constantResponse.json();
}

async function getItemConstants(): Promise<ItemConstantsDto> {
  const constantResponse = await fetch(
    `https://api.opendota.com/api/constants/items`,
    { method: "GET" },
  );

  return await constantResponse.json();
}

export default {
  getHeroesConstants,
  getGameModeConstants,
  getItemConstants,
};
