"use server";

import { z } from "zod";

import { revalidatePath } from "next/cache";

import { deleteAccount } from "@/src/entities/account";

const FormSchema = z.object({
  id: z.coerce.number(),
});

export type State = {
  errors?: {
    id?: string[];
  };
  message?: string | null;
};

export async function deleteAction(
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

  const error = await deleteAccount(id);
  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard/players");
  return {};
}
