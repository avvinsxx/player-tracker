"use server";

import { redirect } from "next/navigation";

import { createClient } from "@/modules/core/infrastructure/serverClient";

export type State = {
  message?: string;
  success?: boolean;
};

export async function action(_: State): Promise<State> {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    return {
      message: error.message,
      success: false,
    };
  }

  redirect("/login");
}
