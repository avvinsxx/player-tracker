"use client";

import { ButtonHTMLAttributes, useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiTrashSimpleBold } from "react-icons/pi";

import { Button } from "@/src/shared/ui";
import { deletAction, State } from "../api/delete-action";

interface DeleteButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  playerId: number;
}

export function DeleteButton({ playerId, ...rest }: DeleteButtonProps) {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(deletAction, initialState);

  useEffect(() => {
    if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form className="flex" action={formAction}>
      <input type="hidden" name="id" value={playerId} />
      <Button variant="secondary" {...rest}>
        <PiTrashSimpleBold size={16} />
      </Button>
    </form>
  );
}
