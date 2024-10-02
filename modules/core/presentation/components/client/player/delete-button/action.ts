"use server";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import AccountService from "../../../../../infrastructure/account";
import PlayerService from "../../../../../infrastructure/player";

const FormSchema = z.object({
  id: z.coerce.number(),
});

export type State = {
  errors?: {
    id?: string[];
  };
  message?: string | null;
};

export async function action(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    id: formData.get("id"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "You have errors in fields.",
    };
  }

  const { id } = validatedFields.data;
  const accountsCount = await AccountService.getPlayersAccountCount(id);
  if (accountsCount > 0) {
    return {
      message: "You should first remove accounts related with player",
    };
  }

  const error = await PlayerService.deletePlayer(id);
  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard/players");
  return {};
}
