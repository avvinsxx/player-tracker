"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { Player, updatePlayer } from "@/src/entities/player";

const FormSchema = z.object({
  id: z.coerce.number(),
  nickname: z.string().min(3, "Nickname must contain at least 3 characters"),
  birthdate: z.union([z.string().nullish(), z.string().date()]),
  game: z.union([
    z.enum(["lol", "dota2"], {
      invalid_type_error: "Please select a game.",
    }),
    z.literal(""),
  ]),
  role: z.string().nullish(),
});

export type State = {
  errors?: {
    id?: string[];
    nickname?: string[];
    birthdate?: string[];
    role?: string[];
    game?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function editAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    id: formData.get("id"),
    nickname: formData.get("nickname"),
    birthdate: formData.get("birthdate"),
    game: formData.get("game"),
    role: formData.get("role"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "You have errors in fields.",
      success: false,
    };
  }

  const { id, nickname, birthdate, game, role } = validatedFields.data;
  const player: Player = {
    id,
    nickname,
    mainGame: game || null,
    role,
  };
  if (birthdate) {
    player.birthdate = new Date(birthdate);
  }

  const error = await updatePlayer(player);
  if (error) {
    console.error(error);
    return {
      message: "Supabase error: Failed to update player.",
      success: false,
    };
  }

  revalidatePath("/dashboard/players");
  return {
    success: true,
  };
}
