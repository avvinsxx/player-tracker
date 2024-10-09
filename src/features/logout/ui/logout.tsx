"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiSignOutBold } from "react-icons/pi";

import { logoutAction, State } from "../api/logout-action";

export function Logout() {
  const initialState: State = {};
  const [state, formAction] = useFormState(logoutAction, initialState);

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
