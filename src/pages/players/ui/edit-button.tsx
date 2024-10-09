"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiPencilBold } from "react-icons/pi";

import { Player } from "@/src/entities/player";
import { Button, Datepicker, Input, Modal, Select } from "@/src/shared/ui";
import { editAction, State } from "../api/edit-action";

interface EditButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  player: Player;
}

export function EditButton({ player, ...rest }: EditButtonProps) {
  return (
    <Modal>
      <Modal.Open>
        <Button variant="secondary" {...rest}>
          <PiPencilBold size={16} />
        </Button>
      </Modal.Open>
      <Modal.Window>
        <Modal.Header>
          <h2>Edit Player</h2>
        </Modal.Header>
        <Modal.Body>
          <ModalEditBody player={player} />
        </Modal.Body>
      </Modal.Window>
    </Modal>
  );
}

function ModalEditBody({
  player,
  closeModal,
}: {
  player: Player;
  closeModal?: () => void;
}) {
  const initialState: State = { message: null, errors: {}, success: false };
  const [state, formAction] = useFormState(editAction, initialState);
  const [game, setGame] = useState(player.mainGame ?? "");
  useEffect(() => {
    if (state.success) {
      toast.success("Player changed.");
      if (closeModal) {
        closeModal();
      }
    }
  }, [state, closeModal]);
  return (
    <form action={formAction}>
      <Input
        label="Nickname"
        type="text"
        name="nickname"
        errors={state.errors?.nickname}
        defaultValue={player.nickname}
        required
      />
      <Datepicker
        label="Birth Date"
        selected={player.birthdate}
        maxDate={new Date()}
        name="birthdate"
        errors={state.errors?.birthdate}
      />

      <Select
        options={{
          lol: "League of Legends",
          dota2: "DOTA 2",
        }}
        errors={state.errors?.game}
        id="game"
        name="game"
        label="Game"
        placeholder="Select a game"
        onChange={(e) => setGame(e.target.value)}
        defaultValue={player.mainGame ?? ""}
      />

      {game === "lol" && (
        <Select
          options={{
            top: "Top",
            jungle: "Jungle",
            mid: "Mid",
            support: "Support",
            adc: "ADC",
          }}
          errors={state.errors?.role}
          id="role"
          name="role"
          label="Role"
          placeholder="Select a role"
          defaultValue={player.role ?? ""}
        />
      )}

      {game === "dota2" && (
        <Select
          options={{
            1: "1",
            2: "2",
            3: "3",
            4: "4",
            5: "5",
          }}
          errors={state.errors?.role}
          id="role"
          name="role"
          label="Position"
          placeholder="Select a position"
          defaultValue={player.role ?? ""}
        />
      )}
      <input type="hidden" name="id" value={player.id} />

      {state.message && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
      <div className="mt-4 flex justify-end">
        <Button variant="primary">Save</Button>
      </div>
    </form>
  );
}
