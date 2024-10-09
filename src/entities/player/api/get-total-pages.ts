import { createClient } from "@/src/shared/api";

const PAGE_SIZE = 5;

export async function getTotalPages(query: string) {
  const supabase = createClient();

  const { count, error } = await supabase
    .from("players")
    .select("*", { count: "exact", head: true })
    .ilike("nickname", `%${query}%`);
  return Math.ceil((count || 1) / PAGE_SIZE);
}
