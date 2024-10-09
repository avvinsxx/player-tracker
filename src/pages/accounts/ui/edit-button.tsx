"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiPencilBold } from "react-icons/pi";

import { Button, Modal, SearchInput, SearchInputOption } from "@/src/shared/ui";
import { editAction, State } from "../api/edit-action";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accountId: number;
  playerOptions: SearchInputOption[];
}

export function EditButton({
  accountId,
  playerOptions,
  ...rest
}: EditButtonProps) {
  return (
    <Modal>
      <Modal.Open>
        <Button variant="secondary" className="mx-auto" {...rest}>
          <PiPencilBold size={16} />
        </Button>
      </Modal.Open>
      <Modal.Window>
        <Modal.Header>
          <h2>Edit account</h2>
        </Modal.Header>
        <Modal.Body>
          <ModalEditBody accountId={accountId} playerOptions={playerOptions} />
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}

function ModalEditBody({
  accountId,
  closeModal,
  playerOptions,
}: {
  accountId?: number;
  playerOptions: SearchInputOption[];
  closeModal?: () => void;
}) {
  const initialState: State = { message: null, errors: {}, success: false };
  const [playerId, setPlayerId] = useState("");
  const [state, formAction] = useFormState(editAction, initialState);

  useEffect(() => {
    if (state.success) {
      toast.success("Account changed.");
      if (closeModal) {
        closeModal();
      }
    }
  }, [state, closeModal]);
  return (
    <form action={formAction}>
      <SearchInput
        items={playerOptions}
        errors={state.errors?.playerId}
        onItemSelect={setPlayerId}
      />
      <input name="playerId" type="hidden" value={playerId} />
      <input name="accountId" type="hidden" value={accountId} />

      {state.message && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
      <div className="mt-4 flex justify-end">
        <Button variant="primary">Save</Button>
      </div>
    </form>
  );
}
