import PlayerService from "@/modules/core/infrastructure/player";

const dependencies = {
  getAllPlayers: PlayerService.getAllPlayers,
};

export async function getPlayerOptions({
  getAllPlayers,
}: typeof dependencies = dependencies) {
  const players = await getAllPlayers();
  if (!players) return [];
  const playerOptions = players?.map((player) => ({
    label: player.nickname,
    value: player.id!.toString(),
  }));

  return playerOptions;
}
