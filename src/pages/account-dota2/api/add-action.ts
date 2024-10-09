"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { saveAccount } from "./save-account";

const FormSchema = z.object({
  id: z.coerce.number(),
  playerId: z.coerce.number().nullish(),
});

export type State = {
  errors?: {
    id?: string[];
    playerId?: string[];
  };
  message?: string | null;
};

export async function addAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    id: formData.get("id"),
    playerId: formData.get("playerId"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { playerId, id } = validatedFields.data;

  const saveResult = await saveAccount({ id, playerId });
  if (saveResult?.error) {
    return { message: saveResult?.error };
  }

  revalidatePath("/dashboard/accounts");
  redirect("/dashboard/accounts");
}
