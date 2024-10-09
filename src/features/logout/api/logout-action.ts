"use server";

import { createClient } from "@/src/shared/api";
import { redirect } from "next/navigation";

export type State = {
  message?: string;
};

export async function logoutAction(_: State): Promise<State> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      message: error.message,
    };
  }

  redirect("/login");
}
