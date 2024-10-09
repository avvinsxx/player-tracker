"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { Button, Input } from "@/src/shared/ui";
import { loginAction, State } from "../api/login-action";

export default function Login() {
  const initialState: State = { errors: {} };
  const [state, formAction] = useFormState(loginAction, initialState);

  useEffect(() => {
    if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form action={formAction}>
      <Input
        label="Email"
        type="email"
        name="email"
        required
        errors={state.errors?.email}
      />
      <Input
        label="Password"
        type="password"
        name="password"
        required
        errors={state.errors?.password}
      />
      <Button className="w-full text-center" variant="primary">
        Log in
      </Button>
    </form>
  );
}
