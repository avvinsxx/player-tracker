"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import Button from "../../button";
import Input from "../../input";
import { action, State } from "./action";

export default function Login() {
  const initialState: State = { errors: {} };
  const [state, formAction] = useFormState(action, initialState);

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
