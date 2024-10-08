"use client";

import { useFormState } from "react-dom";

import { Button, Input, InputGroup } from "@/src/shared/ui";

import { searchAction, State } from "../api/search-action";

export default function SearchForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(searchAction, initialState);

  return (
    <>
      <form action={formAction}>
        <div className="rounded-md bg-neutral-700 p-4">
          <div className="grid grid-cols-[1fr_auto]">
            <InputGroup>
              <Input
                errors={state.errors?.name}
                id="name"
                name="name"
                defaultValue=""
                placeholder="Name"
              />
              <Button className="rounded-none rounded-e-md" variant="primary">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
        {state.message && (
          <p className="mt-2 text-sm text-red-500">{state.message}</p>
        )}
      </form>
    </>
  );
}
