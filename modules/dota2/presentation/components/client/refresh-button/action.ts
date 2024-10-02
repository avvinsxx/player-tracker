"use server";

import { revalidatePath } from "next/cache";
import { refreshAccount } from "../../../../application/refresh-account";

export type State = {
  message?: string | null;
};

export async function action(id: number): Promise<State> {
  const result = await refreshAccount({ id });
  if (result?.error) {
    return { message: result?.error };
  }

  revalidatePath("/dashboard/accounts");
  return {};
}
