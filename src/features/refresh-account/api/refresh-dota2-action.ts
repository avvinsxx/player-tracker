"use server";

import { revalidatePath } from "next/cache";
import { refreshAccountDota2 } from "./refresh-account-dota2";

export type State = {
  message?: string | null;
};

export async function refreshDota2Action(id: number): Promise<State> {
  const result = await refreshAccountDota2({ id });
  if (result?.error) {
    return { message: result?.error };
  }

  revalidatePath("/dashboard/accounts");
  return {};
}
