"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormStatus } from "react-dom";

interface DatePickerProps {
  name: string;
  errors?: string[];
  label?: string;
  selected?: Date | null;
  maxDate?: Date;
}

export default function Datepicker({
  label,
  errors,
  selected,
  name,
  maxDate,
}: DatePickerProps) {
  const [date, setDate] = useState<Date | null | undefined>(selected);
  const { pending: formInProgress } = useFormStatus();

  return (
    <div className="mb-4">
      <label>
        {label}
        <DatePicker
          wrapperClassName="!block"
          selected={date}
          onChange={(date) => {
            setDate(date);
          }}
          className="block h-10 w-full rounded-md border pl-2 text-sm text-neutral-700 outline-2 disabled:cursor-not-allowed disabled:border-neutral-950 disabled:bg-neutral-600 disabled:text-neutral-950"
          shouldCloseOnSelect={true}
          maxDate={maxDate}
          disabled={formInProgress}
        />
      </label>
      <input
        type="hidden"
        name={name}
        value={date?.toISOString()?.substring(0, 10)}
      />
      {errors &&
        errors.map((error: string) => (
          <p className="mt-2 text-sm text-red-500" key={error}>
            {error}
          </p>
        ))}
    </div>
  );
}
