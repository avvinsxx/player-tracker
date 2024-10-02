"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiSignOutBold } from "react-icons/pi";

import { action, State } from "./action";

export default function Logout() {
  const initialState: State = {};
  const [state, formAction] = useFormState(action, initialState);

  useEffect(() => {
    if (state.message) toast.error(state.message);
  }, [state]);

  return (
    <form className="flex" action={formAction}>
      <button>
        <PiSignOutBold />
      </button>
    </form>
  );
}
