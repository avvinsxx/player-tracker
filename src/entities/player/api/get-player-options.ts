import { SearchInputOption } from "@/src/shared/ui";
import { getAllPlayers } from "./get-all-players";

export async function getPlayerOptions(): Promise<SearchInputOption[]> {
  const players = await getAllPlayers();
  if (!players) return [];
  return players.map((player) => {
    return {
      label: player.nickname || "",
      value: player.id!.toString(),
    };
  });
}
