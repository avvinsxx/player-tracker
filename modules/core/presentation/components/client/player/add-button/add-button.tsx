"use client";

import { ButtonHTMLAttributes, useEffect, useState } from "react";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { PiPlusBold } from "react-icons/pi";

import Button from "../../button";
import Datepicker from "../../datepicker";
import Input from "../../input";
import Modal from "../../modal";
import Select from "../../select";
import { action, State } from "./action";

export default function AddButton(
  props: ButtonHTMLAttributes<HTMLButtonElement>,
) {
  return (
    <>
      <Modal>
        <Modal.Open>
          <Button {...props}>
            Add Player <PiPlusBold />
          </Button>
        </Modal.Open>
        <Modal.Window>
          <Modal.Header>
            <h2>Add Player</h2>
          </Modal.Header>
          <Modal.Body>
            <ModalAddBody />
          </Modal.Body>
        </Modal.Window>
      </Modal>
    </>
  );
}

function ModalAddBody({ closeModal }: { closeModal?: () => void }) {
  const initialState: State = { message: null, errors: {}, success: false };
  const [game, setGame] = useState("");
  const [state, formAction] = useFormState(action, initialState);
  useEffect(() => {
    if (state.success) {
      toast.success("Player created.");
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
        required
      />
      <Datepicker
        label="Birth Date"
        selected={null}
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
        />
      )}

      {state.message && (
        <p className="mt-2 text-sm text-red-500">{state.message}</p>
      )}
      <div className="mt-4 flex justify-end">
        <Button variant="primary">Save</Button>
      </div>
    </form>
  );
}
