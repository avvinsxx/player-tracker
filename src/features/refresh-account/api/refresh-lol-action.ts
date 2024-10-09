"use server";

import { revalidatePath } from "next/cache";

import { refreshAccountLol } from "./refresh-account-lol";

export type State = {
  message?: string | null;
};

export async function refreshLolAction(id: number): Promise<State> {
  const result = await refreshAccountLol({ id });
  if (result?.error) {
    return { message: result?.error };
  }

  revalidatePath("/dashboard/accounts");
  return {};
}
