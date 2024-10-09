"use client";

import { Button, Modal, SearchInput, SearchInputOption } from "@/src/shared/ui";
import { useState } from "react";
import { useFormState } from "react-dom";
import { addAction, State } from "../api/add-action";

interface AddButtonProps {
  gameName: string;
  tag: string;
  platform: string;
  players: SearchInputOption[];
}

export function AddButton({
  gameName,
  tag,
  platform,
  players,
}: AddButtonProps) {
  const initialState: State = { message: null, errors: {} };
  const [playerId, setPlayerId] = useState("");
  const [state, formAction] = useFormState(addAction, initialState);

  return (
    <>
      <Modal>
        <Modal.Open>
          <Button variant="primary" className="mx-auto">
            Add Account
          </Button>
        </Modal.Open>
        <Modal.Window>
          <Modal.Header>
            <h2>Add Account</h2>
          </Modal.Header>
          <Modal.Body>
            <form action={formAction}>
              <SearchInput
                items={players}
                errors={state.errors?.playerId}
                onItemSelect={setPlayerId}
              />
              <input name="playerId" type="hidden" value={playerId} />
              <input name="gameName" type="hidden" value={gameName} />
              <input name="tag" type="hidden" value={tag} />
              <input name="platform" type="hidden" value={platform} />

              {state.message && (
                <p className="mt-2 text-sm text-red-500">{state.message}</p>
              )}
              <div className="mt-4 flex justify-end">
                <Button variant="primary">Add</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Window>
      </Modal>
    </>
  );
}
