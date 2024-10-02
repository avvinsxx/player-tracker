"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiPencilBold } from "react-icons/pi";

import Button from "../../button";
import Modal from "../../modal";
import SearchInput from "../../search-input";
import { action, State } from "./action";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  accountId: number;
  players: {
    label?: string;
    value: string;
  }[];
}

export default function EditButton({
  accountId,
  players,
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
          <ModalEditBody players={players} accountId={accountId} />
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}

function ModalEditBody({
  accountId,
  players,
  closeModal,
}: {
  accountId?: number;
  players: {
    label?: string;
    value: string;
  }[];
  closeModal?: () => void;
}) {
  const initialState: State = { message: null, errors: {}, success: false };
  const [playerId, setPlayerId] = useState("");
  const [state, formAction] = useFormState(action, initialState);

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
        items={players}
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
