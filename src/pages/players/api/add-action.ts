"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";

import { Player, savePlayer } from "@/src/entities/player";

const FormSchema = z.object({
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
    nickname?: string[];
    birthdate?: string[];
    role?: string[];
    game?: string[];
  };
  message?: string | null;
  success: boolean;
};

export async function addAction(
  prevState: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
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

  const { nickname, birthdate, game, role } = validatedFields.data;
  const newPlayer: Player = {
    nickname,
    mainGame: game || null,
    role,
  };
  if (birthdate) {
    newPlayer.birthdate = new Date(birthdate);
  }

  const saveResult = await savePlayer({ player: newPlayer });
  if (saveResult?.error) {
    return { message: saveResult?.error, success: false };
  }

  revalidatePath("/dashboard/players");
  return {
    success: true,
  };
}
