import { createClient } from "@/src/shared/api";

export async function deletePlayer(id: number) {
  const supabase = createClient();
  const { error } = await supabase.from("players").delete().eq("id", id);

  return error;
}
