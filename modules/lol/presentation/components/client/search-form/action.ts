"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import AccountService from "../../../../infrastructure/account";
import LocalDataService from "../../../../infrastructure/local-data";
import SummonerService from "../../../../infrastructure/summoner";

const [firstPlatfrom, ...otherPlatforms] = Object.keys(
  LocalDataService.getAllPlatforms(),
);

const FormSchema = z.object({
  tag: z.string().min(1, "Please enter game tag."),
  gameName: z.string().min(1, "Please enter game name."),
  platform: z.enum([firstPlatfrom, ...otherPlatforms], {
    invalid_type_error: "Please select a region.",
  }),
});

export type State = {
  errors?: {
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

  const { gameName, tag, platform } = validatedFields.data;

  try {
    const account = await AccountService.getAccount(gameName, tag, platform);
    if (!account?.id) {
      return { message: "Riot API error: Failed to find riot account." };
    }
    const summoner = await SummonerService.getSummoner(account.id, platform);
    if (!summoner?.id) {
      return { message: "Riot API error: Failed to find summoner." };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Riot API error: Failed to find riot account.",
    };
  }

  revalidatePath(
    `/dashboard/accounts/lol/${encodeURI(gameName)}?tag=${tag}&platform=${platform}`,
  );
  redirect(
    `/dashboard/accounts/lol/${encodeURI(gameName)}?tag=${tag}&platform=${platform}`,
  );
}
