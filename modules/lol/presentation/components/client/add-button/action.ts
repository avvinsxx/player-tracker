"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { saveAccount } from "../../../../application/save-account";
import LocalDataService from "../../../../infrastructure/local-data";

const [firstPlatfrom, ...otherPlatforms] = Object.keys(
  LocalDataService.getAllPlatforms(),
);

const FormSchema = z.object({
  playerId: z.coerce.number().nullish(),
  tag: z.string().min(1, "Please enter game tag."),
  gameName: z.string().min(1, "Please enter game name."),
  platform: z.enum([firstPlatfrom, ...otherPlatforms], {
    invalid_type_error: "Please select a region.",
  }),
});

export type State = {
  errors?: {
    playerId?: string[];
    gameName?: string[];
    tag?: string[];
    platform?: string[];
  };
  message?: string | null;
};

export async function action(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    playerId: formData.get("playerId"),
    tag: formData.get("tag"),
    gameName: formData.get("gameName"),
    platform: formData.get("platform"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { gameName, tag, platform, playerId } = validatedFields.data;
  const saveResult = await saveAccount({ gameName, tag, platform, playerId });
  if (saveResult?.error) {
    return { message: saveResult?.error };
  }
  revalidatePath("/dashboard/accounts");
  redirect("/dashboard/accounts");
}
