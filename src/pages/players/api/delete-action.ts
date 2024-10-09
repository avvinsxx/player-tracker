"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { getPlayersAccountCount } from "@/src/entities/account";
import { deletePlayer } from "@/src/entities/player";

const FormSchema = z.object({
  id: z.coerce.number(),
});

export type State = {
  errors?: {
    id?: string[];
  };
  message?: string | null;
};

export async function deletAction(
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
  const accountsCount = await getPlayersAccountCount(id);
  if (accountsCount > 0) {
    return {
      message: "You should first remove accounts related with player",
    };
  }

  const error = await deletePlayer(id);
  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard/players");
  return {};
}
