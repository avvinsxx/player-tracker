"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

import { login } from "@/src/shared/api";

export type State = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
};

const FormSchema = z.object({
  email: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email."),
  password: z.string().min(1, { message: "This field has to be filled." }),
});

export async function loginAction(
  _: State,
  formData: FormData,
): Promise<State> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Fields error.",
    };
  }
  const { email, password } = validatedFields.data;

  const error = await login(email, password);
  if (error) {
    return {
      message: error,
    };
  }

  revalidatePath("/", "layout");
  redirect("/dashboard");
}
