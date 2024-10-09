import { Player } from "../model/player";
import { InsertPlayerDto, PlayerDto, UpdatePlayerDto } from "./types";

export function dtoToPlayer(player: PlayerDto): Player {
  return {
    id: player.id,
    nickname: player.nickname,
    birthdate: player.birthdate ? new Date(player.birthdate) : null,
    role: player.role,
    mainGame: player.main_game,
  };
}

export function playerToInsertDto(player: Player): InsertPlayerDto {
  if (!player.nickname) {
    throw new Error("Player nickname required.");
  }
  return {
    nickname: player.nickname,
    birthdate: player.birthdate?.toISOString(),
    role: player.role,
    main_game: player.mainGame,
  };
}

export function playerToUpdateDto(player: Player): UpdatePlayerDto {
  if (!player.id) {
    throw new Error("Player id required.");
  }
  return {
    id: player.id,
    nickname: player.nickname,
    birthdate: player.birthdate?.toISOString(),
    role: player.role,
    main_game: player.mainGame,
  };
}
