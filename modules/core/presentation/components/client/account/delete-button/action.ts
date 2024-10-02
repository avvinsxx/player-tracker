"use server";

import { z } from "zod";

import { revalidatePath } from "next/cache";
import AccountService from "../../../../../infrastructure/account";

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

  const error = await AccountService.deleteAccount(id);
  if (error) {
    return { message: error.message };
  }

  revalidatePath("/dashboard/players");
  return {};
}
