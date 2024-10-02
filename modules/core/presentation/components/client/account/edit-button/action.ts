"use server";

import { z } from "zod";
import AccountService from "../../../../../infrastructure/account";

const FormSchema = z.object({
  playerId: z.coerce.number().nullish(),
  accountId: z.coerce.number(),
});

export type State = {
  errors?: {
    playerId?: string[];
    accountId?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function action(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    playerId: formData.get("playerId"),
    accountId: formData.get("accountId"),
  });

  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Fields error.",
    };
  }

  const { playerId, accountId } = validatedFields.data;
  const error = await AccountService.updateAccount({ id: accountId, playerId });
  if (error) {
    return { success: false, message: error.message };
  }

  return { success: true };
}
