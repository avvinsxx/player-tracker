"use client";

import { useEffect } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";

import { getAllPlatforms } from "@/src/entities/lol";
import { Button, Input, InputGroup, Select } from "@/src/shared/ui";
import { searchAction, State } from "../api/search-action";

export default function SearchForm() {
  const initialState: State = { message: null, errors: {} };
  const [state, formAction] = useFormState(searchAction, initialState);

  useEffect(() => {
    if (state.message) {
      toast.error(state.message);
    }
  }, [state]);

  return (
    <>
      <form action={formAction}>
        <div className="rounded-md bg-neutral-700 p-4">
          <div className="grid grid-cols-[1fr_5fr_1fr_auto]">
            <InputGroup>
              <Select
                options={getAllPlatforms()}
                errors={state.errors?.platform}
                defaultValue=""
                id="platform"
                name="platform"
                placeholder="Select a region"
                required
              />
              <Input
                errors={state.errors?.gameName}
                id="gameName"
                name="gameName"
                defaultValue=""
                placeholder="Game Name"
              />
              <Input
                errors={state.errors?.tag}
                id="tag"
                name="tag"
                defaultValue=""
                placeholder="TAG"
              />
              <Button className="rounded-none rounded-e-md" variant="primary">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
      </form>
    </>
  );
}
