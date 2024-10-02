"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { SearchResult } from "@/modules/dota2/domain";
import SearchService from "../../../../infrastructure/search";

const FormSchema = z.object({
  name: z.string().min(1, "Please enter game name."),
});

export type State = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export async function action(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    name: formData.get("name"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields.",
    };
  }

  const { name } = validatedFields.data;

  let playerSearch: SearchResult;
  try {
    playerSearch = await SearchService.getFirstSearchResult(name);
    if (!playerSearch || !playerSearch.id) {
      return {
        message: "Dota2 API error: Failed to find DOTA 2 account.",
      };
    }
  } catch (error) {
    console.error(error);
    return {
      message: "Dota2 API error: Failed to find DOTA 2 account.",
    };
  }

  revalidatePath(`/dashboard/accounts/dota2/${playerSearch.id}`);
  redirect(`/dashboard/accounts/dota2/${playerSearch.id}`);
}
